import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { confirmTrade } from "@/apis/trade";

export function useConfirmTrade(chatRoomId: number) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productPriceId: number) => confirmTrade(chatRoomId, productPriceId, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tradeList", chatRoomId] });
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
    },
  });
}