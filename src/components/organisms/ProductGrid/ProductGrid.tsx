import Link from "next/link";
import ProductItem from "./ProductItem";

export default function ProductGrid(props: {title: string, columns?: number, href: string}) {
    const product = {
        name: '북유럽 디자인 체어',
        price: 180000,
        quantity: 5
    }
    const productList = [
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
    ]; 
    return (
        <div className="w-full">
            <div className="flex flex-row justify-between mb-[20px]">
                <span className="text-dSubTitle">{props.title}</span>
                <Link href={props.href} className="flex items-center">더보기</Link>
            </div>
            <div className={`grid grid-cols-2 ${props.columns === 6 ? 'md:grid-cols-6' : 'md:grid-cols-4'} gap-2`}>
                {productList.map((product, index) => (
                    props.columns === 6 ? 
                    index < 6 &&
                    <ProductItem product={product} key={index} index={index} columns={props.columns}/> : 
                    <ProductItem product={product} key={index} index={index} columns={props.columns}/>
                ))}
            </div>
        </div>
    )
}