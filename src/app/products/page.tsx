import ProductAddButton from "@/components/atoms/ProductAddButton";
import ProductSearchFilter from "@/components/organisms/ProductSearchFilter";

export default function ProductPage() {
    return (
        <div className="w-full bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] h-[2000px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
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
                    <div></div>
                </div>
            </div>
        </div>
    );
}
