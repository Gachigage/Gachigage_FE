"use client";

import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";

export default function Search() {
    return (
        <div className="flex items-center w-full h-[56px] border border-gachigageGray0 bg-white rounded-[12px] pl-[10px] pr-[6px] gap-[10px]">
            <Image src={searchIcon} alt="검색 아이콘" width={24} height={24} />
            <input
                type="text"
                placeholder="원하는 물품을 찾아보세요"
                className="flex-1 placeholder:text-gachigageGray5 font-normal focus:outline-none mr-[14px]"
            />
            <button className="w-[128px] h-[42px] flex items-center justify-center border border-gachigageSubMint text-[18px] font-medium text-gachigageSubMint rounded-[8px] hover:bg-gachigageBrightMint3 cursor-pointer hover:font-semibold">
                검색
            </button>
        </div>
    );
}
