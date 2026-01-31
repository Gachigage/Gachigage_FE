import { createProduct, uploadProductImages } from "@/apis/product";
import { useProductFormStore } from "@/store/useProductFormStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface MutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const useCreateProduct = (options?: MutationOptions) => {
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            // mutationFn 내부에서 최신 상태를 가져와야 함
            const { imageFiles, toCreateRequest } =
                useProductFormStore.getState();

            const imageUrls = await uploadProductImages(imageFiles);

            const requestData = toCreateRequest(imageUrls);
            return createProduct(requestData);
        },
        onSuccess: (data) => {
            useProductFormStore.getState().resetForm();
            router.push(`/products/${data.data.productId}`);
            if (options?.onSuccess) options.onSuccess();
        },
        onError: (error) => {
            console.error("상품 등록 실패:", error);
            if (options?.onError) options.onError(error);
        },
    });
};
