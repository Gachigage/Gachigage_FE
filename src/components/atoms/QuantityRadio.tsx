import { formatNumber } from "@/lib/utils";
import { useState } from "react";

type QuantityRadioOption = {
    quantity: number;
    price: number;
};

export default function QuantityRadio({
    options,
}: {
    options: QuantityRadioOption[];
}) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-col gap-[8px]">
            {options.map((option, index) => (
                <label
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`flex items-center font-medium justify-between px-[12px] py-[7px] cursor-pointer border-[1px] rounded-[8px] ${
                        selected === index
                            ? "border-gachigageMint bg-gachigageBrightMint3 text-gachigageDark"
                            : "border-gachigageGray1 bg-white text-gachigageGray7 "
                    }`}
                >
                    <div className="flex items-center gap-[8px]">
                        <div
                            className={`w-[14px] h-[14px] rounded-full border-[1px] flex items-center justify-center ${
                                selected === index
                                    ? "border-gachigageMint"
                                    : "border-gachigageGray7"
                            }`}
                        >
                            {selected === index && (
                                <div className="w-[6px] h-[6px] rounded-full bg-gachigageMint" />
                            )}
                        </div>
                        <span>{option.quantity}개</span>
                    </div>

                    <span>{formatNumber(option.price)}원</span>
                </label>
            ))}
        </div>
    );
}
