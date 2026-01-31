"use client";

import { useState } from "react";
import Image from "next/image";
import xButton from "@/assets/icons/xButton27.svg";
import xButtonGray from "@/assets/icons/xButtonGray36.svg";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { Place } from "@/types/Naver";

type PlaceSearchProps = {
    onClose: () => void;
    onSelect: (place: Place) => void;
};

export default function PlaceSearch({ onClose, onSelect }: PlaceSearchProps) {
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const { data, isLoading, error } = usePlaceSearch(searchQuery);

    const handleSearch = () => {
        if (!inputValue.trim()) return;
        setSelectedPlace(null);
        setSearchQuery(inputValue.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    const handlePlaceClick = (place: Place) => {
        setSelectedPlace(place);
    };

    const handleApply = () => {
        if (selectedPlace) {
            onSelect(selectedPlace);
            onClose();
        }
    };

    const places = data?.data || [];
    const isApplyEnabled = selectedPlace !== null;

    return (
        <div className="w-full flex flex-col px-[24px] py-[32px] gap-[16px] rounded-[16px] bg-gachigageWhite shadow-[0px_0px_9px_0px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col gap-[8px]">
                <div className="w-full flex justify-between">
                    <span className="leading-[120%] text-gachigageDark font-semibold">
                        장소 검색
                    </span>
                    <Image
                        src={xButton}
                        alt="닫기"
                        width={24}
                        height={24}
                        className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-full cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <span className="text-gachigageGray5 text-[13px] font-normal leading-[120%]">
                    키워드를 입력해서 원하는 장소를 검색하세요.
                </span>
            </div>

            <div className="flex gap-[4px]">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-[8px] border border-gachigageGray7 h-[40px] px-[12px] placeholder:font-normal outline-none"
                    placeholder="장소를 입력하세요."
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-[60px] h-[40px] bg-gachigageMint border-[0.5px] border-gachigageBrightMint1 text-gachigageWhite font-medium rounded-[8px] cursor-pointer disabled:opacity-50"
                >
                    {isLoading ? "..." : "검색"}
                </button>
            </div>

            <div className="h-[1px] w-full bg-gachigageGray0"></div>

            <div className="flex flex-col gap-[8px] ">
                {error && (
                    <div className="text-center text-[13px] text-red-500 py-[8px]">
                        검색 중 오류가 발생했습니다.
                    </div>
                )}

                {!isLoading && places.length === 0 && searchQuery && (
                    <div className="flex flex-col items-center justify-center h-[340px] gap-[4px]">
                        <Image
                            src={xButtonGray}
                            alt="검색 결과 없음"
                            width={36}
                            height={36}
                        />
                        <span className="text-[16px] text-gachigageGray7 font-normal">
                            일치하는 검색 내역이 없습니다.
                        </span>
                    </div>
                )}

                {places.map((place, index) => (
                    <div
                        key={`${place.latitude}-${place.longitude}-${index}`}
                        onClick={() => handlePlaceClick(place)}
                        className={`p-[8px] h-[64px] flex flex-col gap-[8px] rounded-[8px] cursor-pointer transition-colors ${
                            selectedPlace?.latitude === place.latitude &&
                            selectedPlace?.longitude === place.longitude
                                ? "bg-gachigageBrightMint3 border border-gachigageMint"
                                : "border-b border-gachigageGray0 hover:bg-gachigageGray0"
                        }`}
                    >
                        <div className="text-[16px] font-medium truncate text-gachigageDark leading-[120%]">
                            {place.title}
                        </div>
                        <div className="text-[13px] font-normal truncate text-gachigageGray7 text-gachigageGray5">
                            {place.roadAddress || place.address}
                        </div>
                    </div>
                ))}
            </div>

            {/* 적용하기 버튼 */}
            <button
                onClick={handleApply}
                disabled={!isApplyEnabled}
                className={`w-full h-[40px] rounded-[8px] border-[0.5px] flex items-center justify-center cursor-pointer font-medium transition-colors ${
                    isApplyEnabled
                        ? "bg-gachigageMint border-gachigageBrightMint1 text-gachigageWhite"
                        : "bg-gachigageGray3 border-gachigageGray5 text-gachigageGray5"
                }`}
            >
                적용하기
            </button>
        </div>
    );
}
