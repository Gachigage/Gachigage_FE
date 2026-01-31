"use client";

import { useProductFormStore } from "@/store/useProductFormStore";

export default function ProductDetailInput() {
    const detail = useProductFormStore((state) => state.detail);
    const setDetail = useProductFormStore((state) => state.setDetail);

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    세부정보
                </span>
                <span className="text-[13px] text-gachigageGray5 font-normal">
                    (선택 항목)
                </span>
            </div>

            <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="세부 정보를 입력해주세요."
                className="w-full h-[177px] rounded-[8px] border border-gachigageDark px-[12px] py-[12px] text-[16px] text-gachigageDark font-normal placeholder:text-gachigageGray7 outline-none resize-none"
            />
        </div>
    );
}
