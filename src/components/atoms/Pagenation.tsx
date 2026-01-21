"use client";

import leftArrow from "@/assets/icons/leftArrow.svg";
import rightArrow from "@/assets/icons/rightArrow.svg";
import Image from "next/image";

interface PagenationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagenation({
    currentPage,
    totalPages,
    onPageChange,
}: PagenationProps) {
    // 페이지 범위 계산
    const getPageRange = (perGroup: number) => {
        const groupIndex = Math.floor((currentPage - 1) / perGroup);
        const start = groupIndex * perGroup + 1;
        const end = Math.min(start + perGroup - 1, totalPages);
        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const mobilePages = getPageRange(5);
    const desktopPages = getPageRange(10);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePrev = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4">
            {!isFirstPage && (
                <Image
                    src={leftArrow}
                    alt="이전 페이지"
                    width={17}
                    height={17}
                    className="cursor-pointer"
                    onClick={handlePrev}
                />
            )}

            <div className="flex items-center justify-center">
                {/* 모바일: 5개 단위 */}
                <div className="flex md:hidden">
                    {mobilePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-[36px] h-[29px] flex items-center justify-center cursor-pointer text-[18px] leading-[160%]
                                ${page === currentPage ? "font-medium text-gachigageDark" : "font-normal text-gachigageGray5"}
                            `}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                {/* 태블릿/데스크탑: 10개 단위 */}
                <div className="hidden md:flex">
                    {desktopPages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-[36px] h-[29px] flex items-center justify-center cursor-pointer text-[18px] leading-[160%]
                                ${page === currentPage ? "font-medium text-gachigageDark" : "font-normal text-gachigageGray5"}
                            `}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

            {!isLastPage && (
                <Image
                    src={rightArrow}
                    alt="다음 페이지"
                    width={17}
                    height={17}
                    className="cursor-pointer"
                    onClick={handleNext}
                />
            )}
        </div>
    );
}
