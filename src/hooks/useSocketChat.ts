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
  amIBuyer,
}: {
  chatRoomId: number;
  accessToken?: string;
  enabled: boolean;
  amIBuyer?: boolean;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!chatRoomId || !accessToken || !enabled) return;

    connectStomp(accessToken);

    const timer = setTimeout(() => {subscribeRoom(chatRoomId.toString(),(message: ChatMessage) => {
          const isMine = message.senderIsBuyer === amIBuyer;
          
          // 내가보낸메세지는 무시
          if (isMine) {
            return;
          }
          // 서버에서 온 메시지 → 캐시에 추가
          queryClient.setQueryData(["chatMessages", chatRoomId],(old : any) => {
              const current = old || { content: [], pageable: {} };
              const normalizedMessage = {
                ...message,
                me: message.senderIsBuyer === amIBuyer
              };  

              return {
                ...current,
                content: [normalizedMessage, ...current.content]
              };
            }
          );
        }
      );
    }, 300);

    return () => {  
      clearTimeout(timer);
      disconnectStomp();
    };
  }, [chatRoomId, accessToken, enabled, queryClient]);

  const sendMessage = ({
    chatRoomId,
    messageType,
    content,
  }: {
    chatRoomId: number;
    messageType: string;
    content: string;
  }) => {
    if (!content.trim()) return;

    const sendAt = new Date().toISOString();
    const optimisticMessage: ChatMessage = {
      chatRoomId,
      content,
      messageType: 'TEXT', // 우선text로 처리
      sendAt,
      read: false,
      senderIsBuyer: true,
      me: true
    };
    
    queryClient.setQueryData(["chatMessages", chatRoomId], (old: any) => {
        const current = old || { content: [], pageable: {} };

        return {
          ...current,
          content: [optimisticMessage, ...current.content],
        };
      }
    );

  stompSendMessage({
    chatRoomId,
    messageType,
    content,
  });
};

  return { sendMessage };
}
