"use client";

import Image from "next/image";
import emptyHeart from "@/assets/icons/emptyHeart.svg";
import heart from "@/assets/icons/heart.svg";
import eye from "@/assets/icons/eye.svg";
import smapleProduct1 from "@/assets/images/sampleProduct1.png";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { Product as ProductType } from "@/types/Product";
import Link from "next/link";

export default function Product(product: ProductType) {
    //TODO: 이미지 실제 이미지로 바꾸기
    //TODO: 좋아요 로직 연동
    //TODO: 좋아요 취소 로직 연동
    //TODO: 조회수 로직 연동

    const [isLiked, setIsLiked] = useState(product.isLiked);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <Link
            href={`/products/${product.productId}`}
            className="w-[165px]  flex flex-col rounded-[14px] md:w-[224px]  xl:w-[270px]  cursor-pointer hover:drop-shadow-[0_0_12px_rgba(0,0,0,0.15)] hover:bg-white hover:box-content hover:p-[8px] hover:pb-[16px] hover:m-[-8px] hover:mb-[-16px]"
        >
            <div className="w-full relative mb-[7px]">
                <Image
                    src={smapleProduct1}
                    alt="상품 이미지"
                    width={165}
                    height={165}
                    className="w-[165px] h-[165px] md:w-[224px] md:h-[224px] xl:w-[270px] xl:h-[270px]"
                />
                {isLiked ? (
                    <Image
                        src={heart}
                        alt="상품 좋아요 취소"
                        width={24}
                        height={22}
                        className="absolute bottom-[5px] right-[5px] z-[1] cursor-pointer"
                        onClick={handleLike}
                    />
                ) : (
                    <Image
                        src={emptyHeart}
                        alt="상품 좋아요"
                        width={24}
                        height={22}
                        className="absolute bottom-[5px] right-[5px] z-[1] cursor-pointer"
                        onClick={handleLike}
                    />
                )}
            </div>
            <p className="truncate text-gachigageDark font-semibold text-[16px] md:text-[18px] leading-[130%]">
                {product.title}
            </p>

            <div className="flex  text-[16px] xl:text-[18px] font-semibold gap-[2px] leading-[130%] mb-[5px]">
                <div className="flex">
                    <span className="text-gachigageDarkMint1">
                        {formatNumber(product.price)}
                    </span>
                    <span> 원</span>
                </div>
                <span>/</span>
                <div>{formatNumber(product.quantity)}개</div>
            </div>

            <div className="flex gap-[18px] text-[13px] font-normal text-gachigageGray5 leading-[130%]">
                <p>
                    · {product.province} {product.city}
                </p>
                <div className="flex gap-[2px]">
                    <Image src={eye} alt="eye 아이콘" width={11} height={11} />
                    <span>{product.viewCount}</span>
                </div>
            </div>
        </Link>
    );
}
