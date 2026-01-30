"use client";

import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import Pagenation from "../atoms/Pagenation";
import ProductAddButton from "../atoms/ProductAddButton";
import ProductGroupFilter from "../atoms/ProductGroupFilter";
import ProductList from "../molecules/ProductList";

export default function ProductLanding() {
    const { productPage, setProductPage } = useProductSearchFilterStore();

    const handlePageChange = (page: number) => {
        setProductPage({ ...productPage, currentPage: page });
    };

    const product = {
        productId: 111,
        title: "Lorem ipsum",
        price: 30000000, // 물건 가격 (추가)
        quantity: 50, // 물건 개수 (추가)
        minPrice: 150000,
        maxPrice: 180000,
        thumbnailUrl: "https://bucket/img1.jpg",
        category: "식기류",
        province: "서울특별시",
        city: "강남구",
        district: "역삼동",
        tradeType: "직거래",
        viewCount: 32,
        isLike: true, // 내가 좋아요 했는지 (추가)
        createdAt: "2024-01-10T12:30:00",
    };
    const products = [
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
    ];
    return (
        <div className="w-full flex flex-col gap-[24px]">
            <div className="flex w-full justify-between items-end">
                <ProductGroupFilter />
                <ProductAddButton />
            </div>
            <ProductList products={products} />
            <Pagenation
                currentPage={productPage.currentPage}
                totalPages={productPage.totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
