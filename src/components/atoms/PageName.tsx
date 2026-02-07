import Link from "next/link";
import moreIcon from "@/assets/icons/more.svg"
import Image from "next/image";

interface PageNameProps {
    name: string;
    href?: string;
    flagAdd?: boolean;
}
export default function PageName({ name, href, flagAdd = true }:PageNameProps) {
    return (
        <div className="flex flex-row justify-between mb-[20px]">
            <span className="text-dSubTitle">{name}</span>
            {(flagAdd && href ) && 
                <Link href={href} className="flex items-center text-[var(--color-gachigageGray5)]">
                    <span>더보기</span>
                    <Image src={moreIcon} alt="더보기" width={20} height={20}/>
                </Link>
            }
        </div>
    )
}