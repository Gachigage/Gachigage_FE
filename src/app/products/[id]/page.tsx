import BackButton from "@/components/atoms/BackButton";
import ProductDetailImgs from "@/components/atoms/ProductDetailImgs";
import sampleImg from "@/assets/images/sampleProduct1.png";

export default function ProductDetailPage() {
    const imgs = [
        sampleImg,
        sampleImg,
        sampleImg,
        sampleImg,
        sampleImg,
        sampleImg,
        sampleImg,
        sampleImg,
    ];

    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[140px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[1152px] md:px-[24px] flex flex-col">
                <BackButton pageName={"판매 상품 목록"} href={"/products"} />
                <div className="flex flex-col md:flex-row"></div>
                <ProductDetailImgs images={imgs} />
            </div>
        </div>
    );
}
