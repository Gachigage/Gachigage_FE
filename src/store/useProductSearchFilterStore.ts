import { create } from "zustand";

interface ProductSearchFilterState {
    searchKeyword: string;
    productType: { primary: string; secondary: string };
    productLocation: { city: string; district: string };
}

interface ProductSearchFilterActions {
    setSearchKeyword: (keyword: string) => void;
    setProductType: (productType: {
        primary: string;
        secondary: string;
    }) => void;
    setProductLocation: (productLocation: {
        city: string;
        district: string;
    }) => void;
    resetAll: () => void;
}

type ProductSearchFilterStore = ProductSearchFilterState &
    ProductSearchFilterActions;

const initialState: ProductSearchFilterState = {
    searchKeyword: "",
    productType: { primary: "", secondary: "" },
    productLocation: { city: "", district: "" },
};

export const useProductSearchFilterStore = create<ProductSearchFilterStore>(
    (set) => ({
        ...initialState,
        setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
        setProductType: (productType) => set({ productType: productType }),
        setProductLocation: (productLocation) =>
            set({ productLocation: productLocation }),
        resetAll: () => set(initialState),
    }),
);
