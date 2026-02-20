"use client";

import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg";
import reset from "@/assets/icons/reset.svg";
import { useRef, useState } from "react";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import { useProductCategoriesForFilter } from "@/hooks/useProductCategories";

interface ProductTypeValue {
    primaryId: number | null;
    primaryName: string;
    secondaryId: number | null;
    secondaryName: string;
}

const EMPTY_PRODUCT_TYPE: ProductTypeValue = {
    primaryId: null,
    primaryName: "",
    secondaryId: null,
    secondaryName: "",
};

const ALL_PRODUCT_TYPE: ProductTypeValue = {
    primaryId: null,
    primaryName: "전체",
    secondaryId: null,
    secondaryName: "전체",
};

export default function ProductTypeFilter() {
    const { categories } = useProductCategoriesForFilter();

    const productType = useProductSearchFilterStore(
        (state) => state.productType,
    );
    const setProductType = useProductSearchFilterStore(
        (state) => state.setProductType,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [draftProductType, setDraftProductType] =
        useState<ProductTypeValue>(productType);
    const [selectedPrimaryIndex, setSelectedPrimaryIndex] = useState<number>(0);
    const [hoveredPrimaryIndex, setHoveredPrimaryIndex] = useState<
        number | null
    >(null);
    const [hoveredSecondaryIndex, setHoveredSecondaryIndex] = useState<
        number | null
    >(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const findPrimaryIndex = (targetType: ProductTypeValue) => {
        if (!categories.length) return 0;

        if (
            targetType.primaryName.trim() === "" ||
            targetType.primaryName === "전체"
        ) {
            return 0;
        }

        const indexById = categories.findIndex(
            (category) => category.primaryId === targetType.primaryId,
        );
        if (indexById !== -1) return indexById;

        const indexByName = categories.findIndex(
            (category) => category.primary === targetType.primaryName,
        );
        return indexByName === -1 ? 0 : indexByName;
    };

    const syncDraftFromStore = () => {
        const appliedType = productType;
        setDraftProductType(appliedType);
        setSelectedPrimaryIndex(findPrimaryIndex(appliedType));
        setHoveredPrimaryIndex(null);
        setHoveredSecondaryIndex(null);
    };

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (!isOpen) {
            syncDraftFromStore();
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
        const selectedPrimary = categories[index];
        if (!selectedPrimary) return;

        setSelectedPrimaryIndex(index);
        setHoveredSecondaryIndex(null);

        if (index === 0) {
            setDraftProductType(ALL_PRODUCT_TYPE);
            return;
        }

        setDraftProductType({
            primaryId: selectedPrimary.primaryId,
            primaryName: selectedPrimary.primary,
            secondaryId: null,
            secondaryName: "전체",
        });
    };

    const handleSecondaryClick = (
        primaryId: number | null,
        primaryName: string,
        secondaryId: number | null,
        secondaryName: string,
    ) => {
        setDraftProductType({
            primaryId,
            primaryName,
            secondaryId,
            secondaryName,
        });
    };

    const handleReset = () => {
        setDraftProductType(EMPTY_PRODUCT_TYPE);
        setProductType(EMPTY_PRODUCT_TYPE);
        setSelectedPrimaryIndex(0);
        setHoveredPrimaryIndex(null);
        setHoveredSecondaryIndex(null);
    };

    const handleApply = () => {
        setProductType(draftProductType);
        setIsOpen(false);
        setHoveredPrimaryIndex(null);
        setHoveredSecondaryIndex(null);
    };

    const getDisplayText = () => {
        if (
            productType.primaryName === "전체" &&
            productType.secondaryName.trim() !== ""
        )
            return "전체";
        if (productType.primaryName === "" || productType.secondaryName === "")
            return "물품 유형";

        return `${productType.primaryName} - ${productType.secondaryName}`;
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
                    (productType.primaryName.trim() !== "" &&
                        productType.secondaryName.trim() !== "")
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
                        productType.primaryName.trim() !== "" &&
                        productType.secondaryName.trim() !== ""
                            ? "text-gachigageGray7 font-medium"
                            : ""
                    }`}
                >
                    {getDisplayText()}
                </span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute w-[350px] top-[66px] left-0 z-50 bg-white border border-gachigageDark1 rounded-[12px] p-[10px]">
                    <p className="font-semibold text-gachigageDark px-[4px]">
                        카테고리 필터
                    </p>
                    <div className="w-full h-[1px] bg-gachigageGray1 mt-[12px] mb-[8px]" />

                    <div className="-mx-[10px] flex">
                        {/* 1차 카테고리 */}
                        <div className="w-[175px] px-[8px] py-[8px] flex flex-col gap-[8px] border-r border-gachigageGray1">
                            {categories.map((category, index) => {
                                const isSelected =
                                    selectedPrimaryIndex === index;
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
                                        onClick={() =>
                                            handlePrimaryClick(index)
                                        }
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
                                    const isSelected =
                                        draftProductType.primaryName ===
                                            categories[selectedPrimaryIndex]
                                                .primary &&
                                        draftProductType.secondaryName ===
                                            secondary.name;

                                    return (
                                        <div
                                            key={secondary.id ?? secondary.name}
                                            className={`flex w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                                isSelected || isHovered
                                                    ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                    : "text-gachigageGray7 font-normal"
                                            }`}
                                            onMouseEnter={() =>
                                                setHoveredSecondaryIndex(index)
                                            }
                                            onClick={() =>
                                                handleSecondaryClick(
                                                    categories[
                                                        selectedPrimaryIndex
                                                    ].primaryId,
                                                    categories[
                                                        selectedPrimaryIndex
                                                    ].primary,
                                                    secondary.id,
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

                    <div className="-mx-[10px] h-[1px] bg-gachigageGray1 mt-[8px] mb-[10px]" />

                    <div className="w-full flex items-center gap-[6px]">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 h-[40px] rounded-[8px] border-[0.5px] border-gachigageGray3 bg-gachigageWhite hover:bg-gachigageGray1 text-gachigageGray7 font-normal flex items-center justify-center gap-[6px] cursor-pointer"
                        >
                            <Image
                                src={reset}
                                alt="초기화 아이콘"
                                width={12}
                                height={12}
                            />
                            <span>초기화</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="flex-1 h-[40px] rounded-[8px] border-[0.5px] border-gachigageBrightMint1 bg-gachigageMint hover:opacity-90 text-gachigageWhite font-medium cursor-pointer"
                        >
                            적용하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
