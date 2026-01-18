import SearchFilter from "@/components/molecules/SearchFilter";

export default function ProductPage() {
    return (
        <div className="w-full bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] h-[2000px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px]">
                <SearchFilter />
            </div>
        </div>
    );
}
