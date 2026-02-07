import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { fetchTradeInfo } from "@/apis/trade";

export function useTradeList(chatRoomId?: number) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["tradeList", chatRoomId],
    queryFn: () =>
      fetchTradeInfo(chatRoomId as number, session?.accessToken),
      enabled: !!chatRoomId && !!session?.accessToken,
      select: (data) => data.productPriceList,
  });
}
