"use client";

import DesktopChatRoom from "./DesktopChatRoom";
import EmptyChatRoom from "./EmptyChatRoom";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function DesktopChatRoomContainer({
  chatRoomId,
}: {
  chatRoomId?: number;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop === null) return null;
  if (!isDesktop) return null;

  if (!chatRoomId) {
    return <EmptyChatRoom />;
  }

  return <DesktopChatRoom chatRoomId={chatRoomId} />;
}
