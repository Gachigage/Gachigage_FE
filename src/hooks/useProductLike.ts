import { productLike } from "@/apis/product";

export function useProductLike(productId: number) {
    const toggleLike = async () => {
        const result = await productLike(productId);
        return result.data;
    };

    return { toggleLike };
}
