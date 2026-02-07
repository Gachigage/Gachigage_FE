import PageName from "@/components/atoms/PageName";
import ProductListGrid from "./ProductListGrid";
import { useSession } from "next-auth/react";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { isEmpty } from "lodash";
 
export default function ProductGrid(props: {
    title: string;
    href: string;
    columns?: number;
}) {
    const { title, href, columns = 6 } = props;
    const { data: session, status } = useSession();
    const { data: productList = [], isLoading } = useTradeHistory({
        type: title === '판매 내역' ? "sales" : "wishlist",
        page: 0,
        size: 6,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });
    
    return (
        <>
            {productList && !isEmpty(productList) &&
                <div className="w-full">
                    <PageName name={title} href={href} />
                    <ProductListGrid productList={productList} columns={columns} limit={6}/>
                </div>
            }
        </>
    )
}