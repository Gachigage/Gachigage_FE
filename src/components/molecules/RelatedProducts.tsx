import { RelatedProduct } from "@/types/Product";
import Product from "../atoms/Product";

type RelatedProductsProps = {
    products: RelatedProduct[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <div className="flex flex-col gap-[15px] md:gap-[24px] w-full ">
            <p className="text-[20px] md:text-[24px] font-semibold leading-[120%] text-gachigageDark">
                보고 계신 상품과 유사한 상품
            </p>
            <div className="w-full overflow-x-scroll scrollbar-hidden px-[8px] pt-[8px] pb-[16px]">
                <div className="flex gap-[8px] md:gap-[24px] w-fit ">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <Product {...product} key={index} />
                        ))
                    ) : (
                        <p className="text-gachigageGray5">유사한 상품이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
