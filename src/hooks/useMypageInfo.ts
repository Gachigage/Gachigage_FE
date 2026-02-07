"use client";

import { fetchMyPage } from "@/apis/mypage";
import { useQuery } from "@tanstack/react-query";

export function useMyPageInfo({
  accessToken,
  enabled,
}: {
  accessToken?: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["myPage"],
    queryFn: () => fetchMyPage(accessToken),
    enabled,
  });
}
