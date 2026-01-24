"use client";

import grayEmptyHeart from "@/assets/icons/grayEmptyHeart.svg";
import heart from "@/assets/icons/heart.svg";
import Image from "next/image";

type LikeButtonProps = {
    isLike: boolean;
};

export default function LikeButton({ isLike }: LikeButtonProps) {
    return (
        <button
            className={`w-[56px] h-[56px]  flex items-center justify-center cursor-pointer
                md:rounded-[8px] md:border border-gachigageGray3 
                `}
        >
            <Image
                src={isLike ? heart : grayEmptyHeart}
                alt="grayEmptyHeart 아이콘"
                width={32}
                height={32}
            ></Image>
        </button>
    );
}
