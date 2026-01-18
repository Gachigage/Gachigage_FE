import Search from "../atoms/Search";
import ProductFilter from "../molecules/ProductFilter";

export default function ProductSearchFilter() {
    return (
        <div className="flex flex-col gap-[33px]">
            <Search />
            <ProductFilter />
        </div>
    );
}
