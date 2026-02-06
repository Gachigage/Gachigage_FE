import BackButton from "@/components/atoms/BackButton";
import ProductDetailImgs from "@/components/atoms/ProductDetailImgs";
import ProductDetailInfo from "@/components/molecules/ProductDetailInfo";
import RelatedProducts from "@/components/molecules/RelatedProducts";
import { fetchProductDetail } from "@/apis/product";
import { auth } from "@/auth";
import ProductDeleteButton from "@/components/atoms/ProductDeleteButton";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await auth();
    const product = (await fetchProductDetail(Number(id), session?.accessToken))
        .data;
    console.log(product);

    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <div className="w-full pt-[140px] pb-[190px] md:pb-[60px] max-w-[354px] md:max-w-[1152px] md:px-[24px] flex flex-col gap-[60px]">
                <div className="flex justify-between pr-[45px]">
                    <BackButton
                        pageName={"판매 상품 목록"}
                        href={"/products"}
                    />
                    {session && product.isOwner && (
                        <ProductDeleteButton productId={product.productId} />
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row gap-[60px] justify-center">
                    <ProductDetailImgs images={product.imageUrls} />
                    <ProductDetailInfo product={product} />
                </div>
                <RelatedProducts products={product.relatedProducts.products} />
            </div>
        </div>
    );
}
