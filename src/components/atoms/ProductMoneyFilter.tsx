import won from "@/assets/icons/won.svg";
import Image from "next/image";

export default function ProductMoneyFilter() {
    return (
        <div
            className={`w-full h-[54px] rounded-[12px] border border-gachigageGray1 font-normal text-gachigageGray5 text-[16px] flex items-center pl-[10px] gap-[10px] cursor-pointer transition-colors cursor-pointer
                    hover:bg-gachigageGray0`}
        >
            <Image src={won} alt="원 아이콘" width={24} height={24} />
            <span className="truncate pr-[10px]">금액</span>
        </div>
    );
}
