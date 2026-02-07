"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChatList } from "@/apis/chat";

interface UseChatListProps {
  accessToken?: string;
}

export function useChatList({ accessToken }: UseChatListProps) {
  return useQuery({
    queryKey: ["chatList", accessToken], 
    queryFn: () => fetchChatList(accessToken),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!accessToken, 
    // select: (response) => response.data,
  });
}
