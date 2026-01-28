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
    const { imageFiles, toCreateRequest, resetForm } =
        useProductFormStore.getState();

    return useMutation({
        mutationFn: async () => {
            const imageUrls = await uploadProductImages(imageFiles);

            const requestData = toCreateRequest(imageUrls);
            return createProduct(requestData);
        },
        onSuccess: (data) => {
            resetForm();
            router.push(`/products/${data.data.productId}`);
            if (options?.onSuccess) options.onSuccess();
        },
        onError: (error) => {
            console.error("상품 등록 실패:", error);
            if (options?.onError) options.onError(error);
        },
    });
};
