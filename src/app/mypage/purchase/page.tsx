"use client";
import Search from "@/components/atoms/Search";
import Pagenation from "@/components/atoms/Pagenation";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import BackButton from "@/components/atoms/BackButton";
import PurchaseList from "@/components/organisms/PurchaseHistory/PurchaseList";
import { useSession } from "next-auth/react";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { isEmpty } from "lodash";

export default function Purchase() {
    const { productPage, setProductPage } = useProductSearchFilterStore();
    const { data: session, status } = useSession();
    const { data: products = [], isLoading } = useTradeHistory({
        type: "purchases",
        page: 0,
        size: 24,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });
    
    const handlePageChange = (page: number) => {
        setProductPage({ ...productPage, currentPage: page });
    };

    return (
        <>
            {products && !isEmpty(products) &&
                <div className="w-full h-full bg-gachigageWhite flex justify-center">
                <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                    <div className="flex flex-col w-full gap-10">
                        <BackButton pageName="구매 내역" href="/mypage" />
                        <Search placeholderText="검색어를 입력하세요" />
                        <PurchaseList products={products}/>
                        <Pagenation
                            currentPage={productPage.currentPage}
                            totalPages={productPage.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            }
        </>
    )
}