"use client";

import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";

import Search from "@/components/atoms/Search";
import Pagenation from "@/components/atoms/Pagenation";
import BackButton from "@/components/atoms/BackButton";
import ProductList from "@/components/molecules/ProductList";

import { useListHistory } from "@/hooks/useListHistory";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

export default function WishListDetailPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const { data: session } = useSession();

    const searchKeyword = useProductSearchFilterStore(
        (state) => state.searchKeyword
    );

    const resetSearchKeyword = useProductSearchFilterStore(
        (state) => state.resetSearchKeyword
    );

    const { data } = useListHistory({
        type: "wishlist",
        page: currentPage,
        size: 24,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });

    const products = useMemo(() => {
        return (data?.content ?? []).map((item) => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            thumbnailUrl: item.mainImageUrl,
            province: item.province,
            city: item.city,
            tradeType: item.tradeType,
            viewCount: item.viewCount,
            isLiked: item.liked,
            createdAt: item.createdAt,
        }));
    }, [data?.content]);

    const filteredProducts = useMemo(() => {
        if (!searchKeyword) return products;

        return products.filter((product) =>
            product.title.includes(searchKeyword)
        );
    }, [products, searchKeyword]);

    useEffect(() => {
        return () => {
            resetSearchKeyword();
        };
    }, [resetSearchKeyword]);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchKeyword]);

    const totalPages = data?.totalPages ?? 0;

    return (
        <>
            {!isEmpty(filteredProducts) && (
                <div className="w-full min-h-screen bg-gachigageWhite flex justify-center">
                    <div className="w-full h-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                        <div className="flex flex-col w-full h-full gap-10">
                            <BackButton pageName="찜한 내역" href="/mypage" />
                            <Search placeholderText="검색어를 입력하세요" />
                            <ProductList products={filteredProducts} />

                            {!searchKeyword && (
                                <Pagenation
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
