"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className="fixed top-0 w-full h-[80px] flex items-center justify-center bg-gachigageWhite shadow-[0_0_8px_0_rgba(0,0,0,0.1)] z-1">
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
                        <Link
                            href="/community"
                            className={`py-[6.5px] px-[10px] cursor-pointer ${
                                pathname.startsWith("/community")
                                    ? "font-semibold"
                                    : ""
                            }`}
                        >
                            커뮤니티
                        </Link>
                        <Link
                            href="/chat"
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
                    className={`py-[6.5px] cursor-pointer ${
                        pathname.startsWith("/mypage") ? "font-semibold" : ""
                    }`}
                >
                    마이페이지
                </Link>
            </div>
        </div>
    );
}