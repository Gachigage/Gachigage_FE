"use client";
import Image from "next/image";
import vector from "@/assets/icons/vector.svg";
import Search from "@/components/atoms/Search";
import Pagenation from "@/components/atoms/Pagenation";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import ProductItem from "@/components/organisms/ProductGrid/ProductItem";
import Link from "next/link";
import DefaultButton from "@/components/atoms/DefaultButton";

export default function Sales() {
    const { productPage, setProductPage } = useProductSearchFilterStore();
    
    const handlePageChange = (page: number) => {
        setProductPage({ ...productPage, currentPage: page });
    };

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
        <div className="w-full h-full bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <div className="flex flex-col w-full gap-10">
                    <Link href="/mypage" className="flex flex-row gap-7">
                        <Image src={vector} alt="vector" />
                        <span className="text-dSubTitle">판매 내역</span>
                    </Link>
                    <div className="flex flex-row gap-4">
                        <DefaultButton name="전체 상품" />
                        <DefaultButton name="판매중" />
                        <DefaultButton name="판매 완료" />
                    </div>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
                        {productList.map((product, index) => (
                            <ProductItem product={product} key={index} index={index} columns={4}/>
                    ))}
                    </div>
                    <Pagenation
                        currentPage={productPage.currentPage}
                        totalPages={productPage.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}