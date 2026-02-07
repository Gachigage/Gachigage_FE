import { TradeHistoryItem } from "./PurchaseHistoryType";
import PurchaseItem from "./PurchaseItem";
interface PurchaseListProps {
    products: TradeHistoryItem[];
    limit?: number;
}
export default function PurchaseList({ products, limit }: PurchaseListProps) {
    const productList = limit ? products.slice(0, limit) : products;
    
    return (
        <div className="w-full flex flex-col gap-[24px]"> 
            {productList.map((productItem, index) => (
                <PurchaseItem productItem={productItem} index={index} key={index}/>
            ))}
        </div>
    )
}