import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  connectStomp,
  disconnectStomp,
  subscribeRoom,
  sendMessage as stompSendMessage,
} from "@/lib/stomp/stompManager";
import { ChatMessage } from "@/types/Chat";

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
        };

        queryClient.setQueryData(["chatMessages", chatRoomId], (old: { content: ChatMessage[]; pageable: any } | undefined) => {
          const current = old || { content: [] as ChatMessage[], pageable: {} };

          // 중복 메시지 방지
          const exists = current.content.some((m: ChatMessage) =>
            m.sendAt === normalizedMessage.sendAt && m.content === normalizedMessage.content
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

    const sendAt = new Date().toISOString();
    const optimisticMessage: ChatMessage = {
      chatRoomId,
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
        m.sendAt === optimisticMessage.sendAt && m.content === optimisticMessage.content
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
    });
  };

  return { sendMessage };
}
