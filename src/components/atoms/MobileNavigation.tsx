"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AlertModal from "./AlertModal";
import shopSelected from "@/assets/icons/shopSelected.svg";
import shopDefault from "@/assets/icons/shopDefault.svg";
import communityDefault from "@/assets/icons/communityDefault.svg";
import chatSelected from "@/assets/icons/chatSelected.svg";
import chatDefault from "@/assets/icons/chatDefault.svg";
import profileSelected from "@/assets/icons/profileSelected.svg";
import profileDefault from "@/assets/icons/profileDefault.svg";

export default function MobileNavigation() {
    const pathname = usePathname();
    const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

    return (
        <div className="w-full z-99 h-[110px] border-t pt-[12px] pb-[24px] border-gachigageGray1 md:hidden bg-gachigageWhite flex justify-center fixed bottom-0">
            <div className="flex gap-[12px] h-[74px]">
                <Link href="/products">
                    <div className="flex flex-col items-center gap-[8px] w-[79.5px]">
                        {pathname.startsWith("/products") ? (
                            <>
                                <Image
                                    src={shopSelected}
                                    alt="물품 거래"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-medium">물품 거래</p>
                            </>
                        ) : (
                            <>
                                <Image
                                    src={shopDefault}
                                    alt="물품 거래"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-normal text-gachigageGray3">
                                    물품 거래
                                </p>
                            </>
                        )}
                    </div>
                </Link>

                <button onClick={() => setIsCommunityModalOpen(true)}>
                    <div className="flex flex-col items-center gap-[8px] w-[79.5px]">
                        <Image
                            src={communityDefault}
                            alt="커뮤니티"
                            width={36}
                            height={36}
                        />
                        <p className="font-normal text-gachigageGray3">
                            커뮤니티
                        </p>
                    </div>
                </button>

                <Link href="/chat">
                    <div className="flex flex-col items-center gap-[8px] w-[79.5px]">
                        {pathname.startsWith("/chat") ? (
                            <>
                                <Image
                                    src={chatSelected}
                                    alt="채팅"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-medium">채팅</p>
                            </>
                        ) : (
                            <>
                                <Image
                                    src={chatDefault}
                                    alt="채팅"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-normal text-gachigageGray3">
                                    채팅
                                </p>
                            </>
                        )}
                    </div>
                </Link>

                <Link href="/mypage">
                    <div className="flex flex-col items-center gap-[8px] w-[79.5px]">
                        {pathname.startsWith("/mypage") ? (
                            <>
                                <Image
                                    src={profileSelected}
                                    alt="마이페이지"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-medium">마이페이지</p>
                            </>
                        ) : (
                            <>
                                <Image
                                    src={profileDefault}
                                    alt="마이페이지"
                                    width={36}
                                    height={36}
                                />
                                <p className="font-normal text-gachigageGray3">
                                    마이페이지
                                </p>
                            </>
                        )}
                    </div>
                </Link>
            </div>
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
        </div>
    );
}
