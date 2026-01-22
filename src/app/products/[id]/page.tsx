import BackButton from "@/components/atoms/BackButton";

export default function ProductDetailPage() {
    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[140px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col">
                <BackButton pageName={"판매 상품 목록"} href={"/products"} />
                <div className="flex flex-col md:flex-row"></div>
            </div>
        </div>
    );
}
