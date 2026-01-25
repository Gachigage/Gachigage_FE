import BackButton from "@/components/atoms/BackButton";
import ProductDetailImgs from "@/components/atoms/ProductDetailImgs";
import sampleImg from "@/assets/images/sampleProduct1.png";
import ProductDetailInfo from "@/components/molecules/ProductDetailInfo";
import RelatedProducts from "@/components/molecules/RelatedProducts";

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

    const product = {
        productId: 111,
        title: "Lorem ipsum",
        price: 30000000, // 물건 가격 (추가)
        quantity: 50, // 물건 개수 (추가)
        minPrice: 150000,
        maxPrice: 180000,
        thumbnailUrl: "https://bucket/img1.jpg",
        category: "식기류",
        province: "서울특별시",
        city: "강남구",
        district: "역삼동",
        tradeType: "직거래",
        viewCount: 32,
        isLike: true, // 내가 좋아요 했는지 (추가)
        createdAt: "2024-01-10T12:30:00",
    };
    const products = [product, product, product, product];

    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[140px] pb-[190px] md:pb-[60px] max-w-[354px] md:max-w-[1152px] md:px-[24px] flex flex-col gap-[60px]">
                <BackButton pageName={"판매 상품 목록"} href={"/products"} />
                <div className="w-full flex flex-col md:flex-row gap-[60px] justify-center">
                    <ProductDetailImgs images={imgs} />
                    <ProductDetailInfo />
                </div>
                <RelatedProducts products={products} />
            </div>
        </div>
    );
}
