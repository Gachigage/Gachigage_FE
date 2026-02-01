"use client";

import { useEffect } from "react";
import { connectStomp, disconnectStomp } from "@/lib/stomp/stompManager";

/**
 * 
 * @param enabled 소켓 on/off flag값
 */
export const useStomp = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    connectStomp();

    return () => {
      disconnectStomp();
    };
  }, [enabled]);
};
