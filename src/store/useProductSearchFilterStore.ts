import { create } from "zustand";

interface ProductType {
    primaryId: number | null;
    primaryName: string;
    secondaryId: number | null;
    secondaryName: string;
}

interface ProductSearchFilterState {
    searchKeyword: string;
    productType: ProductType;
    productPrice: { minPrice: number; maxPrice: number };
    productLocation: { province: string; city: string };
    productGroup: string;
    productPage: { currentPage: number; totalPages: number };
}

interface ProductSearchFilterActions {
    setSearchKeyword: (keyword: string) => void;
    resetSearchKeyword: () => void;
    setProductType: (productType: ProductType) => void;
    setProductPrice: (productPrice: {
        minPrice: number;
        maxPrice: number;
    }) => void;
    setProductLocation: (productLocation: {
        province: string;
        city: string;
    }) => void;
    setProductGroup: (productGroup: string) => void;
    setProductPage: (productPage: {
        currentPage: number;
        totalPages: number;
    }) => void;
    resetAll: () => void;
}

type ProductSearchFilterStore = ProductSearchFilterState &
    ProductSearchFilterActions;

const initialState: ProductSearchFilterState = {
    searchKeyword: "",
    productType: {
        primaryId: null,
        primaryName: "",
        secondaryId: null,
        secondaryName: "",
    },
    productPrice: { minPrice: 0, maxPrice: 0 },
    productLocation: { province: "", city: "" },
    productPage: { currentPage: 0, totalPages: 0 },
    productGroup: "전체",
};

export const useProductSearchFilterStore = create<ProductSearchFilterStore>(
    (set) => ({
        ...initialState,
        setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
        resetSearchKeyword: () => set({ searchKeyword: "" }), 
        setProductType: (productType) => set({ productType: productType }),
        setProductPrice: (productPrice) => set({ productPrice: productPrice }),
        setProductLocation: (productLocation) =>
            set({ productLocation: productLocation }),
        setProductGroup: (productGroup) => set({ productGroup: productGroup }),
        setProductPage: (productPage) => set({ productPage: productPage }),
        resetAll: () => set(initialState),
    }),
);
