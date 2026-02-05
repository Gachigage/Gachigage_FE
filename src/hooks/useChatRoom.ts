import { useEffect, useState } from "react";
import { connectStomp, disconnectStomp, subscribeRoom } from "@/lib/stomp/stompManager";

export const useChatRoom = (
  chatRoomId: number,
  accessToken?: string
) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatRoomId || !accessToken) return;

    connectStomp(accessToken);

    const timer = setTimeout(() => {
      subscribeRoom(chatRoomId.toString(), (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }, 300); // 연결 완료 대기 (중요)

    return () => {
      clearTimeout(timer);
      disconnectStomp();
    };
  }, [chatRoomId, accessToken]);

  return { messages };
};
