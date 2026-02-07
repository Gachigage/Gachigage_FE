import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

interface ProductGridProps {
    title: string;
    price: number;
    quantity: number;
    mainImageUrl: string;
    productId: number;
}

export default function ProductItem(props: {product: ProductGridProps, index: number}) {
    const { product, index } = props;

    return (
        <Link
            href={`/products/${product.productId}`} 
            key={index} 
            className="flex flex-col rounded-[8px]">
            <Image
                src={product?.mainImageUrl}
                alt="mainImageUrl"
                width={171}
                height={171}
                className="w-[171px] h-[171px] md:w-[120px] md:h-[120px] xl:w-[185px] xl:h-[185px] mb-[10px]"
            />
            <div className="flex flex-col gap-2">
                <div className="text-[16px] line-clamp-1">{product.title}</div>
                <div className="flex flex-row text-[16px] font-semibold items-center whitespace-nowrap">
                    <div className="flex flex-row items-center">
                        <span className="text-gachigageDarkMint1">{formatNumber(product.price)}</span>
                        <span>원</span>
                    </div> 
                    <p className="px-[3px]">/</p>
                    <span className="truncate">{product.quantity}개</span>
                </div>
            </div>
        </Link>
    )
}