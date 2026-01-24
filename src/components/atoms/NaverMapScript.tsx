"use client";

import Script from "next/script";

export default function NaverMapScript() {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    if (!clientId) {
        console.error("CLIENT ID가 없습니다.");
        return null;
    }

    return (
        <Script
            strategy="afterInteractive"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
        />
    );
}
