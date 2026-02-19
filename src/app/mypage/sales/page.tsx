"use client";
import { useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import Pagenation from "@/components/atoms/Pagenation";
import BackButton from "@/components/atoms/BackButton";
import DefaultButton from "@/components/atoms/DefaultButton";
import ProductList from "@/components/molecules/ProductList";
import { useListHistory } from "@/hooks/useListHistory";

export default function PurchaseDetailPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const { data: session } = useSession();

    const { data } = useListHistory({
        type: 'sales',
        page: currentPage,
        size: 24,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });
    
    const products = useMemo(() => {
        return (data?.content ?? []).map(item => ({
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
    }, [data]);

    const totalPages = data?.totalPages ?? 0;
 
    return (
        <>
             {!isEmpty(products) &&
                <div className="w-full h-full bg-gachigageWhite flex justify-center">
                    <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                        <div className="flex flex-col w-full gap-10">
                            <BackButton pageName="판매 내역" href="/mypage" />
                            {/* <div className="flex flex-row gap-4 justify-center">
                                <DefaultButton name="전체 상품" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]"/>
                                <DefaultButton name="판매중" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]" />
                                <DefaultButton name="판매 완료" className="w-[115px] md:w-[245px] lg:w-[245px] h-[40px]" />
                            </div> */}
                            <ProductList products={products} />
                            <Pagenation
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}