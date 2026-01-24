import Link from "next/link";
import PurchaseItem from "./PurchaseItem";
import closeBtn from "@/assets/icons/close.svg";
import Image from "next/image";

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
                {products.length !== 0 ? products.map((productItem, index) => (
                    index < 2 && <PurchaseItem productItem={productItem} index={index} key={index}/>
                )) :
                <div className="w-full flex flex-col justify-center items-center h-[100px] md:h-[236px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] bg-gachigageGray0 rounded-[8px]">
                    <Image src={closeBtn} alt="close" className="w-[36px] h-[36px] md:w-[56px] md:h-[56px]"/>
                    <span className="text-[16px] md:text-[24px] ">구매한 내역이 없습니다.</span>
                </div>
                }
            </div>
        </div>
    )
}