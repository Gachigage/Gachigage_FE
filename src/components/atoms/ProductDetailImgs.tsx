"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import gray1LeftArrow from "@/assets/icons/gray1LeftArrow.svg";
import gray1RightArrow from "@/assets/icons/gray1RightArrow.svg";

interface ProductDetailImgsProps {
    // 테스트용 StaticImageData
    // TODO: 실제 이미지 연동 과정에서 StaticImageData 삭제
    images: (string | StaticImageData)[];
}

export default function ProductDetailImgs({ images }: ProductDetailImgsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleThumbnailClick = (index: number) => {
        if (!isDraggingRef.current) {
            setCurrentIndex(index);
        }
    };

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        isDraggingRef.current = false;
        startXRef.current = e.pageX;
        scrollLeftRef.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = "grabbing";
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current || startXRef.current === 0) return;
        const diff = Math.abs(e.pageX - startXRef.current);
        if (diff > 5) isDraggingRef.current = true;
        const walk = e.pageX - startXRef.current;
        containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!containerRef.current) return;
        startXRef.current = 0;
        containerRef.current.style.cursor = "grab";
        setTimeout(() => {
            isDraggingRef.current = false;
        }, 0);
    }, []);

    // 화면 크기 변경 시 스크롤 위치 리셋
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                containerRef.current.scrollLeft = 0;
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col gap-[8px] w-[353px] md:w-[calc(100%-587px)] md:min-w-[354px]">
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
                <Image
                    src={images[currentIndex]}
                    alt={`상품 이미지 ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                />

                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[32px] h-[32px] cursor-pointer drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                >
                    <Image
                        src={gray1LeftArrow}
                        alt="이전 이미지"
                        width={32}
                        height={32}
                    />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-[8px] -translate-y-1/2 w-[32px] h-[32px] cursor-pointer drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                >
                    <Image
                        src={gray1RightArrow}
                        alt="다음 이미지"
                        width={32}
                        height={32}
                    />
                </button>

                <div className="absolute bottom-[8px] right-[8px] w-[38px] h-[20px] bg-[#150502]/60 rounded-[4px] flex items-center justify-center">
                    <span className="text-gachigageGray1 text-[16px] font-normal leading-[120%]">
                        {currentIndex + 1}/{images.length}
                    </span>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex gap-[8px] overflow-x-auto scrollbar-hidden-mobile select-none cursor-grab pb-[12px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
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
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
