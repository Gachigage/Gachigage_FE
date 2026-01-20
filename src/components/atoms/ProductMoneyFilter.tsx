"use client";

import won from "@/assets/icons/won.svg";
import Image from "next/image";
import { useState, useRef } from "react";
import reset from "@/assets/icons/reset.svg";
import { Slider } from "@/components/ui/slider";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import { formatNumber, parseFormattedNumber } from "@/lib/utils";

const PRICE_STEPS = [
    0, 10, 30, 50, 100, 200, 300, 500, 700, 1000, 1500, 2000, 3000, 4000, 5000,
    6000, 7000, 8000, 10000,
];

const LABEL_MARKERS = [
    { label: "최소", value: 0 },
    { label: "300", value: 300 },
    { label: "3000", value: 3000 },
    { label: "최대", value: 10000 },
];

const MIN_PRICE = 0;
const MAX_PRICE = 100000000;

const priceToSliderIndex = (priceInManwon: number): number => {
    const exactIndex = PRICE_STEPS.indexOf(priceInManwon);
    if (exactIndex !== -1) return exactIndex;

    for (let i = 0; i < PRICE_STEPS.length - 1; i++) {
        if (
            priceInManwon > PRICE_STEPS[i] &&
            priceInManwon < PRICE_STEPS[i + 1]
        ) {
            const ratio =
                (priceInManwon - PRICE_STEPS[i]) /
                (PRICE_STEPS[i + 1] - PRICE_STEPS[i]);
            return i + ratio;
        }
    }

    return PRICE_STEPS.length - 1;
};

const sliderIndexToPrice = (index: number): number => {
    const roundedIndex = Math.round(index);
    return PRICE_STEPS[Math.min(roundedIndex, PRICE_STEPS.length - 1)];
};

export default function ProductMoneyFilter() {
    const productPrice = useProductSearchFilterStore(
        (state) => state.productPrice,
    );
    const setProductPrice = useProductSearchFilterStore(
        (state) => state.setProductPrice,
    );

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [minInputValue, setMinInputValue] = useState<string | null>(null);
    const [maxInputValue, setMaxInputValue] = useState<string | null>(null);

    const actualMinPrice =
        productPrice.maxPrice === 0 ? MIN_PRICE : productPrice.minPrice;
    const actualMaxPrice =
        productPrice.maxPrice === 0 ? MAX_PRICE : productPrice.maxPrice;

    const displayedMinInput =
        minInputValue !== null ? minInputValue : formatNumber(actualMinPrice);
    const displayedMaxInput =
        maxInputValue !== null ? maxInputValue : formatNumber(actualMaxPrice);

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
        }, 100);
    };

    const handleSliderChange = (values: number[]) => {
        const minPrice = sliderIndexToPrice(values[0]) * 10000;
        const maxPrice = sliderIndexToPrice(values[1]) * 10000;
        setProductPrice({ minPrice, maxPrice });
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinInputValue(e.target.value);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxInputValue(e.target.value);
    };

    const handleMinInputFocus = () => {
        setMinInputValue(formatNumber(actualMinPrice));
    };

    const handleMaxInputFocus = () => {
        setMaxInputValue(formatNumber(actualMaxPrice));
    };

    const handleMinInputBlur = () => {
        if (minInputValue === null) return;
        let value = parseFormattedNumber(minInputValue);
        value = Math.max(MIN_PRICE, Math.min(value, actualMaxPrice));
        setProductPrice({ minPrice: value, maxPrice: actualMaxPrice });
        setMinInputValue(null);
    };

    const handleMaxInputBlur = () => {
        if (maxInputValue === null) return;
        let value = parseFormattedNumber(maxInputValue);
        value = Math.max(actualMinPrice, Math.min(value, MAX_PRICE));
        setProductPrice({ minPrice: actualMinPrice, maxPrice: value });
        setMaxInputValue(null);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: "min" | "max",
    ) => {
        if (e.key === "Enter") {
            if (type === "min") {
                handleMinInputBlur();
            } else {
                handleMaxInputBlur();
            }
            (e.target as HTMLInputElement).blur();
        }
    };

    const handleReset = () => {
        setProductPrice({ minPrice: MIN_PRICE, maxPrice: MAX_PRICE });
        setMinInputValue(null);
        setMaxInputValue(null);
    };

    const currentSliderValues = [
        priceToSliderIndex(actualMinPrice / 10000),
        priceToSliderIndex(actualMaxPrice / 10000),
    ];

    const displayMinPrice = formatNumber(actualMinPrice);
    const displayMaxPrice = formatNumber(actualMaxPrice);

    const getDisplayText = () => {
        if (actualMinPrice === MIN_PRICE && actualMaxPrice === MAX_PRICE) {
            return "금액";
        }
        if (actualMinPrice === MIN_PRICE) {
            return `~ ${formatNumber(actualMaxPrice)}원`;
        }
        if (actualMaxPrice === MAX_PRICE) {
            return `${formatNumber(actualMinPrice)}원 ~`;
        }
        return `${formatNumber(actualMinPrice)} ~ ${formatNumber(actualMaxPrice)}원`;
    };

    const isFiltered =
        actualMinPrice !== MIN_PRICE || actualMaxPrice !== MAX_PRICE;

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
                    isOpen || isFiltered ? "bg-gachigageGray0" : ""
                }`}
            >
                <Image src={won} alt="원 아이콘" width={24} height={24} />
                <span
                    className={`truncate pr-[10px] ${
                        isFiltered ? "text-gachigageGray7 font-medium" : ""
                    }`}
                >
                    {getDisplayText()}
                </span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute w-[354px] h-[244px] top-[66px] left-1/2 -translate-x-1/2 z-50 bg-white border border-gachigageDark1 rounded-[12px] px-[12px] pt-[20px] pb-[12px]">
                    <p className="text-center text-[18px] font-semibold text-gachigageDark mb-[30px]">
                        {displayMinPrice}원 ~ {displayMaxPrice}원
                    </p>

                    <div className="mb-[5px]">
                        <Slider
                            value={currentSliderValues}
                            onValueChange={handleSliderChange}
                            min={0}
                            max={PRICE_STEPS.length - 1}
                            step={1}
                            className="w-full z-2 [&_[data-slot=slider-track]]:h-[4px] [&_[data-slot=slider-track]]:bg-gachigageGray2 [&_[data-slot=slider-range]]:bg-gachigageGray5 [&_[data-slot=slider-thumb]]:w-[20px] [&_[data-slot=slider-thumb]]:h-[20px] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-gachigageGray5"
                        />
                    </div>

                    <div className="px-[10px] w-full">
                        <div className="relative w-full h-[30px] text-[18px] font-normal text-gachigageGray7 mb-[30px]">
                            {LABEL_MARKERS.map((marker, index) => {
                                const stepIndex = PRICE_STEPS.indexOf(
                                    marker.value,
                                );
                                const percent =
                                    (stepIndex / (PRICE_STEPS.length - 1)) *
                                    100;

                                return (
                                    <div
                                        key={index}
                                        className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                                        style={{ left: `${percent}%` }}
                                    >
                                        <div className="w-[1px] h-[8px] bg-gachigageGray7 mb-[4px]" />
                                        <span className="whitespace-nowrap">
                                            {marker.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-[12px] mb-[15px]">
                        <input
                            type="text"
                            value={displayedMinInput}
                            onChange={handleMinInputChange}
                            onFocus={handleMinInputFocus}
                            onBlur={handleMinInputBlur}
                            onKeyDown={(e) => handleKeyDown(e, "min")}
                            className="w-[150px] h-[36px] px-[8px] rounded-[8px] border border-gachigageGray3 text-[18px] font-medium text-gachigageGray7 bg-gachigageWhite focus:outline-none focus:border-gachigageGray5"
                            placeholder="최소 금액"
                        />
                        <div className="w-[6px] h-[1.5px] bg-gachigageGray3"></div>
                        <input
                            type="text"
                            value={displayedMaxInput}
                            onChange={handleMaxInputChange}
                            onFocus={handleMaxInputFocus}
                            onBlur={handleMaxInputBlur}
                            onKeyDown={(e) => handleKeyDown(e, "max")}
                            className="w-[150px] h-[36px] px-[8px] rounded-[8px] border border-gachigageGray3 text-[18px] font-medium text-gachigageGray7 bg-gachigageWhite focus:outline-none focus:border-gachigageGray5"
                            placeholder="최대 금액"
                        />
                    </div>

                    <div className="w-full flex items-center justify-end">
                        <div
                            className="w-[85px] h-[20px] flex items-center justify-center gap-[2px] cursor-pointer rounded-[10px] bg-gachigageGray0 hover:bg-gachigageGray1"
                            onClick={handleReset}
                        >
                            <Image
                                src={reset}
                                alt="reset 아이콘"
                                width={10}
                                height={10}
                            />
                            <span className="text-[13px] text-gachigageGray7 font-normal">
                                금액 초기화
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
