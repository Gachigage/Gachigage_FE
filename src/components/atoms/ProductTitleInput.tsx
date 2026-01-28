"use client";

import { useProductFormStore } from "@/store/useProductFormStore";

export default function ProductTitleInput() {
    const title = useProductFormStore((state) => state.title);
    const setTitle = useProductFormStore((state) => state.setTitle);

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    제목
                </span>
                <span className="text-[13px] text-gachigageDarkMint1 font-normal">
                    (필수 항목)
                </span>
            </div>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
                className="w-full h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal placeholder:text-gachigageGray7 outline-none"
            />
        </div>
    );
}
