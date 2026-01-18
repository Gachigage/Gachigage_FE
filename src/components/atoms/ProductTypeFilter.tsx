"use client";

import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg";
import { useState, useRef } from "react";

const categories = [
    {
        primary: "주방·조리 장비",
        secondary: ["전체", "냉장·냉동", "가열·조리", "위생·세척", "준비·보관"],
    },
    {
        primary: "카페·음료 장비",
        secondary: ["전체", "커피 머신", "분쇄·제빙", "음료 제조", "쇼케이스"],
    },
    {
        primary: "매장 집기·가구",
        secondary: ["전체", "진열", "좌석", "계산대", "수납"],
    },
    {
        primary: "계산·운영 장비",
        secondary: [
            "전체",
            "POS",
            "무인·셀프 주문",
            "스캐닝",
            "금전 관리",
            "매장 운영",
        ],
    },
    {
        primary: "업무용 장비",
        secondary: ["전체", "미용·관리", "세탁·청소", "유지·관리"],
    },
    {
        primary: "인테리어·시설",
        secondary: ["전체", "간판·사인", "조명", "냉난방", "전기·설비"],
    },
    {
        primary: "소모품·비품",
        secondary: ["전체", "포장", "매장 비품", "위생"],
    },
    {
        primary: "기타",
        secondary: ["전체"],
    },
];

interface SelectedCategory {
    primary: string;
    secondary: string;
}

export default function ProductTypeFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPrimary, setHoveredPrimary] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] =
        useState<SelectedCategory | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setHoveredPrimary(null);
        }, 100);
    };

    const handlePrimaryHover = (primary: string) => {
        setHoveredPrimary(primary);
    };

    const handleSecondaryClick = (primary: string, secondary: string) => {
        setSelectedCategory({ primary, secondary });
        setIsOpen(false);
        setHoveredPrimary(null);
        // TODO: Zustand store 연동
    };

    const getDisplayText = () => {
        if (selectedCategory) {
            return `${selectedCategory.primary} - ${selectedCategory.secondary}`;
        }
        return "물품 유형";
    };

    const currentSecondaries = hoveredPrimary
        ? categories.find((c) => c.primary === hoveredPrimary)?.secondary || []
        : [];

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 필터 버튼 */}
            <div
                className={`w-full h-[54px] rounded-[12px] border border-gachigageGray1 text-gachigageGray7" flex items-center pl-[10px] gap-[10px] cursor-pointer font-normal text-[18px] transition-colors hover:bg-gachigageGray0 ${
                    isOpen || selectedCategory ? "bg-gachigageGray0" : ""
                }`}
            >
                <Image
                    src={hamburger}
                    alt="햄버거 아이콘"
                    width={24}
                    height={24}
                />
                <span className="truncate pr-[10px]">{getDisplayText()}</span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute top-[58px] left-0 flex z-50">
                    {/* 1차 카테고리 */}
                    <div className=" w-[175px] md:w-[230px] lg:w-[376px] px-[12px] py-[8px] md:px-[24px] md:py-[12px] bg-white border border-gachigageGray1 rounded-[12px] shadow-[0_0_8px_rgba(0,0,0,0.15)]">
                        {categories.map((category, index) => (
                            <div
                                key={category.primary}
                                className={`flex w-full h-[44px] md:h-[50px] xl:h-[60px] items-center justify-center rounded-[12px] cursor-pointer text-[16px] transition-colors ${
                                    hoveredPrimary === category.primary
                                        ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                        : "text-gachigageGray7 font-normal"
                                } ${index !== 0 ? "border-t border-gachigageGray1" : ""}`}
                                onMouseEnter={() =>
                                    handlePrimaryHover(category.primary)
                                }
                            >
                                {category.primary}
                            </div>
                        ))}
                    </div>

                    {/* 2차 카테고리 */}
                    {hoveredPrimary && currentSecondaries.length > 0 && (
                        <div className="w-[175px] md:w-[230px] lg:w-[340px] px-[12px] py-[8px] md:py-[12px] md:px-[24px] xl:px-[42px] bg-white border border-gachigageGray1 rounded-[12px] shadow-[0_0_8px_rgba(0,0,0,0.15)] ml-[4px]">
                            {currentSecondaries.map((secondary, index) => (
                                <div
                                    key={secondary}
                                    className={`flex w-full h-[44px] md:h-[50px] xl:h-[60px] items-center justify-center rounded-[12px] cursor-pointer cursor-pointer text-[16px] transition-colors text-gachigageGray7 font-normal hover:bg-gachigageGray1 hover:text-gachigageDark hover:font-medium ${index !== 0 ? "border-t border-gachigageGray1" : ""}`}
                                    onClick={() =>
                                        handleSecondaryClick(
                                            hoveredPrimary,
                                            secondary,
                                        )
                                    }
                                >
                                    {secondary}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
