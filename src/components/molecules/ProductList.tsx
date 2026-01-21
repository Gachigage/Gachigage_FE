import { ProductList as ProductListType } from "@/types/Product";
import Product from "../atoms/Product";

export default function ProductList({ products }: ProductListType) {
    return (
        <div className="w-full max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-15 place-items-center">
            {products.map((product, index) => (
                <Product {...product} key={index} />
            ))}
        </div>
    );
}
