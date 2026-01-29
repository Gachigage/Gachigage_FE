"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import grayArrowDown from "@/assets/icons/grayArrowDown.svg";
import { useProductCategoriesForForm } from "@/hooks/useProductCategories";
import { useProductFormStore } from "@/store/useProductFormStore";

export default function ProductCategorySelect() {
    const { categories } = useProductCategoriesForForm();

    const primaryCategoryId = useProductFormStore(
        (state) => state.primaryCategoryId,
    );
    const secondaryCategoryId = useProductFormStore(
        (state) => state.secondaryCategoryId,
    );
    const setPrimaryCategoryId = useProductFormStore(
        (state) => state.setPrimaryCategoryId,
    );
    const setSecondaryCategoryId = useProductFormStore(
        (state) => state.setSecondaryCategoryId,
    );

    const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
    const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
    const primaryRef = useRef<HTMLDivElement>(null);
    const secondaryRef = useRef<HTMLDivElement>(null);

    const selectedPrimary = categories.find(
        (cat) => cat.primaryId === primaryCategoryId,
    );
    const selectedSecondary = selectedPrimary?.secondary.find(
        (sec) => sec.id === secondaryCategoryId,
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                primaryRef.current &&
                !primaryRef.current.contains(event.target as Node)
            ) {
                setIsPrimaryOpen(false);
            }
            if (
                secondaryRef.current &&
                !secondaryRef.current.contains(event.target as Node)
            ) {
                setIsSecondaryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePrimarySelect = (id: number) => {
        setPrimaryCategoryId(id);
        setIsPrimaryOpen(false);
    };

    const handleSecondarySelect = (id: number) => {
        setSecondaryCategoryId(id);
        setIsSecondaryOpen(false);
    };

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    카테고리
                </span>
                <span className="text-[13px] text-gachigageDarkMint1 font-normal">
                    (필수 항목)
                </span>
            </div>

            <div className="flex gap-[8px]">
                {/* 1차 카테고리 드롭다운 */}
                <div ref={primaryRef} className="relative">
                    <button
                        onClick={() => setIsPrimaryOpen(!isPrimaryOpen)}
                        className={`w-[173px] h-[40px] rounded-[8px] border flex items-center justify-between px-[12px] cursor-pointer ${
                            primaryCategoryId
                                ? "border-gachigageDark"
                                : "border-gachigageGray3"
                        }`}
                    >
                        <span
                            className={`text-[16px] font-normal ${
                                primaryCategoryId
                                    ? "text-gachigageDark"
                                    : "text-gachigageGray7"
                            }`}
                        >
                            {selectedPrimary?.primary || "업종"}
                        </span>
                        <Image
                            src={grayArrowDown}
                            alt="화살표"
                            width={26}
                            height={26}
                            className={`transition-transform ${isPrimaryOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isPrimaryOpen && (
                        <div className="absolute top-[44px] left-0 z-10 w-[173px] rounded-[8px] border border-gachigageDark bg-white p-[8px] flex flex-col gap-[8px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                            {categories.map((category) => (
                                <button
                                    key={category.primaryId}
                                    onClick={() =>
                                        handlePrimarySelect(category.primaryId)
                                    }
                                    className={`w-full rounded-[4px] px-[8px] py-[8px] text-left text-[16px] text-gachigageDark cursor-pointer transition-colors ${
                                        primaryCategoryId === category.primaryId
                                            ? "bg-gachigageGray0 border border-gachigageGray1 font-medium"
                                            : "font-normal hover:bg-gachigageGray0 hover:border hover:border-gachigageGray1 hover:font-medium border border-transparent"
                                    }`}
                                >
                                    {category.primary}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2차 카테고리 드롭다운 */}
                <div ref={secondaryRef} className="relative">
                    <button
                        onClick={() =>
                            primaryCategoryId &&
                            setIsSecondaryOpen(!isSecondaryOpen)
                        }
                        disabled={!primaryCategoryId}
                        className={`w-[173px] h-[40px] rounded-[8px] border flex items-center justify-between px-[12px] ${
                            primaryCategoryId
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                        } ${
                            secondaryCategoryId
                                ? "border-gachigageDark"
                                : "border-gachigageGray3"
                        }`}
                    >
                        <span
                            className={`text-[16px] font-normal ${
                                secondaryCategoryId
                                    ? "text-gachigageDark"
                                    : "text-gachigageGray7"
                            }`}
                        >
                            {selectedSecondary?.name || "세부 항목"}
                        </span>
                        <Image
                            src={grayArrowDown}
                            alt="화살표"
                            width={26}
                            height={26}
                            className={`transition-transform ${isSecondaryOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isSecondaryOpen && selectedPrimary && (
                        <div className="absolute top-[44px] left-0 z-10 w-[173px] rounded-[8px] border border-gachigageDark bg-white p-[8px] flex flex-col gap-[8px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                            {selectedPrimary.secondary.map((secondary) => (
                                <button
                                    key={secondary.id}
                                    onClick={() =>
                                        handleSecondarySelect(secondary.id)
                                    }
                                    className={`w-full rounded-[4px] px-[8px] py-[8px] text-left text-[16px] text-gachigageDark cursor-pointer transition-colors ${
                                        secondaryCategoryId === secondary.id
                                            ? "bg-gachigageGray0 border border-gachigageGray1 font-medium"
                                            : "font-normal hover:bg-gachigageGray0 hover:border hover:border-gachigageGray1 hover:font-medium border border-transparent"
                                    }`}
                                >
                                    {secondary.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
