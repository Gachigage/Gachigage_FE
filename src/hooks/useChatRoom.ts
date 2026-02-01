"use client";

import { useEffect, useState } from "react";
import {
  connectStomp,
  subscribeRoom,
  disconnectStomp,
} from "@/lib/stomp/stompManager";
import { ChatSendMessage } from "@/types/Chat";


export const useChatRoom = (roomId: string | null) => {
  const [messages, setMessages] = useState<ChatSendMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    connectStomp();

    subscribeRoom(roomId, (message: ChatSendMessage) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      disconnectStomp();
    };
  }, [roomId]);

  return { messages };
};
