import { sendMessage } from "@/lib/stomp/stompManager";

export const useSendMessage = (chatRoomId: number) => {
  const send = (content: string) => {
    if (!content.trim()) return;

    sendMessage({
      chatRoomId,
      content,
    });
  };

  return { send };
};
