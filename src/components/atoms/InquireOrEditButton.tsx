"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AlertModal from "./AlertModal";

type InquireOrEditButtonType = {
    isOwner: boolean;
    isEditorInquireClick?: () => void;
    disabled?: boolean;
};

export default function InquireOrEditButton({
    isOwner,
    isEditorInquireClick,
    disabled = false,
}: InquireOrEditButtonType) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        if (isOwner) {
            isEditorInquireClick?.();
        } else {
            if (session) {
                isEditorInquireClick?.();
            } else {
                setIsModalOpen(true);
            }
        }
    };

    return (
        <>
            <button
                className={`w-full h-[56px] flex items-center justify-center leading-[120%] text-[24px] font-semibold md:border-[0.5px] md:rounded-[8px] ${
                    disabled
                        ? "bg-gachigageGray3 text-gachigageGray5 cursor-not-allowed border-gachigageGray3"
                        : "bg-gachigageMint text-gachigageWhite cursor-pointer border-gachigageBrightMint1"
                }`}
                onClick={handleClick}
                disabled={disabled}
            >
                {isOwner ? "수정하기" : "문의하기"}
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
