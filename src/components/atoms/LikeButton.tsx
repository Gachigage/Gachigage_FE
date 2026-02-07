"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import emptyHeart from "@/assets/icons/emptyHeart.svg";
import grayEmptyHeart from "@/assets/icons/grayEmptyHeart.svg";
import heart from "@/assets/icons/heart.svg";
import { useProductLike } from "@/hooks/useProductLike";
import Image from "next/image";
import AlertModal from "./AlertModal";

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
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const isProductDetail = /^\/products\/\d+$/.test(pathname);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toggleLike } = useProductLike();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session) {
            setIsModalOpen(true);
            return;
        }

        setIsLiked((prev) => !prev);
        try {
            await toggleLike(productId);
        } catch {
            setIsLiked((prev) => !prev);
        }
    };

    if (isInside) {
        return (
            <>
                <Image
                    src={isLiked ? heart : emptyHeart}
                    alt="좋아요 아이콘"
                    width={24}
                    height={22}
                    className={`absolute bottom-[5px] right-[5px] z-[1] cursor-pointer ${isProductDetail ? "bg-gachigageWhite" : ""}`}
                    onClick={handleClick}
                />
                <AlertModal
                    title="로그인이 필요해요."
                    description={`추가적인 기능을 사용하기 위해선\n로그인 및 회원가입이 필요합니다.`}
                    isOpen={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onClose={() => router.push("/login")}
                    cancelText="다음에"
                    confirmText="로그인"
                />
            </>
        );
    }

    return (
        <>
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
            <AlertModal
                title="로그인이 필요해요."
                description={`추가적인 기능을 사용하기 위해선\n로그인 및 회원가입이 필요합니다.`}
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onClose={() => router.push("/login")}
                cancelText="다음에"
                confirmText="로그인"
            />
        </>
    );
}
