import { create } from "zustand";

interface ProductSearchFilterState {
    searchKeyword: string;
    productType: { primary: string; secondary: string };
    productPrice: { minPrice: number; maxPrice: number };
    productLocation: { province: string; city: string };
    productGroup: string;
}

interface ProductSearchFilterActions {
    setSearchKeyword: (keyword: string) => void;
    setProductType: (productType: {
        primary: string;
        secondary: string;
    }) => void;
    setProductPrice: (productPrice: {
        minPrice: number;
        maxPrice: number;
    }) => void;
    setProductLocation: (productLocation: {
        province: string;
        city: string;
    }) => void;
    setProductGroup: (productGroup: string) => void;
    resetAll: () => void;
}

type ProductSearchFilterStore = ProductSearchFilterState &
    ProductSearchFilterActions;

const initialState: ProductSearchFilterState = {
    searchKeyword: "",
    productType: { primary: "", secondary: "" },
    productPrice: { minPrice: 0, maxPrice: 0 },
    productLocation: { province: "", city: "" },
    productGroup: "전체",
};

export const useProductSearchFilterStore = create<ProductSearchFilterStore>(
    (set) => ({
        ...initialState,
        setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
        setProductType: (productType) => set({ productType: productType }),
        setProductPrice: (productPrice) => set({ productPrice: productPrice }),
        setProductLocation: (productLocation) =>
            set({ productLocation: productLocation }),
        setProductGroup: (productGroup) => set({ productGroup: productGroup }),
        resetAll: () => set(initialState),
    }),
);
