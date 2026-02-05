"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChatRoomMessages } from "@/apis/chat";

interface UseChatMessagesProps {
  chatRoomId: number;
  accessToken?: string;
}

export function useChatMessages({
  chatRoomId,
  accessToken,
}: UseChatMessagesProps) {
  return useQuery({
    queryKey: ["chatMessages", chatRoomId],
    queryFn: () => fetchChatRoomMessages(chatRoomId, accessToken),
    enabled: !!chatRoomId && !!accessToken,
    staleTime: 1000 * 60 * 60 * 24,
     select: (data) => {
      return [...data.content].reverse(); 
    },
  });
}
