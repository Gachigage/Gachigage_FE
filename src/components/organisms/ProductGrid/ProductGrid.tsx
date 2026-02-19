import PageName from "@/components/atoms/PageName";
import ProductListGrid from "./ProductListGrid";
import { useSession } from "next-auth/react";
import { useListHistory } from "@/hooks/useListHistory";
import { isEmpty } from "lodash";
import Image from "next/image";
import closeBtn from "@/assets/icons/close.svg";
 
export default function ProductGrid(props: {
    title: string;
    href: string;
    columns?: number;
}) {
    const { title, href, columns = 6 } = props;
    const { data: session } = useSession();
    const { data } = useListHistory({
        type: title === '판매 내역' ? "sales" : "wishlist",
        page: 0,
        size: 6,
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });

    const productList = data?.content ?? [];
    
    return (
        <div className="w-full">
            <PageName name={title} href={href} />
            {productList && !isEmpty(productList) ?
                <ProductListGrid productList={productList} columns={columns} limit={6}/> :
                <div 
                    className="
                        w-full
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        h-[100px] 
                        md:h-[236px] 
                        max-w-[402px] 
                        md:max-w-[768px] 
                        xl:max-w-[1152px] 
                        bg-gachigageGray0 
                        rounded-[8px]"
                >
                    <Image src={closeBtn} alt="close" className="w-[36px] h-[36px] md:w-[56px] md:h-[56px]"/>
                    <span className="text-[16px] md:text-[22px] text-gachigageGray7">{title === '판매 내역' ? '판매한 내역이 없습니다.' : '찜한 내역이 없습니다.'}</span>
                </div>
            }
        </div>
    )
}