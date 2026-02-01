"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChatList } from "@/apis/chat";

export function useChatList() {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: fetchChatList,
    staleTime: 1000 * 60 * 60 * 24,
  });
}