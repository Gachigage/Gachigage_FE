import { create } from "zustand";

interface ProductSearchFilterState {
    searchKeyword: string;
}

interface ProductSearchFilterActions {
    setSearchKeyword: (keyword: string) => void;
    resetAll: () => void;
}

type ProductSearchFilterStore = ProductSearchFilterState &
    ProductSearchFilterActions;

const initialState: ProductSearchFilterState = {
    searchKeyword: "",
};

export const useProductSearchFilterStore = create<ProductSearchFilterStore>(
    (set) => ({
        ...initialState,
        setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
        resetAll: () => set(initialState),
    }),
);
