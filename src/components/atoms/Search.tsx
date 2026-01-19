"use client";

import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

export default function Search() {
    const searchKeyword = useProductSearchFilterStore(
        (state) => state.searchKeyword,
    );
    const setSearchKeyword = useProductSearchFilterStore(
        (state) => state.setSearchKeyword,
    );

    const handleSearch = () => {
        if (!searchKeyword.trim()) return;
        console.log(searchKeyword);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center w-full h-[56px] border border-gachigageGray0 bg-white rounded-[12px] pl-[10px] pr-[6px] gap-[10px]">
            <Image src={searchIcon} alt="검색 아이콘" width={24} height={24} />
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="원하는 물품을 찾아보세요"
                className="flex-1 placeholder:text-gachigageGray5 font-normal focus:outline-none mr-[14px]"
            />
            <button
                onClick={handleSearch}
                className="w-[128px] h-[42px] flex items-center justify-center border border-gachigageSubMint text-[18px] font-medium text-gachigageSubMint rounded-[8px] hover:bg-gachigageBrightMint3 cursor-pointer hover:font-semibold"
            >
                검색
            </button>
        </div>
    );
}
