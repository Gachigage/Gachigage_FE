import Link from "next/link";
import PurchaseItem from "./PurchaseItem";

export default function PurchaseHistory() {
    const product = {
        tradeId: 501,
        productId: 111,
        title: "북유럽 디자인 체어",
        price: 180000,
        tradeDate: "2024-01-15T14:30:00",
        status: "COMPLETED",
        quantity: 5
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
        <div className="w-full">
            <div className="flex flex-row justify-between mb-[20px]">
                <span className="text-dSubTitle">구매 내역</span>
                <Link href="/mypage/purchase">더보기</Link>
            </div>
            <div className="w-full flex flex-col gap-[24px]"> 
                {products.map((productItem, index) => (
                    index < 2 && <PurchaseItem productItem={productItem} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
}