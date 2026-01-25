import PageName from "@/components/atoms/PageName";
import ProductListGrid from "./ProductListGrid";
 
export default function ProductGrid(props: {
    title: string;
    href: string;
    columns?: number;
}) {
    const { title, href, columns = 6 } = props;
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
            <PageName name={title} href={href} />
            <ProductListGrid productList={productList} columns={columns} limit={6}/>
        </div>
    )
}