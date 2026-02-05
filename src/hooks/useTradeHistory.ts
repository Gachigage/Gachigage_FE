"use client";

import { fetchTradeHistory } from "@/apis/mypage";
import { useQuery } from "@tanstack/react-query";

export function useTradeHistory({
  type,
  page,
  size,
  accessToken,
  enabled,
}: {
  type: "purchases" | "sales" | "likes";
  page: number;
  size: number;
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["tradeHistory", type, page, size],
    queryFn: () => fetchTradeHistory(type, page, size, accessToken),
    enabled,
     select: (data) => {
      return [...data.content]; 
    },
  });
}
