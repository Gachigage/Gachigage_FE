import { productLike } from "@/apis/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProductLike() {
    const queryClient = useQueryClient();

    const { mutate: toggleLike } = useMutation({
        mutationFn: (productId: number) => productLike(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.error("좋아요 처리 중 오류 발생", error);
        },
    });

    return { toggleLike };
}
