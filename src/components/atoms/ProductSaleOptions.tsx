"use client";

import Image from "next/image";
import xButton from "@/assets/icons/xButton27.svg";
import { useProductFormStore } from "@/store/useProductFormStore";
import { formatNumber, parseFormattedNumber } from "@/lib/utils";

export default function ProductSaleOptions() {
    const stock = useProductFormStore((state) => state.stock);
    const setStock = useProductFormStore((state) => state.setStock);
    const priceTable = useProductFormStore((state) => state.priceTable);
    const addPriceTableItem = useProductFormStore(
        (state) => state.addPriceTableItem,
    );
    const updatePriceTableItem = useProductFormStore(
        (state) => state.updatePriceTableItem,
    );
    const removePriceTableItem = useProductFormStore(
        (state) => state.removePriceTableItem,
    );

    const handleNumberInput = (value: string): number => {
        const numericValue = value.replace(/[^0-9]/g, "");
        return numericValue ? parseFormattedNumber(numericValue) : 0;
    };

    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px]">
                <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                    판매 옵션
                </span>
                <span className="text-[13px] text-gachigageDarkMint1 font-normal">
                    (필수 항목)
                </span>
            </div>

            <span className="text-[13px] font-normal text-[#6B7684] leading-[120%]">
                TIP: 항목을 추가하면 일괄 판매로 바뀌어요!
            </span>

            {/* 남은 수량 */}
            <div className="flex items-center gap-[8px]">
                <input
                    type="text"
                    value={stock > 0 ? formatNumber(stock) : ""}
                    onChange={(e) =>
                        setStock(handleNumberInput(e.target.value))
                    }
                    placeholder="재고 수량 입력"
                    className="w-[270px] h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal text-center placeholder:text-gachigageGray7 outline-none"
                />
                <span className="text-[16px] font-medium text-gachigageDark">
                    남은 수량
                </span>
            </div>

            {/* 가격표 */}
            {priceTable.map((item, index) => (
                <div key={index} className="flex items-center gap-[8px]">
                    <input
                        type="text"
                        value={
                            item.quantity > 0 ? formatNumber(item.quantity) : ""
                        }
                        onChange={(e) =>
                            updatePriceTableItem(index, {
                                quantity: handleNumberInput(e.target.value),
                            })
                        }
                        placeholder="개수 입력"
                        className="flex-1 min-w-0 h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal text-right placeholder:text-gachigageGray7 placeholder:text-center outline-none"
                    />
                    <span className="text-[16px] font-medium text-gachigageDark shrink-0">
                        개
                    </span>
                    <input
                        type="text"
                        value={item.price > 0 ? formatNumber(item.price) : ""}
                        onChange={(e) =>
                            updatePriceTableItem(index, {
                                price: handleNumberInput(e.target.value),
                            })
                        }
                        placeholder="가격 입력"
                        className="flex-1 min-w-0 h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal text-right placeholder:text-gachigageGray7 placeholder:text-center outline-none"
                    />
                    <span className="text-[16px] font-medium text-gachigageDark shrink-0">
                        원
                    </span>
                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removePriceTableItem(index)}
                            className="cursor-pointer shrink-0"
                        >
                            <Image
                                src={xButton}
                                alt="삭제"
                                width={27}
                                height={27}
                            />
                        </button>
                    )}
                </div>
            ))}

            {/* 추가하기 버튼 */}
            <button
                onClick={addPriceTableItem}
                className="w-[354px] h-[43px] rounded-[8px] border border-gachigageSubMint bg-white text-[16px] font-medium text-gachigageSubMint cursor-pointer"
            >
                추가하기
            </button>
        </div>
    );
}
