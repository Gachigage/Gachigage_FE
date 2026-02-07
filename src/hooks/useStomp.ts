"use client";

import { useEffect } from "react";
import { connectStomp, disconnectStomp } from "@/lib/stomp/stompManager";
import { useSession } from "next-auth/react";

export const useStomp = (enabled: boolean) => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!enabled) return;
    if (status !== "authenticated") return;
    if (!accessToken) return;

    connectStomp(accessToken);

    return () => {
      disconnectStomp();
    };
  }, [enabled, status, accessToken]);
};
