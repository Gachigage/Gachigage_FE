"use client";

import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import Pagenation from "../atoms/Pagenation";
import ProductAddButton from "../atoms/ProductAddButton";
import ProductGroupFilter from "../atoms/ProductGroupFilter";
import ProductList from "../molecules/ProductList";
import { useProductList } from "@/hooks/useProductList";
import { useEffect } from "react";

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
            {totalPages > 0 && (
                <Pagenation
                    currentPage={productPage.currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
