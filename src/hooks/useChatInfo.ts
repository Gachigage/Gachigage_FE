"use client";

import { fetchChatRoomInfo } from "@/apis/chat";
import { useQuery } from "@tanstack/react-query";

interface UseChatMessagesProps {
  chatRoomId: number;
  accessToken?: string;
}

export function useChatInfo({
  chatRoomId,
  accessToken,
  enabled,
}: {
  chatRoomId: number;
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["chatRoomInfo", chatRoomId],
    queryFn: () => fetchChatRoomInfo(chatRoomId, accessToken),
    enabled,
  });
}
