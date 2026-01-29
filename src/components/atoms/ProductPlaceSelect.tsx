"use client";

import { useState } from "react";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import xButton from "@/assets/icons/xButton27.svg";
import PlaceSearch from "./PlaceSearch";
import { useProductFormStore } from "@/store/useProductFormStore";

export default function ProductPlaceSelect() {
    const preferredLocation = useProductFormStore(
        (state) => state.preferredLocation,
    );
    const setPreferredLocation = useProductFormStore(
        (state) => state.setPreferredLocation,
    );

    const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    거래 희망 장소
                </span>
                <span className="text-[13px] text-gachigageGray5 font-normal">
                    (선택 항목)
                </span>
            </div>

            <button
                onClick={() => setIsPlaceSearchOpen(true)}
                className="w-full h-[40px] rounded-[8px] border border-gachigageGray3 px-[12px] flex justify-between items-center cursor-pointer"
            >
                <span className="text-[16px] font-normal text-gachigageGray7">
                    희망하시는 장소를 입력해주세요.
                </span>
                <Image src={search} alt="검색 아이콘" width={18} height={18} />
            </button>

            {preferredLocation && (
                <div className="flex justify-between border-b h-[35px] px-[12px] border-gachigageGray3">
                    <span className="text-[16px] font-medium text-gachigageDark">
                        {preferredLocation.address}
                    </span>
                    <button
                        onClick={() => setPreferredLocation(null)}
                        className="cursor-pointer"
                    >
                        <Image
                            src={xButton}
                            alt="삭제"
                            width={27}
                            height={27}
                        />
                    </button>
                </div>
            )}

            {isPlaceSearchOpen && (
                <div
                    className="fixed inset-0 z-999 flex items-center justify-center bg-[#160502]/10"
                    onClick={() => setIsPlaceSearchOpen(false)}
                >
                    <div
                        className="w-[400px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PlaceSearch
                            onClose={() => setIsPlaceSearchOpen(false)}
                            onSelect={(place) =>
                                setPreferredLocation({
                                    latitude: place.latitude,
                                    longitude: place.longitude,
                                    address: place.roadAddress || place.address,
                                })
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
