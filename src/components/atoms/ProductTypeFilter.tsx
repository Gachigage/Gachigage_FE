"use client";

import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg";
import { useState, useRef } from "react";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import { useProductCategoriesForFilter } from "@/hooks/useProductCategories";

export default function ProductTypeFilter() {
    const { categories } = useProductCategoriesForFilter();

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
        if (
            productType.primary === "전체" &&
            productType.secondary.trim() !== ""
        )
            return "전체";
        if (productType.primary === "" || productType.secondary === "")
            return "물품 유형";

        return `${productType.primary} - ${productType.secondary}`;
    };

    const currentSecondaries =
        categories[selectedPrimaryIndex]?.secondary || [];

    return (
        <div
            ref={containerRef}
            className="relative w-full min-w-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 필터 버튼 */}
            <div
                className={`w-full h-[56px] rounded-[12px] border border-gachigageGray1 font-normal text-gachigageGray5 text-[16px] flex items-center pl-[10px] gap-[10px] cursor-pointer transition-colors hover:bg-gachigageGray0 ${
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
                <div className="absolute w-[350px] top-[66px] left-0 z-50 flex bg-white border border-gachigageDark1 rounded-[12px] ">
                    {/* 1차 카테고리 */}
                    <div className="w-[175px] px-[8px] py-[8px] flex flex-col gap-[8px] border-r border-gachigageGray1">
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

                    {/* 2차 카테고리 */}
                    <div
                        className="w-[175px] px-[8px] py-[8px] flex flex-col"
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
                                        key={secondary.id ?? secondary.name}
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
                                                secondary.name,
                                            )
                                        }
                                    >
                                        {secondary.name}
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
