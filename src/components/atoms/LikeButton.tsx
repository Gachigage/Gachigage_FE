"use client";

import { useState } from "react";
import emptyHeart from "@/assets/icons/emptyHeart.svg";
import grayEmptyHeart from "@/assets/icons/grayEmptyHeart.svg";
import heart from "@/assets/icons/heart.svg";
import { useProductLike } from "@/hooks/useProductLike";
import Image from "next/image";

type LikeButtonProps = {
    isLiked: boolean;
    productId: number;
    isInside?: boolean;
};

export default function LikeButton({
    isLiked: initialIsLiked,
    productId,
    isInside = true,
}: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const { toggleLike } = useProductLike();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked((prev) => !prev);
        try {
            await toggleLike(productId);
        } catch {
            setIsLiked((prev) => !prev);
        }
    };

    if (isInside) {
        return (
            <Image
                src={isLiked ? heart : emptyHeart}
                alt="좋아요 아이콘"
                width={24}
                height={22}
                className="absolute bottom-[5px] right-[5px] z-[1] cursor-pointer"
                onClick={handleClick}
            />
        );
    }

    return (
        <button
            className="w-[56px] h-[56px] flex items-center justify-center cursor-pointer md:rounded-[8px] md:border border-gachigageGray3"
            onClick={handleClick}
        >
            <Image
                src={isLiked ? heart : grayEmptyHeart}
                alt="좋아요 아이콘"
                width={32}
                height={32}
            />
        </button>
    );
}
