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

interface ProductPriceValue {
    minPrice: number;
    maxPrice: number;
}

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

const normalizeProductPrice = (price: ProductPriceValue): ProductPriceValue => {
    if (price.maxPrice === 0) {
        return {
            minPrice: MIN_PRICE,
            maxPrice: MAX_PRICE,
        };
    }

    return {
        minPrice: price.minPrice,
        maxPrice: price.maxPrice,
    };
};

const toStoreProductPrice = (price: ProductPriceValue): ProductPriceValue => {
    if (price.minPrice === MIN_PRICE && price.maxPrice === MAX_PRICE) {
        return {
            minPrice: MIN_PRICE,
            maxPrice: 0,
        };
    }

    return price;
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
    const [draftProductPrice, setDraftProductPrice] =
        useState<ProductPriceValue>(normalizeProductPrice(productPrice));

    const [minInputValue, setMinInputValue] = useState<string | null>(null);
    const [maxInputValue, setMaxInputValue] = useState<string | null>(null);

    const appliedProductPrice = normalizeProductPrice(productPrice);

    const displayedMinInput =
        minInputValue !== null
            ? minInputValue
            : formatNumber(draftProductPrice.minPrice);
    const displayedMaxInput =
        maxInputValue !== null
            ? maxInputValue
            : formatNumber(draftProductPrice.maxPrice);

    const syncDraftFromStore = () => {
        setDraftProductPrice(normalizeProductPrice(productPrice));
        setMinInputValue(null);
        setMaxInputValue(null);
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
            setMinInputValue(null);
            setMaxInputValue(null);
        }, 100);
    };

    const handleSliderChange = (values: number[]) => {
        const minPrice = sliderIndexToPrice(values[0]) * 10000;
        const maxPrice = sliderIndexToPrice(values[1]) * 10000;
        setDraftProductPrice({ minPrice, maxPrice });
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinInputValue(e.target.value);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxInputValue(e.target.value);
    };

    const handleMinInputFocus = () => {
        setMinInputValue(formatNumber(draftProductPrice.minPrice));
    };

    const handleMaxInputFocus = () => {
        setMaxInputValue(formatNumber(draftProductPrice.maxPrice));
    };

    const handleMinInputBlur = () => {
        if (minInputValue === null) return;
        let value = parseFormattedNumber(minInputValue);
        value = Math.max(
            MIN_PRICE,
            Math.min(value, draftProductPrice.maxPrice),
        );
        setDraftProductPrice((prev) => ({ ...prev, minPrice: value }));
        setMinInputValue(null);
    };

    const handleMaxInputBlur = () => {
        if (maxInputValue === null) return;
        let value = parseFormattedNumber(maxInputValue);
        value = Math.max(
            draftProductPrice.minPrice,
            Math.min(value, MAX_PRICE),
        );
        setDraftProductPrice((prev) => ({ ...prev, maxPrice: value }));
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
        const resetPrice = { minPrice: MIN_PRICE, maxPrice: MAX_PRICE };
        setDraftProductPrice(resetPrice);
        setProductPrice(toStoreProductPrice(resetPrice));
        setMinInputValue(null);
        setMaxInputValue(null);
    };

    const handleApply = () => {
        const normalizedDraftPrice = {
            minPrice: Math.max(
                MIN_PRICE,
                Math.min(
                    draftProductPrice.minPrice,
                    draftProductPrice.maxPrice,
                ),
            ),
            maxPrice: Math.min(
                MAX_PRICE,
                Math.max(
                    draftProductPrice.maxPrice,
                    draftProductPrice.minPrice,
                ),
            ),
        };

        setProductPrice(toStoreProductPrice(normalizedDraftPrice));
        setIsOpen(false);
        setMinInputValue(null);
        setMaxInputValue(null);
    };

    const currentSliderValues = [
        priceToSliderIndex(draftProductPrice.minPrice / 10000),
        priceToSliderIndex(draftProductPrice.maxPrice / 10000),
    ];

    const getDisplayText = () => {
        if (
            appliedProductPrice.minPrice === MIN_PRICE &&
            appliedProductPrice.maxPrice === MAX_PRICE
        ) {
            return "금액";
        }
        if (appliedProductPrice.minPrice === MIN_PRICE) {
            return `~ ${formatNumber(appliedProductPrice.maxPrice)}원`;
        }
        if (appliedProductPrice.maxPrice === MAX_PRICE) {
            return `${formatNumber(appliedProductPrice.minPrice)}원 ~`;
        }
        return `${formatNumber(appliedProductPrice.minPrice)} ~ ${formatNumber(
            appliedProductPrice.maxPrice,
        )}원`;
    };

    const isFiltered =
        appliedProductPrice.minPrice !== MIN_PRICE ||
        appliedProductPrice.maxPrice !== MAX_PRICE;

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
                <div className="absolute w-[354px] top-[66px] left-1/2 -translate-x-1/2 z-50 bg-white border border-gachigageDark1 rounded-[12px] p-[10px]">
                    <p className=" font-semibold text-gachigageDark px-[4px]">
                        금액 필터
                    </p>
                    <div className="w-full h-[1px] bg-gachigageGray1 mt-[12px] mb-[16px]" />

                    <div className="px-[2px] pt-[10px]">
                        <div className="mb-[5px]">
                            <Slider
                                value={currentSliderValues}
                                onValueChange={handleSliderChange}
                                min={0}
                                max={PRICE_STEPS.length - 1}
                                step={1}
                                className="w-full z-2 [&_[data-slot=slider-track]]:h-[4px] [&_[data-slot=slider-track]]:bg-gachigageGray1 [&_[data-slot=slider-range]]:bg-gachigageGray5 [&_[data-slot=slider-thumb]]:w-[20px] [&_[data-slot=slider-thumb]]:h-[20px] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-gachigageGray5"
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
                    </div>

                    <div className="w-full h-[1px] bg-gachigageGray1 mb-[10px]" />

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
