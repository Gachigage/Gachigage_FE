"use client";

import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import Pagenation from "../atoms/Pagenation";
import ProductAddButton from "../atoms/ProductAddButton";
import ProductGroupFilter from "../atoms/ProductGroupFilter";
import ProductList from "../molecules/ProductList";
import { useProductList } from "@/hooks/useProductList";
import { useEffect } from "react";
import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";

export default function ProductLanding() {
    const { productPage, setProductPage } = useProductSearchFilterStore();
    const { products, totalPages, isLoading, error } = useProductList();

    const handlePageChange = (page: number) => {
        setProductPage({ ...productPage, currentPage: page });
    };

    // TODO: 디버깅용 console 삭제
    useEffect(() => {
        console.log("products", products);
    }, [products]);

    return (
        <div className="w-full flex flex-col gap-[24px]">
            <div className="flex w-full justify-between items-end">
                <ProductGroupFilter />
                <ProductAddButton />
            </div>
            <ProductList products={products} />
            {totalPages > 0 ? (
                <Pagenation
                    currentPage={productPage.currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            ) : (
                <div className="w-full flex items-center justify-center text-[16px] md:text-[18px] xl:text-[24px] text-gachigageGray5 font-normal pt-[145px] xl:pt-[184px] gap-[12px]">
                    <Image
                        src={searchIcon}
                        alt="searchIcon"
                        width={12}
                        height={12}
                        className="md:w-[17px] md:h-[17px] xl:w-[26px] xl:h-[26px]"
                    />
                    <span>검색하신 유형의 물품을 찾을 수 없습니다</span>
                </div>
            )}
        </div>
    );
}
