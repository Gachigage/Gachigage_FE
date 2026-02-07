"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfileImage } from "@/apis/mypage";

export function useProfileImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      accessToken,
    }: {
      file: File;
      accessToken?: string;
    }) => updateMyProfileImage(file, accessToken),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPage"],
      });
    },
  });
}
