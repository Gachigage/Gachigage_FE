"use client";

import Image from "next/image";
import person from "@/assets/icons/person.svg";
import eyeLine from "@/assets/icons/eyeLine.svg";
import { formatNumber } from "@/lib/utils";
import NaverMap from "@/components/atoms/NaverMap";
import LikeButton from "../atoms/LikeButton";
import InquireButton from "../atoms/InquireButton";
import QuantityRadio from "../atoms/QuantityRadio";
import { ProductDetail } from "@/types/Product";
import { useProductCategories } from "@/hooks/useProductCategories";

type ProductDetailInfoType = {
    product: ProductDetail;
};

export default function ProductDetailInfo({ product }: ProductDetailInfoType) {
    const { data: categories } = useProductCategories();

    const getCategoryNames = () => {
        if (!categories) return { main: "", sub: "" };

        const mainCategory = categories.find(
            (cat) => cat.id === product.category.mainCategoryId,
        );
        const subCategory = mainCategory?.children.find(
            (child) => child.id === product.category.subCategoryId,
        );

        return {
            main: mainCategory?.name ?? "",
            sub: subCategory?.name ?? "",
        };
    };

    const categoryNames = getCategoryNames();

    return (
        <div className="flex flex-1 flex-col gap-[36px]">
            <div className="flex w-full flex-col gap-[12px]">
                {/* 카테고리 */}
                <div className="flex gap-[4px] font-normal text-[13px] leading-[120%] text-gachigageDarkMint1">
                    <span>{categoryNames.main}</span>
                    <span>{">"}</span>
                    <span>{categoryNames.sub}</span>
                </div>
                {/* 제목 */}
                <p className="text-[18px] md:text-[28px] font-semibold leading-[120%] text-gachigageDark break-keep break-words">
                    {product.title}
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
                        <span>{product.sellerName}</span>
                    </div>

                    <div className="flex gap-[4px] items-center justify-center">
                        <Image
                            src={eyeLine}
                            width={20}
                            height={20}
                            alt="eyeLine 아이콘"
                        />
                        <span>{formatNumber(product.viewCount)}</span>
                    </div>
                </div>

                {/* 거래 방식 */}
                <div className="flex gap-[4px]">
                    {product.tradeType === "DIRECT" && (
                        <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                            직거래
                        </div>
                    )}
                    {product.tradeType === "DELIVERY" && (
                        <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                            택배 거래
                        </div>
                    )}
                    {product.tradeType === "ALL" && (
                        <>
                            <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                                직거래
                            </div>
                            <div className="p-[8px] bg-[#E6F5FC] rounded-[12px] text-[13px] font-normal leading-[120%] text-[#079AE3] flex items-center justify-center">
                                택배 거래
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 본문 */}
            <p className="break-keep break-words font-normal text-gachigageDark">
                {product.detail}
            </p>

            {/* 수량 선택 */}
            <div className="flex flex-col gap-[8px]">
                {/* 남은 수량 */}
                <div className="flex items-center gap-[8px] font-normal">
                    <span>남은 수량:</span>
                    <div className="flex items-center justify-center gap-[4px] text-gachigageDarkMint1">
                        <span className="font-medium">
                            {formatNumber(product.stock)}
                        </span>
                        <span>개</span>
                    </div>
                </div>

                {/* 수량/가격 라디오 버튼 */}
                <QuantityRadio options={product.priceTable} />
            </div>

            {/* 거래 희망 장소 */}
            <div className="w-full flex flex-col gap-[20px]">
                <div className="flex items-center gap-[12px]">
                    <span className="font-semibold text-[18px] text-gachigageDark">
                        거래 희망 장소
                    </span>
                    <span className="font-normal text-[14px] text-gachigageDark/70">
                        {product.preferredTradeLocation?.address}
                    </span>
                </div>
                <NaverMap
                    latitude={product.preferredTradeLocation?.latitude}
                    longitude={product.preferredTradeLocation?.longitude}
                />
            </div>

            {/* 좋아요 & 문의하기*/}
            <div className="fixed bottom-[110px] left-0 right-0 z-50 flex gap-[4px] rounded-t-[8px] shadow-[0_-2px_4px_0_rgba(0,0,0,0.06)] overflow-hidden md:static md:bottom-auto md:z-auto md:rounded-none md:shadow-none md:overflow-visible">
                <LikeButton
                    isLiked={product.isLiked}
                    productId={product.productId}
                    isInside={false}
                />
                <InquireButton productId={product.productId} />
            </div>
        </div>
    );
}
