import Image from "next/image";
import smapleProduct1 from "@/assets/images/sampleProduct1.png";
import { ProductGridProps } from "./ProductGridType";

export default function ProductItem(props: {product: ProductGridProps, index: number}) {
    const { product, index } = props;

    return (
        <div key={index} className="flex flex-col border-[var(--color-gachigageGray3)] py-4">
            <Image
                src={smapleProduct1}
                alt="상품 이미지"
                className="w-[171px] h-[171px] md:w-[120px] md:h-[120px] xl:w-[185px] xl:h-[185px] mb-[10px]"
            />
            <div className="flex flex-col gap-2">
                <div className="text-[16px]">{product.name}</div>
                <div className="flex flex-row text-[16px] font-semibold gap-1">
                    <div className="flex flex-row">
                        <span className="text-gachigageDarkMint1">{product.price}</span>
                        <span>원</span>
                    </div> 
                    <p>/</p>
                    <span>{product.quantity}개</span>
                </div>
            </div>
        </div>
    )
}