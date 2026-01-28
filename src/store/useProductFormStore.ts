import {
    productFormSchema,
    ProductFormValidationResult,
} from "@/schemas/product.schema";
import {
    CreateProductRequest,
    PreferredTradeLocation,
    PriceTableItem,
    TradeType,
} from "@/types/Product";
import { create } from "zustand";

interface ProductFormState {
    images: string[]; // 프리뷰 blob
    imageFiles: File[]; // 업로드용 실제 파일

    primaryCategoryId: number | null;
    secondaryCategoryId: number | null;

    title: string;
    detail: string;

    stock: number;
    priceTable: PriceTableItem[];

    tradeType: {
        direct: boolean;
        delivery: boolean;
    };

    preferredLocation: PreferredTradeLocation | null;

    // 상품 수정시
    isEditMode: boolean;
    editProductId: number | null;

    // 검증 에러
    validationErrors: Record<string, string>;
}

interface ProductFormActions {
    setImages: (images: string[]) => void;
    setImageFiles: (files: File[]) => void;
    addImages: (images: string[], files: File[]) => void;
    removeImage: (index: number) => void;
    reorderImages: (fromIndex: number, toIndex: number) => void;

    setPrimaryCategoryId: (id: number | null) => void;
    setSecondaryCategoryId: (id: number | null) => void;

    setTitle: (title: string) => void;
    setDetail: (detail: string) => void;

    setStock: (stock: number) => void;
    addPriceTableItem: () => void;
    updatePriceTableItem: (
        index: number,
        item: Partial<PriceTableItem>,
    ) => void;
    removePriceTableItem: (index: number) => void;

    setDirectTrade: (value: boolean) => void;
    setDeliveryTrade: (value: boolean) => void;
    setPreferredLocation: (location: PreferredTradeLocation | null) => void;

    setEditMode: (isEdit: boolean, productId?: number) => void;
    loadProductData: (data: Partial<ProductFormState>) => void;

    isValid: () => boolean;
    validate: () => ProductFormValidationResult;
    getFieldError: (field: string) => string | undefined;

    toCreateRequest: (imageUrls: string[]) => CreateProductRequest;

    resetForm: () => void;
}

type ProductFormStore = ProductFormState & ProductFormActions;

const initialState: ProductFormState = {
    images: [],
    imageFiles: [],
    primaryCategoryId: null,
    secondaryCategoryId: null,
    title: "",
    detail: "",
    stock: 0,
    priceTable: [{ quantity: 0, price: 0, status: "ACTIVE" }],
    tradeType: {
        direct: false,
        delivery: false,
    },
    preferredLocation: null,
    isEditMode: false,
    editProductId: null,
    validationErrors: {},
};

export const useProductFormStore = create<ProductFormStore>((set, get) => ({
    ...initialState,
    setImages: (images) => set({ images }),
    setImageFiles: (files) => set({ imageFiles: files }),
    addImages: (newImages, newFiles) =>
        set((state) => ({
            images: [...state.images, ...newImages].slice(0, 8),
            imageFiles: [...state.imageFiles, ...newFiles].slice(0, 8),
        })),
    removeImage: (index) =>
        set((state) => {
            const newImages = [...state.images];
            const newFiles = [...state.imageFiles];

            URL.revokeObjectURL(newImages[index]);

            newImages.splice(index, 1);
            newFiles.splice(index, 1);

            return { images: newImages, imageFiles: newFiles };
        }),
    reorderImages: (fromIndex, toIndex) =>
        set((state) => {
            const newImages = [...state.images];
            const newFiles = [...state.imageFiles];

            const [movedImage] = newImages.splice(fromIndex, 1);
            const [movedFile] = newFiles.splice(fromIndex, 1);

            newImages.splice(toIndex, 0, movedImage);
            newFiles.splice(toIndex, 0, movedFile);

            return { images: newImages, imageFiles: newFiles };
        }),
    setPrimaryCategoryId: (id) =>
        set({
            primaryCategoryId: id,
            secondaryCategoryId: null,
        }),
    setSecondaryCategoryId: (id) => set({ secondaryCategoryId: id }),
    setTitle: (title) => set({ title: title.slice(0, 50) }),
    setDetail: (detail) => set({ detail: detail.slice(0, 500) }),
    setStock: (stock) => set({ stock }),
    addPriceTableItem: () =>
        set((state) => ({
            priceTable: [
                ...state.priceTable,
                { quantity: 0, price: 0, status: "ACTIVE" },
            ],
        })),
    updatePriceTableItem: (index, item) =>
        set((state) => {
            const newPriceTable = [...state.priceTable];
            newPriceTable[index] = { ...newPriceTable[index], ...item };
            return { priceTable: newPriceTable };
        }),
    removePriceTableItem: (index) =>
        set((state) => ({
            priceTable: state.priceTable.filter((_, i) => i !== index),
        })),
    setDirectTrade: (value) =>
        set((state) => ({ tradeType: { ...state.tradeType, direct: value } })),
    setDeliveryTrade: (value) =>
        set((state) => ({
            tradeType: { ...state.tradeType, delivery: value },
        })),
    setPreferredLocation: (location) => set({ preferredLocation: location }),
    setEditMode: (isEdit, productId) =>
        set({ isEditMode: isEdit, editProductId: productId ?? null }),
    loadProductData: (data) => set((state) => ({ ...state, ...data })),

    validate: () => {
        const state = get();

        const formData = {
            images: state.images,
            secondaryCategoryId: state.secondaryCategoryId,
            title: state.title,
            detail: state.detail,
            stock: state.stock,
            priceTable: state.priceTable,
            tradeType: state.tradeType,
            preferredLocation: state.preferredLocation,
        };

        const result = productFormSchema.safeParse(formData);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                const field = err.path.join(".");
                errors[field] = err.message;
            });
            set({ validationErrors: errors });
            return { success: false, error: result.error };
        }

        set({ validationErrors: {} });
        return { success: true, data: result.data };
    },
    getFieldError: (field) => {
        return get().validationErrors[field];
    },
    isValid: () => {
        const result = get().validate();
        return result.success;
    },
    toCreateRequest: (imageUrls) => {
        const state = get();

        const getTradeType = (): TradeType => {
            if (state.tradeType.direct && state.tradeType.delivery)
                return "ALL";
            if (state.tradeType.direct) return "DIRECT";
            return "DELIVERY";
        };

        return {
            categoryId: state.secondaryCategoryId!,
            title: state.title,
            detail: state.detail,
            stock: state.stock,
            priceTable: state.priceTable.filter(
                (item) => item.quantity > 0 && item.price > 0,
            ),
            tradeType: getTradeType(),
            preferredTradeLocations: state.preferredLocation,
            imageUrls,
        };
    },
    resetForm: () => {
        const state = get();
        state.images.forEach((url) => URL.revokeObjectURL(url));
        set(initialState);
    },
}));
