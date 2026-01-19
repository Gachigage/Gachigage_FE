import ProductMoneyFilter from "../atoms/ProductMoneyFilter";
import ProductTypeFilter from "../atoms/ProductTypeFilter";

export default function ProductFilter() {
    return (
        <div className="w-full flex gap-[12px]">
            <ProductTypeFilter />
            <ProductMoneyFilter />
        </div>
    );
}
