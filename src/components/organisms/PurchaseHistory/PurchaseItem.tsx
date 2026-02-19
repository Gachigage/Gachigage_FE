
import Image from "next/image";
import Link from "next/link";
import { TradeHistoryItem } from "./PurchaseHistoryType";
import { formatChatDay } from "@/lib/formatTimeUtils";

interface PurchaseItemProps {
    productItem: TradeHistoryItem
    index: number;
}
export default function PurchaseItem({productItem, index} : PurchaseItemProps) {
    return(
        <>
            <Link 
                href={`/products/${productItem.productId}`} 
                key={index} 
                className="flex flex-row gap-3"
            >
                <Image
                    src={productItem.thumbnailUrl}
                    alt="thumbnailUrl"
                    width={165}
                    height={165}
                    className="w-[165px] h-[165px] md:w-[224px] md:h-[224px] xl:w-[270px] xl:h-[270px] rounded-[8px]"
                />
                <div className="flex flex-col justify-center gap-3">
                    <div className="flex flex-row text-gachigageGray7 text-[13px]">
                        <span className="pr-[5px]">구매일</span>
                        <span>{formatChatDay(productItem.tradeDate) ?? ''}</span>
                    </div>
                    <div className="text-[16px] font-semibold">{productItem.title}</div>
                    <div className="flex flex-row text-[18px] font-semibold gap-2">
                        <div className="flex flex-row">
                            <span className="text-gachigageDarkMint1">{productItem.price.toLocaleString()}</span>
                            <span>원</span>
                        </div>
                        <p>/</p>
                        <span>{productItem.quantity ?? 2}개</span>
                    </div>
                </div>
            </Link>
            <p className="border-b border-gachigageGray3 w-full"/>
        </>
    )
}