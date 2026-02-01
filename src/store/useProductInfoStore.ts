import { ProductDetail } from "@/types/Product";
import {create} from "zustand";

interface ProductInfoState {
    productInfo: ProductDetail | null;
}

interface ProductInfoActions {
    setProductInfo: (product: ProductDetail) => void;
    clearProductInfo: () => void;
}

export const useProductInfoStore = create<ProductInfoState & ProductInfoActions>((set) => ({
    productInfo: null,

    setProductInfo: (product) =>
        set({ productInfo: product }),

    clearProductInfo: () =>
        set({ productInfo: null }),
}));