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
  type: "purchases" | "sales" | "wishlist";
  page: number;
  size: number;
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["tradeHistory", type, page, size],
    queryFn: () => fetchTradeHistory(type, page, size, accessToken),
    enabled,
    select: (res) =>
    res.content.map((item) => ({
      productId: item.productId,
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      mainImageUrl: item.mainImageUrl,
      price: item.price,
      quantity: item.quantity,
      tradeDate: item.createdAt,
      tradeId: item.tradeId,
    })),
  });
}
