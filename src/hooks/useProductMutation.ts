import {
    createProduct,
    editProduct,
    uploadProductImages,
} from "@/apis/product";
import { useProductFormStore } from "@/store/useProductFormStore";
import { PriceTableStatus, ProductDetail } from "@/types/Product";
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

export const useEditProduct = (options?: MutationOptions) => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (productId: number) => {
            const { images, imageFiles, toCreateRequest } =
                useProductFormStore.getState();

            let uploadedUrls: string[] = [];
            const validImageFiles = imageFiles.filter(
                (file): file is File => file !== undefined && file !== null,
            );
            if (validImageFiles.length > 0) {
                uploadedUrls = await uploadProductImages(validImageFiles);
            }

            let newImageIndex = 0;
            const finalImageUrls = images.map((url) => {
                if (url.startsWith("https://") || url.startsWith("http://")) {
                    return url;
                }
                return uploadedUrls[newImageIndex++];
            });

            const requestData = toCreateRequest(finalImageUrls);
            return editProduct(
                {
                    categoryId: requestData.categoryId,
                    title: requestData.title,
                    detail: requestData.detail,
                    stock: requestData.stock,
                    priceTable: requestData.priceTable,
                    tradeType: requestData.tradeType,
                    preferredTradeLocation: requestData.preferredTradeLocations,
                    imageUrls: requestData.imageUrls,
                },
                productId,
            );
        },
        onSuccess: (_data, variables) => {
            useProductFormStore.getState().resetForm();
            router.push(`/products/${variables}`);
            if (options?.onSuccess) options.onSuccess();
        },
        onError: (error) => {
            console.error("상품 수정 실패:", error);
            if (options?.onError) options.onError(error);
        },
    });
};

export const useEditPriceTableStatus = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            productId,
            product,
            index,
            newStatus,
        }: {
            productId: number;
            product: ProductDetail;
            index: number;
            newStatus: PriceTableStatus;
        }) => {
            const updatedPriceTable = product.priceTable.map((item, i) =>
                i === index ? { ...item, status: newStatus } : item,
            );
            return editProduct(
                {
                    categoryId: product.category.subCategoryId,
                    title: product.title,
                    detail: product.detail,
                    stock: product.stock,
                    priceTable: updatedPriceTable,
                    tradeType: product.tradeType,
                    preferredTradeLocation: product.preferredTradeLocation,
                    imageUrls: product.imageUrls,
                },
                productId,
            );
        },
        onSuccess: () => {
            router.refresh();
        },
    });
};

export const useEditStock = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            productId,
            product,
            newStock,
        }: {
            productId: number;
            product: ProductDetail;
            newStock: number;
        }) => {
            return editProduct(
                {
                    categoryId: product.category.subCategoryId,
                    title: product.title,
                    detail: product.detail,
                    stock: newStock,
                    priceTable: product.priceTable,
                    tradeType: product.tradeType,
                    preferredTradeLocation: product.preferredTradeLocation,
                    imageUrls: product.imageUrls,
                },
                productId,
            );
        },
        onSuccess: () => {
            router.refresh();
        },
    });
};
