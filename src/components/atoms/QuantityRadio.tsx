import { formatNumber } from "@/lib/utils";
import { PriceTableStatus } from "@/types/Product";
import blackArrowDown from "@/assets/icons/blackArrowDown.svg";
import Image from "next/image";
import { useState } from "react";

type QuantityRadioOption = {
    quantity: number;
    price: number;
    status?: PriceTableStatus;
};

export default function QuantityRadio({
    options,
    isOwner,
    onStatusChange,
}: {
    options: QuantityRadioOption[];
    isOwner: boolean;
    onStatusChange?: (index: number, newStatus: PriceTableStatus) => void;
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-[8px]">
            {options.map((option, index) =>
                isOwner ? (
                    <div key={index} className="w-full flex gap-[8px]">
                        <div className=" w-full flex items-center font-medium justify-between pl-[20px] pr-[12px] py-[7px] border-[1px] rounded-[8px] border-gachigageGray1 bg-white text-gachigageGray7">
                            <span>{option.quantity}개</span>
                            <span>{formatNumber(option.price)}원</span>
                        </div>
                        <div className="relative">
                            <button
                                className="w-full min-w-[108px] flex items-center font-medium justify-between px-[12px] py-[7px] border-[1px] rounded-[8px] text-gachigageDark font-medium border-gachigageGray1 bg-gachigageGray0 cursor-pointer"
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                            >
                                <span>
                                    {option?.status === "ACTIVE"
                                        ? "판매중"
                                        : "판매중단"}
                                </span>
                                <Image
                                    src={blackArrowDown}
                                    alt="blackArrowDown icon"
                                    width={26}
                                    height={26}
                                />
                            </button>
                            {/* 판매 상태 변경 모달 */}
                            {openIndex === index && (
                                <div className="absolute top-full left-0 mt-[4px] w-[170px] flex flex-col gap-[8px] p-[8px] bg-gachigageWhite border border-gachigageDark rounded-[8px] shadow-[0_0_4px_rgba(0,0,0,0.25)] z-10">
                                    <div
                                        className={`w-full h-[50px] flex items-center justify-center border border-gachigageWhite  rounded-[4px] cursor-pointer hover:bg-gachigageGray0 hover:border hover:border-gachigageGray1 ${option.status === "ACTIVE" ? "bg-gachigageGray0 border-gachigageGray1" : ""}`}
                                        onClick={() => {
                                            if (option.status !== "ACTIVE") {
                                                onStatusChange?.(
                                                    index,
                                                    "ACTIVE",
                                                );
                                            }
                                            setOpenIndex(null);
                                        }}
                                    >
                                        판매중
                                    </div>
                                    <div
                                        className={`w-full h-[50px] flex items-center justify-center border border-gachigageWhite  rounded-[4px] cursor-pointer hover:bg-gachigageGray0 hover:border hover:border-gachigageGray1 ${option.status === "INACTIVE" ? "bg-gachigageGray0 border-gachigageGray1" : ""}`}
                                        onClick={() => {
                                            if (option.status !== "INACTIVE") {
                                                onStatusChange?.(
                                                    index,
                                                    "INACTIVE",
                                                );
                                            }
                                            setOpenIndex(null);
                                        }}
                                    >
                                        판매 중단
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        key={index}
                        className="flex items-center font-medium justify-between pl-[20px] pr-[12px] py-[7px] border-[1px] rounded-[8px] border-gachigageGray1 bg-white text-gachigageGray7"
                    >
                        <span>{option.quantity}개</span>
                        <span>{formatNumber(option.price)}원</span>
                    </div>
                ),
            )}
        </div>
    );
}
