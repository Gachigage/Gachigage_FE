"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChatList } from "@/apis/chat";

interface UseChatListProps {
  accessToken?: string;
}

export function useChatList({ accessToken }: UseChatListProps) {
  // console.info(accessToken)
  return useQuery({
    queryKey: ["chatList", accessToken], // accessToken 바뀌면 캐시 갱신
    queryFn: () => fetchChatList(accessToken),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!accessToken, // accessToken 없으면 호출 안 함
  });
}
