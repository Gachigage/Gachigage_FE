"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gray1LeftArrow from "@/assets/icons/gray1LeftArrow.svg";
import gray1RightArrow from "@/assets/icons/gray1RightArrow.svg";

interface ProductDetailImgsProps {
    // 테스트용 StaticImageData
    images: (string | StaticImageData)[];
}

export default function ProductDetailImgs({ images }: ProductDetailImgsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="flex flex-col gap-[8px] w-[353px] md:w-[calc(100%-587px)]">
            {/* 메인 이미지 영역 */}
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
                <Image
                    src={images[currentIndex]}
                    alt={`상품 이미지 ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                />

                {/* 왼쪽 화살표 */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[32px] h-[32px] cursor-pointer"
                >
                    <Image
                        src={gray1LeftArrow}
                        alt="이전 이미지"
                        width={32}
                        height={32}
                    />
                </button>

                {/* 오른쪽 화살표 */}
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-[8px] -translate-y-1/2 w-[32px] h-[32px] cursor-pointer"
                >
                    <Image
                        src={gray1RightArrow}
                        alt="다음 이미지"
                        width={32}
                        height={32}
                    />
                </button>

                {/* 이미지 번호 표시 */}
                <div className="absolute bottom-[8px] right-[8px] w-[38px] h-[20px] bg-[#150502]/70 rounded-[4px] flex items-center justify-center">
                    <span className="text-gachigageGray1 text-[16px] font-[400] leading-[120%]">
                        {currentIndex + 1}/{images.length}
                    </span>
                </div>
            </div>

            {/* 썸네일 이미지 영역 */}
            <div
                ref={thumbnailContainerRef}
                className="flex gap-[8px] overflow-x-auto scrollbar-hidden md:overflow-x-scroll"
            >
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-[105px] h-[105px] md:w-[calc(25%-6px)] md:h-auto md:aspect-square rounded-[8px] overflow-hidden cursor-pointer ${
                            currentIndex === index
                                ? "border-[2px] border-black"
                                : ""
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`썸네일 ${index + 1}`}
                            width={105}
                            height={105}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
