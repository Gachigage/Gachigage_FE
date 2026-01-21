"use client";

import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import { useEffect } from "react";

export default function ProductGroupFilter() {
    const productGroup = useProductSearchFilterStore(
        (state) => state.productGroup,
    );
    useEffect(() => {
        console.log(productGroup);
    }, [productGroup]);
    const setProductGroup = useProductSearchFilterStore(
        (state) => state.setProductGroup,
    );

    return (
        <div className="flex items-center justify-center gap-[10px]">
            <button
                className={`cursor-pointer text-[13px] md:text-[18px] border-b hover:text-gachigageDark hover:border-gachigageDark
                    ${productGroup === "일괄" || productGroup === "개별" ? "font-normal text-gachigageGray7 border-transparent hover:font-medium" : "font-medium text-gachigageDark border-gachigageDark"}
                `}
                onClick={() => setProductGroup("전체")}
            >
                전체 상품
            </button>
            <span className="text-gachigageGray5">|</span>
            <button
                className={`cursor-pointer text-[13px] md:text-[18px] border-b hover:text-gachigageDark hover:border-gachigageDark
                    ${productGroup === "일괄" ? "font-medium text-gachigageDark border-gachigageDark" : "font-normal text-gachigageGray7 border-transparent hover:font-medium"}
                `}
                onClick={() => setProductGroup("일괄")}
            >
                일괄 판매
            </button>
            <span className="text-gachigageGray5">|</span>
            <button
                className={`cursor-pointer text-[13px] md:text-[18px] border-b hover:text-gachigageDark hover:border-gachigageDark
                    ${productGroup === "개별" ? "font-medium text-gachigageDark border-gachigageDark" : "font-normal text-gachigageGray7 border-transparent hover:font-medium"}
                `}
                onClick={() => setProductGroup("개별")}
            >
                개별 판매
            </button>
        </div>
    );
}
