"use client";

import Image from "next/image";
import { useState } from "react";
import grayArrowDown from "@/assets/icons/grayArrowDown.svg";
import emptyCheckBox from "@/assets/icons/emptyCheckBox.svg";
import checkedBox from "@/assets/icons/checkedBox.svg";
import search from "@/assets/icons/search.svg";
import xButton from "@/assets/icons/xButton27.svg";
import { formatNumber, parseFormattedNumber } from "@/lib/utils";

interface SaleOption {
    id: number;
    count: string;
    price: string;
}

export default function ProductCreateDetail() {
    // 제목
    const [title, setTitle] = useState("");

    // 세부정보
    const [description, setDescription] = useState("");

    // 판매 옵션
    const [remainingQuantity, setRemainingQuantity] = useState("");
    const [saleOptions, setSaleOptions] = useState<SaleOption[]>([
        { id: 1, count: "", price: "" },
    ]);

    // 거래 유형
    const [directTrade, setDirectTrade] = useState(false);
    const [deliveryTrade, setDeliveryTrade] = useState(false);

    // 숫자만 입력 처리
    const handleNumberInput = (
        value: string,
        setter: (value: string) => void,
        withFormat: boolean = false,
    ) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        if (withFormat && numericValue) {
            setter(formatNumber(parseFormattedNumber(numericValue)));
        } else {
            setter(numericValue);
        }
    };

    // 판매 옵션 업데이트
    const updateSaleOption = (
        id: number,
        field: "count" | "price",
        value: string,
    ) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        const formattedValue = numericValue
            ? formatNumber(parseFormattedNumber(numericValue))
            : "";

        setSaleOptions((prev) =>
            prev.map((option) =>
                option.id === id
                    ? { ...option, [field]: formattedValue }
                    : option,
            ),
        );
    };

    // 판매 옵션 추가
    const addSaleOption = () => {
        const newId = Math.max(...saleOptions.map((o) => o.id)) + 1;
        setSaleOptions((prev) => [
            ...prev,
            { id: newId, count: "", price: "" },
        ]);
    };

    // 판매 옵션 삭제
    const removeSaleOption = (id: number) => {
        setSaleOptions((prev) => prev.filter((option) => option.id !== id));
    };

    return (
        <div className="flex flex-1 flex-col gap-[24px]">
            {/* 카테고리 */}
            <div className="flex flex-col gap-[8px]">
                <div className="flex gap-[8px]">
                    <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                        카테고리
                    </span>
                    <span className="text-[13px] text-gachigageDarkMint1 font-normal">
                        (필수 항목)
                    </span>
                </div>

                <div className="flex gap-[8px]">
                    <button className="w-[173px] h-[40px] rounded-[8px] border border-gachigageGray3 flex items-center justify-between px-[12px] cursor-pointer">
                        <span className="text-[16px] text-gachigageGray7 font-normal">
                            업종
                        </span>
                        <Image
                            src={grayArrowDown}
                            alt="grayArrowDown 아이콘"
                            width={26}
                            height={26}
                        />
                    </button>

                    <button className="w-[173px] h-[40px] rounded-[8px] border border-gachigageGray3 flex items-center justify-between px-[12px] cursor-pointer">
                        <span className="text-[16px] text-gachigageGray7 font-normal">
                            세부 항목
                        </span>
                        <Image
                            src={grayArrowDown}
                            alt="grayArrowDown 아이콘"
                            width={26}
                            height={26}
                        />
                    </button>
                </div>
            </div>

            {/* 제목 */}
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
                    onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                    placeholder="제목을 입력해주세요."
                    className="w-full h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal placeholder:text-gachigageGray7 outline-none"
                />
            </div>

            {/* 세부정보 */}
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
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value.slice(0, 500))
                    }
                    placeholder="세부 정보를 입력해주세요."
                    className="w-full h-[177px] rounded-[8px] border border-gachigageDark px-[12px] py-[12px] text-[16px] text-gachigageDark font-normal placeholder:text-gachigageGray7 outline-none resize-none"
                />
            </div>

            {/* 판매 옵션 */}
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
                        value={remainingQuantity}
                        onChange={(e) =>
                            handleNumberInput(
                                e.target.value,
                                setRemainingQuantity,
                                true,
                            )
                        }
                        placeholder="재고 수량 입력"
                        className="w-[270px] h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal text-center placeholder:text-gachigageGray7 outline-none"
                    />
                    <span className="text-[16px] font-medium text-gachigageDark">
                        남은 수량
                    </span>
                </div>

                {/* 개수, 가격 입력 */}
                {saleOptions.map((option, index) => (
                    <div
                        key={option.id}
                        className="flex items-center gap-[8px]"
                    >
                        <input
                            type="text"
                            value={option.count}
                            onChange={(e) =>
                                updateSaleOption(
                                    option.id,
                                    "count",
                                    e.target.value,
                                )
                            }
                            placeholder="개수 입력"
                            className="flex-1 min-w-0 h-[40px] rounded-[8px] border border-gachigageDark px-[12px] text-[16px] text-gachigageDark font-normal text-right placeholder:text-gachigageGray7 placeholder:text-center outline-none"
                        />
                        <span className="text-[16px] font-medium text-gachigageDark shrink-0">
                            개
                        </span>
                        <input
                            type="text"
                            value={option.price}
                            onChange={(e) =>
                                updateSaleOption(
                                    option.id,
                                    "price",
                                    e.target.value,
                                )
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
                                onClick={() => removeSaleOption(option.id)}
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
                    onClick={addSaleOption}
                    className="w-[354px] h-[43px] rounded-[8px] border border-gachigageSubMint bg-white text-[16px] font-medium text-gachigageSubMint cursor-pointer"
                >
                    추가하기
                </button>
            </div>

            {/* 거래 유형 */}
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
                        onClick={() => setDirectTrade(!directTrade)}
                        className={`flex-1 h-[40px] rounded-[8px] border px-[12px] flex items-center cursor-pointer ${
                            directTrade
                                ? "bg-gachigageBrightMint3 border-gachigageMint"
                                : "border-gachigageGray3"
                        }`}
                    >
                        <Image
                            src={directTrade ? checkedBox : emptyCheckBox}
                            alt="체크박스"
                            width={26}
                            height={26}
                        />
                        <span
                            className={`flex-1 text-center text-[16px] font-normal ${
                                directTrade
                                    ? "text-gachigageDark"
                                    : "text-gachigageGray7"
                            }`}
                        >
                            직거래
                        </span>
                    </button>

                    <button
                        onClick={() => setDeliveryTrade(!deliveryTrade)}
                        className={`flex-1 h-[40px] rounded-[8px] border px-[12px] flex items-center cursor-pointer ${
                            deliveryTrade
                                ? "bg-gachigageBrightMint3 border-gachigageMint"
                                : "border-gachigageGray3"
                        }`}
                    >
                        <Image
                            src={deliveryTrade ? checkedBox : emptyCheckBox}
                            alt="체크박스"
                            width={26}
                            height={26}
                        />
                        <span
                            className={`flex-1 text-center text-[16px] font-normal ${
                                deliveryTrade
                                    ? "text-gachigageDark"
                                    : "text-gachigageGray7"
                            }`}
                        >
                            택배거래
                        </span>
                    </button>
                </div>
            </div>

            {/* 거래 희망 장소 */}
            <div className="flex flex-col gap-[8px]">
                <div className="flex gap-[8px]">
                    <span className="text-[16px] text-gachigageDark font-semibold leading-[120%]">
                        거래 희망 장소
                    </span>
                    <span className="text-[13px] text-gachigageGray5 font-normal">
                        (선택 항목)
                    </span>
                </div>

                <button className="w-full h-[40px] rounded-[8px] border border-gachigageGray3 px-[12px] flex justify-between items-center cursor-pointer">
                    <span className="text-[16px] font-normal text-gachigageGray7">
                        희망하시는 장소를 입력해주세요.
                    </span>
                    <Image
                        src={search}
                        alt="검색 아이콘"
                        width={18}
                        height={18}
                    />
                </button>
            </div>
        </div>
    );
}
