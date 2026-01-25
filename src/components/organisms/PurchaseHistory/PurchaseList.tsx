import PurchaseItem from "./PurchaseItem";

interface PurchaseListProps {
    products: any[];
    limit?: number;
}
export default function PurchaseList({ products, limit }: PurchaseListProps) {
    const items = limit ? products.slice(0, limit) : products;
    
    return (
        <div className="w-full flex flex-col gap-[24px]"> 
            { items.map((productItem, index) => (
                <PurchaseItem productItem={productItem} index={index} key={index}/>
            ))}
        </div>
    )
}