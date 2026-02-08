import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  connectStomp,
  disconnectStomp,
  subscribeRoom,
  sendMessage as stompSendMessage,
} from "@/lib/stomp/stompManager";
import { ChatMessage } from "@/types/Chat";
import { v4 as uuidv4 } from 'uuid';

export function useChatSocket({
  chatRoomId,
  accessToken,
  enabled,
  memberId, // senderId 비교용 내 userId
}: {
  chatRoomId: number;
  accessToken?: string;
  enabled: boolean;
  memberId?: number; // 반드시 props로 내려줘야 함
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!chatRoomId || !accessToken || !enabled || !memberId) return;

    connectStomp(accessToken);

    const timer = setTimeout(() => {
      subscribeRoom(chatRoomId.toString(), (message: ChatMessage) => {
        // 💌 서버에서 받은 메시지 로그
        console.log("💌 서버에서 받은 메시지:", message);

        // 문자열 깨짐 방지
        const normalizedContent = Array.from(message.content).join('');

        // 내 메시지 판단
        const isMine = message.senderId === memberId;
        if (isMine) return;

        const normalizedMessage = {
          ...message,
          content: normalizedContent,
          me: isMine,
          messageUuid: message.messageUuid || uuidv4() // 서버에 messageUuid 없으면 임시 UUID
        };

        queryClient.setQueryData(["chatMessages", chatRoomId], (old: { content: ChatMessage[]; pageable: any } | undefined) => {
          const current = old || { content: [] as ChatMessage[], pageable: {} };

          // 중복 메시지 방지
          const exists = current.content.some((m: ChatMessage) =>
            m.sendAt === normalizedMessage.sendAt && 
            m.content === normalizedMessage.content &&
            m.senderId === normalizedMessage.senderId &&
            m.messageUuid === normalizedMessage.messageUuid
          );
          if (exists) return current;

          // 📝 캐시에 추가할 메시지 로그
          console.log("📝 캐시에 추가할 메시지:", normalizedMessage);

          return {
            ...current,
            content: [normalizedMessage, ...current.content],
          };
        });
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      disconnectStomp();
    };
  }, [chatRoomId, accessToken, enabled, queryClient, memberId]);

  const sendMessage = ({
    chatRoomId,
    messageType,
    content,
  }: {
    chatRoomId: number;
    messageType: string;
    content: string;
  }) => {
    if (!content.trim() || !memberId) return;

    const tempId = uuidv4(); // 임시 UUID 생성
    const sendAt = new Date().toISOString();
    console.info(tempId)
    const optimisticMessage: ChatMessage = {
      chatRoomId,
      messageUuid: tempId,  // 여기에 UUID 부여
      content,
      messageType: 'TEXT',
      sendAt,
      read: false,
      senderId: memberId, // 내 userId 추가
      me: true,
      senderIsBuyer: true
    };

    queryClient.setQueryData(["chatMessages", chatRoomId], (old: { content: ChatMessage[]; pageable: any } | undefined) => {
      const current = old || { content: [] as ChatMessage[], pageable: {} };

      const exists = current.content.some((m: ChatMessage) =>
        m.sendAt === optimisticMessage.sendAt &&
        m.content === optimisticMessage.content &&
        m.senderId === optimisticMessage.senderId &&
        m.messageUuid === optimisticMessage.messageUuid
      );
      if (exists) return current;

      console.log("🚀 optimistic 메시지:", optimisticMessage);
      return {
        ...current,
        content: [optimisticMessage, ...current.content],
      };
    });

    stompSendMessage({
      chatRoomId,
      messageType: 'TEXT',
      content,
      messageUuid: tempId
    });
  };

  return { sendMessage };
}
