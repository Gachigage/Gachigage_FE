"use client";

import Pagenation from "@/components/atoms/Pagenation";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import DefaultButton from "@/components/atoms/DefaultButton";
import BackButton from "@/components/atoms/BackButton";
import ProductListGrid from "@/components/organisms/ProductGrid/ProductListGrid";
import ProductList from "@/components/molecules/ProductList";

export default function Sales() {
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
        product,
        product,
        product,
    ]; 

    return (
        <div className="w-full h-full bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <div className="flex flex-col w-full gap-10">
                    <BackButton pageName="판매 내역" href="/mypage" />
                    <div className="flex flex-row gap-4">
                        <DefaultButton name="전체 상품" />
                        <DefaultButton name="판매중" />
                        <DefaultButton name="판매 완료" />
                    </div>
                    <ProductList products={products} />
                    <Pagenation
                        currentPage={productPage.currentPage}
                        totalPages={productPage.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}