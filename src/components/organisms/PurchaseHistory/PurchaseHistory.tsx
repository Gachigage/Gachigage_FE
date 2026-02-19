import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";

import PageName from "@/components/atoms/PageName";
import PurchaseList from "./PurchaseList";
import Image from "next/image";
import closeBtn from "@/assets/icons/close.svg";
import { usePurchaseHistory } from "@/hooks/usePurchaseHistory";

export default function PurchaseHistory() {
    const { data: session } = useSession();
    const { data } = usePurchaseHistory({
        page: 0,
        size: 2,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });

    const products = data?.content ?? [];

    return (
        <div className="w-full">
            <PageName name={"구매 내역"} href={"/mypage/purchase"} />
            {products && !isEmpty(products) ?
                <PurchaseList products={products} limit={2} /> :
                <div 
                    className="
                        w-full
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        h-[100px] 
                        md:h-[236px] 
                        max-w-[402px] 
                        md:max-w-[768px] 
                        xl:max-w-[1152px] 
                        bg-gachigageGray0 
                        rounded-[8px]"
                >
                    <Image src={closeBtn} alt="close" className="w-[36px] h-[36px] md:w-[56px] md:h-[56px]"/>
                    <span className="text-[16px] md:text-[22px] text-gachigageGray7">구매한 내역이 없습니다.</span>
                </div>
            }
        </div>
    )
}