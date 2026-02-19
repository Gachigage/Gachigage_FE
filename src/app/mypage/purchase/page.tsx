"use client";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import Search from "@/components/atoms/Search";
import Pagenation from "@/components/atoms/Pagenation";
import BackButton from "@/components/atoms/BackButton";
import PurchaseList from "@/components/organisms/PurchaseHistory/PurchaseList";
import { usePurchaseHistory } from "@/hooks/usePurchaseHistory";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

export default function PurchaseDetailPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const { data: session } = useSession();

    const searchKeyword = useProductSearchFilterStore(
        (state) => state.searchKeyword
    );

    const resetSearchKeyword = useProductSearchFilterStore(
     (state) => state.resetSearchKeyword
    );

    const { data } = usePurchaseHistory({
        page: currentPage,
        size: 12,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });

    const filteredProducts = useMemo(() => {
        if (!data?.content) return [];

        if (!searchKeyword) return data.content;

        return data.content.filter((item) =>
            item.title.includes(searchKeyword)
        );
    }, [data?.content, searchKeyword]);

    useEffect(() => {
        return () => {
            resetSearchKeyword();
        };
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchKeyword]);
    
    const products = filteredProducts;
    const totalPages = data?.totalPages ?? 0;

    return (
        <>
            {products && !isEmpty(products) &&
                <div className="w-full min-h-screen bg-gachigageWhite flex justify-center">
                <div className="w-full h-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                    <div className="flex flex-col w-full h-full gap-10">
                        <BackButton pageName="구매 내역" href="/mypage" />
                        <Search placeholderText="검색어를 입력하세요" />
                        <PurchaseList products={products}/>
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
            }
        </>
    )
}