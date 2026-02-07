"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyNickname } from "@/apis/mypage";

export function useNicknameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      nickname,
      accessToken,
    }: {
      nickname: string;
      accessToken?: string;
    }) => updateMyNickname(nickname, accessToken),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPage"],
      });
    },
  });
}
