"use client"

import ProfileCard from "@/components/organisms/ProfileCard";
import PurchaseHistory from "@/components/organisms/PurchaseHistory/PurchaseHistory";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";

export default function Mypage() {     
    return (
        <div className="w-full h-fullbg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <ProfileCard />
                <PurchaseHistory />
                <ProductGrid title="판매 내역" href={"/mypage/sales"} columns={6} />
                <ProductGrid title="찜한 상품" href={"/mypage/wishlist"} columns={6} />
            </div>
        </div>
    );
}
