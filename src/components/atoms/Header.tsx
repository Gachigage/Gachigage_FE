import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full h-[80px] flex items-center justify-center bg-amber-200">
            <div className="w-full max-w-[402px] xl:max-w-[1152px] bg-amber-500 flex">
                <div className="flex gap-[20px]">
                    <Image
                        src="/logo.svg"
                        alt="같이가게 로고"
                        width={40}
                        height={40}
                        className="cursor-pointer"
                    />

                    <div className="flex gap-[20px]">
                        <Link
                            href="/products"
                            className="text-[18px] py-[6.5px] px-[10px] cursor-pointer"
                        >
                            물품 거래
                        </Link>
                        <Link
                            href="/community"
                            className="text-[18px] py-[6.5px] px-[10px] cursor-pointer"
                        >
                            커뮤니티
                        </Link>
                        <Link
                            href="/chat"
                            className="text-[18px] py-[6.5px] px-[10px] cursor-pointer"
                        >
                            채팅
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
