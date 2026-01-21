import ProductAddButton from "@/components/atoms/ProductAddButton";
import ProductList from "@/components/molecules/ProductList";
import ProductSearchFilter from "@/components/organisms/ProductSearchFilter";

export default function ProductPage() {
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
        <div className="w-full h-full bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <ProductSearchFilter />
                <div className="w-full flex flex-col gap-[24px]">
                    <div className="flex w-full justify-between items-end">
                        <div className="flex items-center justify-center gap-[10px]">
                            <button className="cursor-pointer font-medium text-[13px] md:font-normal md:text-[18px] text-gachigageGray7 border-b border-transparent hover:text-gachigageDark hover:border-gachigageDark">
                                전체 상품
                            </button>
                            <span className="text-gachigageGray5">|</span>
                            <button className="cursor-pointer font-medium text-[13px] md:font-normal md:text-[18px] text-gachigageGray7 border-b border-transparent hover:text-gachigageDark hover:border-gachigageDark">
                                일괄 판매
                            </button>
                            <span className="text-gachigageGray5">|</span>
                            <button className="cursor-pointer font-medium text-[13px] md:font-normal md:text-[18px] text-gachigageGray7 border-b border-transparent hover:text-gachigageDark hover:border-gachigageDark">
                                개별 판매
                            </button>
                        </div>
                        <ProductAddButton />
                    </div>
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    );
}
