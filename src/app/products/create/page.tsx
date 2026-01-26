import BackButton from "@/components/atoms/BackButton";
import ProductCreateImgs from "@/components/atoms/ProductCreateImgs";

export default function ProductCreatePage() {
    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[140px] pb-[190px] md:pb-[60px] max-w-[354px] md:max-w-[1152px] md:px-[24px] flex flex-col gap-[60px]">
                <BackButton pageName={"판매 상품 목록"} href={"/products"} />
                <div className="w-full flex flex-col md:flex-row gap-[60px] justify-center">
                    <ProductCreateImgs />
                    <div className="flex flex-1 flex-col gap-[36px]"></div>
                </div>
            </div>
        </div>
    );
}
