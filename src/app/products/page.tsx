import ProductLanding from "@/components/organisms/ProductLanding";
import ProductSearchFilter from "@/components/organisms/ProductSearchFilter";

export default function ProductPage() {
    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full h-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <ProductSearchFilter />
                <ProductLanding />
            </div>
        </div>
    );
}
