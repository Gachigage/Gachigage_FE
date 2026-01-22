import Image from "next/image";
import Link from "next/link";
import backArrow from "@/assets/icons/backArrow.svg";

interface BackButtonProps {
    pageName: string;
    href: string;
}

export default function BackButton({ pageName, href }: BackButtonProps) {
    return (
        <Link href={href} className="flex items-center gap-[12px]">
            <Image
                src={backArrow}
                alt="뒤로가기 아이콘"
                width={36}
                height={36}
            />
            <span className="text-[18px] text-gachigageDark font-semibold text-[24px] leading-[120%]">
                {pageName}
            </span>
        </Link>
    );
}
