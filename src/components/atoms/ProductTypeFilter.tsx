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
    const [selectedPrimaryIndex, setSelectedPrimaryIndex] = useState<number>(0);
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
            setHoveredSecondaryIndex(null);
        }, 100);
    };

    const handlePrimaryClick = (index: number) => {
        setSelectedPrimaryIndex(index);
        setHoveredSecondaryIndex(null);

        // "전체" 카테고리 클릭 시 바로 store 업데이트
        if (index === 0) {
            setProductType({ primary: "전체", secondary: "전체" });
            setIsOpen(false);
            setHoveredPrimaryIndex(null);
        }
    };

    const handleSecondaryClick = (primary: string, secondary: string) => {
        setProductType({ primary, secondary });
        setIsOpen(false);
        setHoveredPrimaryIndex(null);
        setHoveredSecondaryIndex(null);
    };

    const getDisplayText = () => {
        if (productType.primary === "" || productType.secondary === "")
            return "물품 유형";

        return `${productType.primary} - ${productType.secondary}`;
    };

    const currentSecondaries =
        categories[selectedPrimaryIndex]?.secondary || [];

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 필터 버튼 */}
            <div
                className={`w-full h-[54px] rounded-[12px] border border-gachigageGray1 font-normal text-gachigageGray5 text-[16px] flex items-center pl-[10px] gap-[10px] cursor-pointer transition-colors hover:bg-gachigageGray0 ${
                    isOpen ||
                    (productType.primary.trim() !== "" &&
                        productType.secondary.trim() !== "")
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
                <span
                    className={`truncate pr-[10px] ${
                        productType.primary.trim() !== "" &&
                        productType.secondary.trim() !== ""
                            ? "text-gachigageGray7 font-medium"
                            : ""
                    }`}
                >
                    {getDisplayText()}
                </span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute w-[350px] top-[58px] left-0 z-50 flex bg-white border border-gachigageGray1 rounded-[12px] shadow-[0_0_8px_rgba(0,0,0,0.15)]">
                    {/* 1차 카테고리 */}
                    <div className="w-[175px] px-[8px] py-[8px] flex flex-col gap-[8px]">
                        {categories.map((category, index) => {
                            const isSelected = selectedPrimaryIndex === index;
                            const isHovered = hoveredPrimaryIndex === index;

                            return (
                                <div
                                    key={category.primary}
                                    className={`flex w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                        isSelected || isHovered
                                            ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                            : "text-gachigageGray7 font-normal"
                                    }`}
                                    onMouseEnter={() =>
                                        setHoveredPrimaryIndex(index)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredPrimaryIndex(null)
                                    }
                                    onClick={() => handlePrimaryClick(index)}
                                >
                                    {category.primary}
                                </div>
                            );
                        })}
                    </div>

                    {/* 구분선 */}
                    <div className="w-[1px] bg-gachigageGray1 my-[12px]" />

                    {/* 2차 카테고리 */}
                    <div
                        className="w-[175px] md:w-[230px] lg:w-[240px] px-[12px] py-[8px] md:py-[12px] md:px-[16px] flex flex-col"
                        onMouseLeave={() => setHoveredSecondaryIndex(null)}
                    >
                        {selectedPrimaryIndex === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gachigageGray7 text-[13px] text-center">
                                <p>카테고리를 선택하시면</p>
                                <p>세부 항목을 볼 수 있어요.</p>
                            </div>
                        ) : (
                            currentSecondaries.map((secondary, index) => {
                                const isHovered =
                                    hoveredSecondaryIndex === index;

                                return (
                                    <div
                                        key={secondary}
                                        className={`flex w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                            isHovered
                                                ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                : "text-gachigageGray7 font-normal"
                                        }`}
                                        onMouseEnter={() =>
                                            setHoveredSecondaryIndex(index)
                                        }
                                        onClick={() =>
                                            handleSecondaryClick(
                                                categories[selectedPrimaryIndex]
                                                    .primary,
                                                secondary,
                                            )
                                        }
                                    >
                                        {secondary}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
