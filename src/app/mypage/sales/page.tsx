"use client";

import Pagenation from "@/components/atoms/Pagenation";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import DefaultButton from "@/components/atoms/DefaultButton";
import BackButton from "@/components/atoms/BackButton";
import ProductListGrid from "@/components/organisms/ProductGrid/ProductListGrid";
import ProductList from "@/components/molecules/ProductList";
import { useSession } from "next-auth/react";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { isEmpty } from "lodash";

export default function Sales() {
    const { productPage, setProductPage } = useProductSearchFilterStore();

    const { data: session, status } = useSession();
    const { data: products = [], isLoading } = useTradeHistory({
        type: "sales",
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
            {!isEmpty(products) &&
                <div className="w-full h-full bg-gachigageWhite flex justify-center">
                    <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                        <div className="flex flex-col w-full gap-10">
                            <BackButton pageName="판매 내역" href="/mypage" />
                            <div className="flex flex-row gap-4 justify-center">
                                <DefaultButton name="전체 상품" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]"/>
                                <DefaultButton name="판매중" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]" />
                                <DefaultButton name="판매 완료" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]" />
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
            }
        </>
    );
}
