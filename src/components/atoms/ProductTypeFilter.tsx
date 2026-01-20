"use client";

import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg";
import { useState, useRef } from "react";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

const categories = [
    { primary: "전체", secondary: ["전체"] },
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

export default function ProductTypeFilter() {
    const productType = useProductSearchFilterStore(
        (state) => state.productType,
    );
    const setProductType = useProductSearchFilterStore(
        (state) => state.setProductType,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPrimaryIndex, setHoveredPrimaryIndex] = useState<
        number | null
    >(null);
    const [hoveredSecondaryIndex, setHoveredSecondaryIndex] = useState<
        number | null
    >(null);
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
            setHoveredPrimaryIndex(null);
        }, 100);
    };

    const handleSecondaryClick = (primary: string, secondary: string) => {
        setProductType({ primary, secondary });
        setIsOpen(false);
        setHoveredPrimaryIndex(null);
    };

    const getDisplayText = () => {
        if (productType.primary === "" || productType.secondary === "")
            return "물품 유형";

        return `${productType.primary} - ${productType.secondary}`;
    };

    const currentSecondaries =
        hoveredPrimaryIndex !== null
            ? categories[hoveredPrimaryIndex]?.secondary || []
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
                    isOpen ||
                    productType.primary.trim() !== "" ||
                    productType.secondary.trim() !== ""
                        ? "bg-gachigageGray0"
                        : ""
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
                        {categories.map((category, index) => {
                            const isHovered = hoveredPrimaryIndex === index;
                            const isAfterHovered =
                                hoveredPrimaryIndex === index - 1;
                            const showBorder =
                                index !== 0 && !isHovered && !isAfterHovered;

                            return (
                                <div
                                    key={category.primary}
                                    className={`flex w-full h-[44px] md:h-[50px] xl:h-[60px] items-center justify-center hover:rounded-[12px] cursor-pointer text-[16px] transition-colors border-gachigageGray1 ${
                                        isHovered
                                            ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                            : "text-gachigageGray7 font-normal"
                                    } ${showBorder ? "border-t" : ""}`}
                                    onMouseEnter={() =>
                                        setHoveredPrimaryIndex(index)
                                    }
                                >
                                    {category.primary}
                                </div>
                            );
                        })}
                    </div>

                    {/* 2차 카테고리 */}
                    {hoveredPrimaryIndex !== null &&
                        currentSecondaries.length > 0 && (
                            <div
                                className="w-[175px] md:w-[230px] lg:w-[340px] px-[12px] py-[8px] md:py-[12px] md:px-[24px] xl:px-[42px] bg-white border border-gachigageGray1 rounded-[12px] shadow-[0_0_8px_rgba(0,0,0,0.15)] ml-[4px]"
                                onMouseLeave={() =>
                                    setHoveredSecondaryIndex(null)
                                }
                            >
                                {currentSecondaries.map((secondary, index) => {
                                    const isHovered =
                                        hoveredSecondaryIndex === index;
                                    const isAfterHovered =
                                        hoveredSecondaryIndex === index - 1;
                                    const showBorder =
                                        index !== 0 &&
                                        !isHovered &&
                                        !isAfterHovered;

                                    return (
                                        <div
                                            key={secondary}
                                            className={`flex w-full h-[44px] md:h-[50px] xl:h-[60px] items-center justify-center hover:rounded-[12px] cursor-pointer text-[16px] transition-colors border-gachigageGray1 ${
                                                isHovered
                                                    ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                    : "text-gachigageGray7 font-normal"
                                            } ${showBorder ? "border-t" : ""}`}
                                            onMouseEnter={() =>
                                                setHoveredSecondaryIndex(index)
                                            }
                                            onClick={() =>
                                                handleSecondaryClick(
                                                    categories[
                                                        hoveredPrimaryIndex
                                                    ].primary,
                                                    secondary,
                                                )
                                            }
                                        >
                                            {secondary}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
