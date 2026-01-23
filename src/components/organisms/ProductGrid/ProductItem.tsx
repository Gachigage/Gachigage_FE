import Image from "next/image";
import smapleProduct1 from "@/assets/images/sampleProduct1.png";

export default function ProductItem(props: {product: {name: string, price: number, quantity: number}, index: number, columns?: number}) {
    const { product, index, columns } = props;

    const sizeMap = {
        4: `
            w-[171px] h-[171px]
            md:w-[200px] md:h-[200px]
            xl:w-[270px] xl:h-[270px]
        `,
        6: `
            w-[171px] h-[171px]
            md:w-[120px] md:h-[120px]
            xl:w-[185px] xl:h-[185px]
        `,
    };


    return (
        <div key={index} className="flex flex-col border-[var(--color-gachigageGray3)] py-4">
            <Image
                src={smapleProduct1}
                alt="상품 이미지"
                width={182}
                height={182}
                className={`${sizeMap[columns]} mb-[10px]`}
            />
            <div className="flex flex-col gap-1">
                <div className="text-dBody">{product.name}</div>
                <div className="flex flex-row">
                    <div className="text-dBody pr-[5px]">
                        <span>{product.price}</span>
                        <span>원</span>
                    </div> 
                    <p>/</p>
                    <div className="text-dBody pl-[5px]">
                        <span>{product.quantity}</span>
                        <span>개</span>
                    </div>
                </div>
            </div>
        </div>
    )
}