"use client";

import Image from "next/image";
import emptyCheckBox from "@/assets/icons/emptyCheckBox.svg";
import checkedBox from "@/assets/icons/checkedBox.svg";
import { useProductFormStore } from "@/store/useProductFormStore";

export default function ProductTradeType() {
    const tradeType = useProductFormStore((state) => state.tradeType);
    const setDirectTrade = useProductFormStore((state) => state.setDirectTrade);
    const setDeliveryTrade = useProductFormStore(
        (state) => state.setDeliveryTrade,
    );

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    거래 유형
                </span>
                <span className="text-[13px] text-gachigageDarkMint1 font-normal">
                    (필수 항목)
                </span>
            </div>

            <div className="flex gap-[10px]">
                <button
                    onClick={() => setDirectTrade(!tradeType.direct)}
                    className={`flex-1 h-[40px] rounded-[8px] border px-[12px] flex items-center cursor-pointer ${
                        tradeType.direct
                            ? "bg-gachigageBrightMint3 border-gachigageMint"
                            : "border-gachigageGray3"
                    }`}
                >
                    <Image
                        src={tradeType.direct ? checkedBox : emptyCheckBox}
                        alt="체크박스"
                        width={26}
                        height={26}
                    />
                    <span
                        className={`flex-1 text-center text-[16px] font-normal ${
                            tradeType.direct
                                ? "text-gachigageDark"
                                : "text-gachigageGray7"
                        }`}
                    >
                        직거래
                    </span>
                </button>

                <button
                    onClick={() => setDeliveryTrade(!tradeType.delivery)}
                    className={`flex-1 h-[40px] rounded-[8px] border px-[12px] flex items-center cursor-pointer ${
                        tradeType.delivery
                            ? "bg-gachigageBrightMint3 border-gachigageMint"
                            : "border-gachigageGray3"
                    }`}
                >
                    <Image
                        src={tradeType.delivery ? checkedBox : emptyCheckBox}
                        alt="체크박스"
                        width={26}
                        height={26}
                    />
                    <span
                        className={`flex-1 text-center text-[16px] font-normal ${
                            tradeType.delivery
                                ? "text-gachigageDark"
                                : "text-gachigageGray7"
                        }`}
                    >
                        택배거래
                    </span>
                </button>
            </div>
        </div>
    );
}
