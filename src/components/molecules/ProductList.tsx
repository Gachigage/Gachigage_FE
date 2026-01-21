import { ProductList as ProductListType } from "@/types/Product";
import Product from "../atoms/Product";

export default function ProductList({ products }: ProductListType) {
    return (
        // mb는 랜딩 페이지에서 pagenation 컴포넌트와 60px gap을 유지하기 위함. 추후 확장성이 필요할 시 구조 다시 고민
        <div className="w-full md:mb-[36px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-15 place-items-center">
            {products.map((product, index) => (
                <Product {...product} key={index} />
            ))}
        </div>
    );
}
