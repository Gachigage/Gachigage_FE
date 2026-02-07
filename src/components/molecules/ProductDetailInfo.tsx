"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import person from "@/assets/icons/person.svg";
import eyeLine from "@/assets/icons/eyeLine.svg";
import editPen from "@/assets/icons/editPen.svg";
import { formatNumber, parseFormattedNumber } from "@/lib/utils";
import NaverMap from "@/components/atoms/NaverMap";
import LikeButton from "../atoms/LikeButton";
import InquireOrEditButton from "../atoms/InquireOrEditButton";
import QuantityRadio from "../atoms/QuantityRadio";
import { PriceTableStatus, ProductDetail } from "@/types/Product";
import { useProductCategories } from "@/hooks/useProductCategories";
import { useProductFormStore } from "@/store/useProductFormStore";
import {
    useEditPriceTableStatus,
    useEditStock,
} from "@/hooks/useProductMutation";

type ProductDetailInfoType = {
    product: ProductDetail;
};

export default function ProductDetailInfo({ product }: ProductDetailInfoType) {
    const { data: categories } = useProductCategories();
    const router = useRouter();
    const { loadProductData } = useProductFormStore();
    const { mutate: editPriceTableStatus } = useEditPriceTableStatus();
    const { mutate: editStock } = useEditStock();

    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [stockInput, setStockInput] = useState(formatNumber(product.stock));

    const handleOpenStockModal = () => {
        setStockInput(formatNumber(product.stock));
        setIsStockModalOpen(true);
    };

    const handleCloseStockModal = () => {
        setIsStockModalOpen(false);
    };

    const handleStockInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFormattedNumber(e.target.value);
        setStockInput(formatNumber(numericValue));
    };

    const handleStockSubmit = () => {
        const newStock = parseFormattedNumber(stockInput);
        editStock(
            {
                productId: product.productId,
                product,
                newStock,
            },
            {
                onSuccess: () => {
                    setIsStockModalOpen(false);
                },
            },
        );
    };

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

    const handleEditOrInquire = () => {
        if (product.isOwner) {
            router.push(`/products/${product.productId}/edit`);
            loadProductData({
                images: product.imageUrls,
                primaryCategoryId: product.category.mainCategoryId,
                secondaryCategoryId: product.category.subCategoryId,
                title: product.title,
                detail: product.detail,
                stock: product.stock,
                priceTable: product.priceTable,
                tradeType: {
                    direct:
                        product.tradeType === "DIRECT" ||
                        product.tradeType === "ALL",
                    delivery:
                        product.tradeType === "DELIVERY" ||
                        product.tradeType === "ALL",
                },
                preferredLocation: product.preferredTradeLocation,
            });
        } else {
            // TODO: 채팅 페이지로 라우팅.. (의진님)
        }
    };

    const handleStatusChange = (index: number, newStatus: PriceTableStatus) => {
        editPriceTableStatus({
            productId: product.productId,
            product,
            index,
            newStatus,
        });
    };

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
            {product.isOwner ? (
                <div className="flex flex-col gap-[8px]">
                    {/* 남은 수량 */}
                    <div className="flex items-center gap-[8px] font-normal">
                        <span>남은 수량:</span>
                        <div className="flex items-center gap-[4px]">
                            <div className="flex items-center justify-center gap-[4px] text-gachigageDarkMint1">
                                <span className="font-medium">
                                    {formatNumber(product.stock)}
                                </span>
                                <span>개</span>
                            </div>
                            <button
                                className="cursor-pointer"
                                onClick={handleOpenStockModal}
                            >
                                <Image
                                    src={editPen}
                                    alt="editPen icon"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>

                    {/* 수량/가격 라디오 버튼 */}
                    <QuantityRadio
                        options={product.priceTable}
                        isOwner={product.isOwner}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            ) : (
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
                    <QuantityRadio
                        options={product.priceTable}
                        isOwner={product.isOwner}
                    />
                </div>
            )}

            {/* 거래 희망 장소 */}
            {product.preferredTradeLocation?.latitude &&
                product.preferredTradeLocation?.longitude &&
                product.preferredTradeLocation?.address && (
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
                            longitude={
                                product.preferredTradeLocation?.longitude
                            }
                        />
                    </div>
                )}

            {/* 좋아요 & 문의하기*/}
            <div className="fixed bottom-[110px] left-0 right-0 z-50 flex gap-[4px] rounded-t-[8px] shadow-[0_-2px_4px_0_rgba(0,0,0,0.06)] overflow-hidden md:static md:bottom-auto md:z-auto md:rounded-none md:shadow-none md:overflow-visible">
                <LikeButton
                    isLiked={product.isLiked}
                    productId={product.productId}
                    isInside={false}
                />
                <InquireOrEditButton
                    isOwner={product.isOwner}
                    isEditorInquireClick={handleEditOrInquire}
                    disabled={
                        !product.isOwner &&
                        product.priceTable.length > 0 &&
                        product.priceTable.every(
                            (item) => item.status === "INACTIVE",
                        )
                    }
                />
            </div>

            {/* 남은 수량 수정 모달 (화면 가운데) */}
            {isStockModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    onClick={handleCloseStockModal}
                >
                    <div
                        className="w-[378px] items-center flex flex-col bg-gachigageWhite border border-gachigageGray1 shadow-[0_0_9px_0_rgba(0,0,0,0.2)] rounded-[16px] pt-[32px] pb-[24px] px-[24px] gap-[12px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="font-semibold leading-[120%]">
                            남은 수량 변경
                        </p>
                        <div className="w-full h-[40px] items-center px-[7px] gap-[8px] flex rounded-[8px] border border-gachigageGray7">
                            <input
                                type="text"
                                className="w-full text-right outline-none"
                                value={stockInput}
                                onChange={handleStockInputChange}
                            />
                            <span className="font-normal text-gachigageGray5">
                                개
                            </span>
                        </div>
                        <div className="w-full flex gap-[8px]">
                            <button
                                className="w-full h-[40px] rounded-[8px] flex items-center justify-center border-[0.5px] cursor-pointer font-normal text-gachigageGray7 bg-gachigageWhite border-gachigageGray3"
                                onClick={handleCloseStockModal}
                            >
                                취소
                            </button>
                            <button
                                className="w-full h-[40px] rounded-[8px] flex items-center justify-center border-[0.5px] cursor-pointer font-medium text-gachigageWhite bg-gachigageMint border-gachigageBrightMint1"
                                onClick={handleStockSubmit}
                            >
                                변경하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
