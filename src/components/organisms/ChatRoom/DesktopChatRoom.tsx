"use client";

import { useChatInfo } from "@/hooks/useChatInfo";
import { useChatMessages } from "@/hooks/useChatMessage";
import { useChatSocket } from "@/hooks/useSocketChat";
import { useSession } from "next-auth/react";
import ChatRoom from "./ChatRoom";

export default function DesktopChatRoom({
  chatRoomId,
}: {
  chatRoomId: number;
}) {
  const { data: session, status } = useSession();

  const { data: chatInfo } = useChatInfo({
    chatRoomId,
    accessToken: session?.accessToken,
    enabled: status === "authenticated",
  });

  const { data: chattings = [], isSuccess } = useChatMessages({
    chatRoomId,
    accessToken: session?.accessToken,
  });

  const { sendMessage } = useChatSocket({
    chatRoomId,
    accessToken: session?.accessToken,
    enabled: status === "authenticated" && isSuccess,
    memberId: chatInfo?.memberId,
  });

  if (!chatInfo) return null;

  return (
    <ChatRoom
      chatInfo={chatInfo}
      chattings={chattings}
      sendMessage={sendMessage}
    />
  );
}
