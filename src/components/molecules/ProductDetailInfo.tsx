"use client";

import { useState } from "react";
import Image from "next/image";
import person from "@/assets/icons/person.svg";
import eyeLine from "@/assets/icons/eyeLine.svg";
import { formatNumber } from "@/lib/utils";
import NaverMap from "@/components/atoms/NaverMap";

const response = {
    productId: 111,
    title: "상품 제목",
    detail: "물품 상세 설명",
    sellerName: "홍길동",
    category: {
        main: "업종명",
        sub: "세부항목명",
    },
    tradeTypes: ["직거래", "택배거래"],
    imageUrls: [
        "[https://bucket/image1.jpg](https://bucket/image1.jpg)",
        "[https://bucket/image2.jpg](https://bucket/image2.jpg)",
    ],
    priceTable: [
        { minQuantity: 1, price: 10000 },
        { minQuantity: 5, price: 45000 },
    ],
    preferredTradeLocations: [
        {
            latitude: 37.497951,
            longitude: 127.027619,
            address: "서울 강남구 강남역",
        },
    ],
    viewCount: 52,
    likeCount: 13,
    isLiked: true,
    relatedProducts: [
        {
            productId: 1,
            title: "string",
            thumbnailUrl: "string",
            price: 1,
            quantity: 1,
        },
    ],
};

export default function ProductDetailInfo() {
    return (
        <div className="flex flex-1 flex-col gap-[36px]">
            <div className="flex w-full flex-col gap-[12px]">
                {/* 카테고리 */}
                <div className="flex gap-[4px] font-normal text-[13px] leading-[120%] text-gachigageDarkMint1">
                    <span>카테고리1</span>
                    <span>{">"}</span>
                    <span>카테고리2</span>
                </div>
                {/* 제목 */}
                <p className="text-[18px] md:text-[28px] font-semibold leading-[120%] text-gachigageDark break-keep break-words">
                    Lorem ipsum dolor sit amet, consectetur
                </p>
                {/* 판매자명 & 조회수 */}
                <div className="text-[14px] text-gachigageGray7 font-normal flex gap-[8px] items-center">
                    <div className="flex gap-[4px] items-center justify-center">
                        <Image
                            src={person}
                            width={20}
                            height={20}
                            alt="person 아이콘"
                        />
                        <span>판매자 명</span>
                    </div>

                    <div className="flex gap-[4px] items-center justify-center">
                        <Image
                            src={eyeLine}
                            width={20}
                            height={20}
                            alt="eyeLine 아이콘"
                        />
                        <span>{formatNumber(135)}</span>
                    </div>
                </div>

                {/* 거래 방식 */}
                <div className="flex gap-[4px]">
                    <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                        직거래
                    </div>
                    <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                        택배 거래
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <p className="break-keep break-words font-normal text-gachigageDark">
                Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
                amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem
                ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
                consectetur Lorem ipsum dolor sit amet, consectetur, Lorem ipsum
                dolor sit amet, consectetur, Lorem ipsum dolor sit amet,
                consecteturLorem ipsum dolor sit amet, consectetur Lorem ipsum
                dolor sit amet, consectetur Lorem ipsum dolor sit amet,
                consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
                dolor sit amet, consectetur Lorem ipsum dolor sit amet,
                consectetur, Lorem ipsum dolor sit amet, consectetur, Lorem
                ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            </p>

            {/* 수량 선택 */}
            <div className="flex flex-col gap-[8px]">
                {/* 남은 수량 */}
                <div className="flex items-center gap-[8px] font-normal">
                    <span>남은 수량:</span>
                    <div className="flex items-center justify-center gap-[4px] text-gachigageDarkMint1">
                        <span className="font-medium">
                            {formatNumber(1200)}
                        </span>
                        <span>개</span>
                    </div>
                </div>

                {/* 수량/가격 라디오 버튼 */}
                <QuantityRadio
                    options={[
                        { quantity: 10, price: 100000 },
                        { quantity: 100, price: 1000000 },
                        { quantity: 500, price: 5000000 },
                    ]}
                />
            </div>

            {/* 거래 희망 장소 */}
            <div className="w-full flex flex-col gap-[20px]">
                <div className="flex items-center gap-[12px]">
                    <span className="font-semibold text-[18px] text-gachigageDark">
                        거래 희망 장소
                    </span>
                    <span className="font-normal text-[14px] text-gachigageDark/70">
                        {response.preferredTradeLocations[0]?.address}
                    </span>
                </div>
                <NaverMap
                    latitude={response.preferredTradeLocations[0]?.latitude}
                    longitude={response.preferredTradeLocations[0]?.longitude}
                />
            </div>
        </div>
    );
}

interface QuantityOption {
    quantity: number;
    price: number;
}

function QuantityRadio({ options }: { options: QuantityOption[] }) {
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
