import { ProductGridProps } from "./ProductGridType";
import ProductItem from "./ProductItem";

interface ProductListGridProps {    
    productList: ProductGridProps[];
    columns?: number;
    limit?: number;
}
export default function ProductListGrid({ productList, columns = 4, limit }: ProductListGridProps) {
    const mdGridCols =
    columns === 6 ? 'md:grid-cols-6' : 'md:grid-cols-4';

    const items = limit ? productList.slice(0, limit) : productList;

    return (
        <div className={`grid grid-cols-2 ${mdGridCols} gap-2`}>
            {items.map((product, index) => (
                <ProductItem product={product} key={index} index={index} />
            ))}
        </div>
    )
}