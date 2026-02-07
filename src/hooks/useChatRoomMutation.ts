"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatRoom } from "@/apis/chat";
import { useRouter } from "next/navigation";
import { ChatRoomResponse } from "@/types/Chat";

interface createChatRoomProps {
  productId: number;
  accessToken: string;
}
export function useCreateChatRoom(options?: {
    onError?: (error: unknown) => void;
  }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ productId, accessToken }: createChatRoomProps) => createChatRoom(productId, accessToken),

    onSuccess: (data: ChatRoomResponse) => {
      if (!data?.chatRoomId) {
        console.error("chatRoomId가 없습니다.");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["chatList"] });

      router.push(`/chat/${data.chatRoomId}`);
    },
    
    onError: (error) => {
      console.error("채팅방 생성 실패:", error);
      options?.onError?.(error);
    }
  });
}