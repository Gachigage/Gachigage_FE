"use client";

import { useState } from "react";
import grayEmptyHeart from "@/assets/icons/grayEmptyHeart.svg";
import heart from "@/assets/icons/heart.svg";
import { useProductLike } from "@/hooks/useProductLike";
import Image from "next/image";

type LikeButtonProps = {
    isLiked: boolean;
    productId: number;
};

export default function LikeButton({
    isLiked: initialIsLiked,
    productId,
}: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const { toggleLike } = useProductLike(productId);

    const handleClick = async () => {
        console.log("handleClick 실행됨"); // 이거 찍히는지 확인
        setIsLiked((prev) => !prev);
        try {
            await toggleLike();
            console.log("toggleLike 성공");
        } catch (e) {
            console.error("toggleLike 실패", e);
            setIsLiked((prev) => !prev);
        }
    };

    return (
        <button
            className={`w-[56px] h-[56px]  flex items-center justify-center cursor-pointer
                md:rounded-[8px] md:border border-gachigageGray3
                `}
            onClick={handleClick}
        >
            <Image
                src={isLiked ? heart : grayEmptyHeart}
                alt="grayEmptyHeart 아이콘"
                width={32}
                height={32}
            ></Image>
        </button>
    );
}
