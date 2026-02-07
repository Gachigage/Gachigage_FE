"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AlertModal from "./AlertModal";

export default function ProductAddButton() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        if (session) {
            router.push("/products/create");
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="w-[114px] h-[32px] cursor-pointer md:w-[230px] md:h-[54px] xl:w-[186px] xl:h-[56px] flex items-center justify-center bg-gachigageMint border-[0.5px] border-gachigageBrightMint1 rounded-[8px] text-gachigageWhite font-normal text-[13px] md:font-medium xl:font-semibold md:text-[18px] hover:bg-gachigageDarkMint1"
            >
                물품 등록
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
