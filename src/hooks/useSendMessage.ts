import { sendMessage } from "@/lib/stomp/stompManager";

export const useSendMessage = (roomId: string) => {
  const send = (content: string) => {
    if (!content.trim()) return;

    sendMessage({
      roomId,
      content,
    });
  };

  return { send };
};
