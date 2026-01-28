"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import plusButton60 from "@/assets/icons/plusButton60.svg";
import plusButton36 from "@/assets/icons/plusButton36.svg";
import xButton36 from "@/assets/icons/xButton36.svg";
import xButton23 from "@/assets/icons/xButton23.svg";

const MAX_IMAGES = 8;

interface ProductCreateImgsProps {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductCreateImgs({
    images,
    setImages,
}: ProductCreateImgsProps) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const mainInputRef = useRef<HTMLInputElement>(null);
    const subInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const remainingSlots = MAX_IMAGES - images.length;
        const filesToAdd = Array.from(files).slice(0, remainingSlots);

        const newImageUrls = filesToAdd.map((file) =>
            URL.createObjectURL(file),
        );

        setImages((prev) => [...prev, ...newImageUrls]);
        e.target.value = "";
    };

    const handleDeleteImage = (index: number) => {
        setImages((prev) => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index]);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleMainInputClick = () => {
        mainInputRef.current?.click();
    };

    const handleSubInputClick = () => {
        subInputRef.current?.click();
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragEnd = () => {
        if (
            dragIndex !== null &&
            dragOverIndex !== null &&
            dragIndex !== dragOverIndex
        ) {
            setImages((prev) => {
                const newImages = [...prev];
                const [draggedImage] = newImages.splice(dragIndex, 1);
                newImages.splice(dragOverIndex, 0, draggedImage);
                return newImages;
            });
        }
        setDragIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className=" flex flex-col gap-[8px] w-[353px] md:w-[calc(100%-587px)] md:min-w-[354px]">
            {/* 메인 이미지 영역 */}
            <div className="relative w-full bg-gachigageGray1 aspect-square rounded-[16px] overflow-hidden">
                {images.length === 0 ? (
                    <button
                        onClick={handleMainInputClick}
                        className="w-full h-full bg-gachigageGray2 flex items-center justify-center cursor-pointer"
                    >
                        <div className="flex flex-col justify-center items-center gap-[16px]">
                            <Image
                                src={plusButton60}
                                alt="이미지 추가"
                                width={60}
                                height={60}
                            />
                            <div className="flex flex-col text-[16px] text-gachigageGray5 justify-center gap-[4px] leading-[120%]">
                                <p className=" font-semibold ">
                                    사진을 추가해주세요
                                </p>
                                <p className="font-normal">
                                    사진은 최대 8장까지 업로드 가능합니다.
                                </p>
                            </div>
                        </div>
                    </button>
                ) : (
                    <>
                        <Image
                            src={images[0]}
                            alt="메인 상품 이미지"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={() => handleDeleteImage(0)}
                            className="absolute top-[8px] right-[8px] cursor-pointer"
                        >
                            <Image
                                src={xButton36}
                                alt="이미지 삭제"
                                width={36}
                                height={36}
                            />
                        </button>
                    </>
                )}
                <input
                    ref={mainInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            {/* 하단 썸네일 그리드 */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-[8px]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`relative w-[105px] h-[105px] rounded-[8px] overflow-hidden cursor-grab active:cursor-grabbing ${
                                dragOverIndex === index ? "opacity-50" : ""
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`상품 이미지 ${index + 1}`}
                                fill
                                className="object-cover pointer-events-none"
                            />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-[4px] right-[4px] cursor-pointer"
                            >
                                <Image
                                    src={xButton23}
                                    alt="이미지 삭제"
                                    width={23}
                                    height={23}
                                />
                            </button>
                        </div>
                    ))}

                    {images.length < MAX_IMAGES && (
                        <button
                            onClick={handleSubInputClick}
                            className="w-[105px] h-[105px] rounded-[8px] bg-gachigageGray2 flex items-center justify-center cursor-pointer"
                        >
                            <Image
                                src={plusButton36}
                                alt="이미지 추가"
                                width={36}
                                height={36}
                            />
                        </button>
                    )}
                    <input
                        ref={subInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
}
