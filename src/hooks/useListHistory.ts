"use client";

import { fetchListingHistory } from "@/apis/mypage";
import { useQuery } from "@tanstack/react-query";

export function useListHistory({
  type,
  page,
  size,
  accessToken,
  enabled,
}: {
  type: "sales" | "wishlist";
  page: number;
  size: number;
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["listHistory", type, page, size],
    queryFn: () => fetchListingHistory(type, page, size, accessToken),
    enabled,
  });
}
