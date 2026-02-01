"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatRoom } from "@/apis/chat";
import { useRouter } from "next/navigation";

export function useCreateChatRoom() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (productId: number) => createChatRoom(productId),

    onSuccess: (roomId) => {
      queryClient.invalidateQueries({
        queryKey: ["chatList"],
      });

      router.push(`/chats/${roomId}`);
    },
  });
}
