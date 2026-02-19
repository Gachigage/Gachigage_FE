"use client";

import { fetchTradePurchase } from "@/apis/mypage";
import { useQuery } from "@tanstack/react-query";

export function usePurchaseHistory({
  page,
  size,
  accessToken,
  enabled,
}: {
  page: number;
  size: number;
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["purchaseHistory", page, size],
    queryFn: () => fetchTradePurchase(page, size, accessToken),
    enabled,
  });
}
