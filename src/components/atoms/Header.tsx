"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AlertModal from "./AlertModal";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

    const handleProtectedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!session) {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className="fixed top-0 w-full h-[80px] flex items-center justify-center bg-gachigageWhite shadow-[0_0_8px_0_rgba(0,0,0,0.1)] z-99">
                <div className="md:hidden flex items-center justify-center">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="같이가게 로고"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex w-full md:max-w-[768px] xl:max-w-[1152px] justify-between px-[24px]">
                    <div className="flex gap-[20px] text-[18px] pl-[12px]">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="같이가게 로고"
                                width={40}
                                height={40}
                                className="cursor-pointer"
                            />
                        </Link>

                        <div className="flex gap-[20px] font-normal">
                            <Link
                                href="/products"
                                className={`py-[6.5px] px-[10px] cursor-pointer ${
                                    pathname.startsWith("/products")
                                        ? "font-semibold"
                                        : ""
                                }`}
                            >
                                물품 거래
                            </Link>
                            <button
                                onClick={() => setIsCommunityModalOpen(true)}
                                className="py-[6.5px] px-[10px] cursor-pointer text-gachigageGray3"
                            >
                                커뮤니티
                            </button>
                            <Link
                                href="/chat"
                                onClick={handleProtectedClick}
                                className={`py-[6.5px] px-[10px] cursor-pointer ${
                                    pathname.startsWith("/chat")
                                        ? "font-semibold"
                                        : ""
                                }`}
                            >
                                채팅
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/mypage"
                        onClick={handleProtectedClick}
                        className={`py-[6.5px] cursor-pointer ${
                            pathname.startsWith("/mypage")
                                ? "font-semibold"
                                : ""
                        }`}
                    >
                        마이페이지
                    </Link>
                </div>
            </div>
            <AlertModal
                title="로그인이 필요해요."
                description={`추가적인 기능을 사용하기 위해선\n로그인 및 회원가입이 필요합니다.`}
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onClose={() => router.push("/login")}
                cancelText="다음에"
                confirmText="로그인"
            />
            <AlertModal
                title="준비 중인 기능이에요."
                description="현재 해당 기능은 준비중입니다."
                type="info"
                isOpen={isCommunityModalOpen}
                onCancel={() => setIsCommunityModalOpen(false)}
                onClose={() => setIsCommunityModalOpen(false)}
                cancelText="닫기"
                confirmText="확인"
            />
        </>
    );
}
