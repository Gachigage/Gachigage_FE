import { useEffect, useState } from "react";
import {
  connectStomp,
  disconnectStomp,
  subscribeRoom,
  sendMessage as stompSendMessage,
} from "@/lib/stomp/stompManager";

interface sendPayloadProps {
    chatRoomId: number;
    messageType: string;
    content: string;
}
export function useChatSocket({
  chatRoomId,
  accessToken,
  enabled,
}: {
  chatRoomId: number;
  accessToken?: string;
  enabled: boolean;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!enabled || !chatRoomId || !accessToken) return;

    connectStomp(accessToken);

    const timer = setTimeout(() => {
      subscribeRoom(chatRoomId.toString(), (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      disconnectStomp();
    };
  }, [chatRoomId, accessToken, enabled]);

const sendMessage = ({chatRoomId, messageType, content}:sendPayloadProps) => {
  if (!content.trim()) return;

  stompSendMessage({
    chatRoomId: chatRoomId,
    messageType: messageType ?? "TEXT",
    content: content,
  });
};

  return {
    messages,
    sendMessage,
  };
}
