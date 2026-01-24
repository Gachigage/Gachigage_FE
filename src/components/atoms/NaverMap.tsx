"use client";

import { useEffect, useRef } from "react";

interface NaverMapProps {
    latitude: number;
    longitude: number;
    className?: string;
}

declare global {
    interface Window {
        naver: typeof naver;
    }
}

export default function NaverMap({
    latitude,
    longitude,
    className = "",
}: NaverMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<naver.maps.Map | null>(null);

    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current || !window.naver) return;

            const location = new window.naver.maps.LatLng(latitude, longitude);

            const mapOptions: naver.maps.MapOptions = {
                center: location,
                zoom: 14,
                zoomControl: false,
            };

            const map = new window.naver.maps.Map(mapRef.current, mapOptions);
            mapInstanceRef.current = map;

            new window.naver.maps.Marker({
                position: location,
                map: map,
            });
        };

        if (window.naver && window.naver.maps) {
            initMap();
        } else {
            const checkNaver = setInterval(() => {
                if (window.naver && window.naver.maps) {
                    clearInterval(checkNaver);
                    initMap();
                }
            }, 100);

            return () => clearInterval(checkNaver);
        }
    }, [latitude, longitude]);

    return (
        <div
            ref={mapRef}
            className={`w-full h-[200px] md:h-[300px] overflow-hidden border border-gachigageGray3 ${className}`}
        />
    );
}
