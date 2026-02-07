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
    staleTime: 0,          
    refetchOnMount: "always", // 같은 api여도 항상호출(url이 바뀔때)
    refetchOnWindowFocus: false,
    select: (data) => [...data.content].reverse(),
  });
}

