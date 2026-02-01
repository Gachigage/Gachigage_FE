"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatRoom } from "@/apis/chat";
import { useRouter } from "next/navigation";
import { ChatRoomResponse } from "@/types/Chat";

export function useCreateChatRoom() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ productId, accessToken }: { productId: number; accessToken?: string }) => 
      createChatRoom(productId, accessToken),

    onSuccess: (data: ChatRoomResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["chatList"],
      });
      console.info(data);
      router.push(`/chat/${data.chatRoomId}`);
    },
    
    onError: (error) => {
      console.error("채팅방 생성 실패:", error);
      // 에러 처리 (토스트 알림 등)
    }
  });
}