import {
    CategoryResponse,
    CreateProductRequest,
    CreateProductResponse,
    ProductDetailResponse,
    ProductImageUploadResponse,
    UpdateProductRequest,
    UpdateProductResponse,
} from "@/types/Product";
import { axiosClient, axiosServer } from "./axiosInstance";

export const fetchProductCategories = async (): Promise<CategoryResponse> => {
    const response =
        await axiosServer.get<CategoryResponse>("/products/category");
    return response.data;
};

export const fetchProductDetail = async (
    productId: number,
): Promise<ProductDetailResponse> => {
    const response = await axiosServer.get<ProductDetailResponse>(
        `/products/${productId}`,
    );
    return response.data;
};

/**
 * 이미지 업로드
 * @param files 이미지 파일 배열
 * @returns 업로드된 이미지 URL 배열
 */
export const uploadProductImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await axiosClient.post<ProductImageUploadResponse>(
        "/products/images",
        formData,
        {
            headers: {
                "Content-Type": undefined,
            },
        },
    );

    return response.data.data.imageUrls;
};

/**
 * 상품 등록
 * @param data 상품 등록 요청 데이터
 * @returns 생성된 상품 ID
 */
export const createProduct = async (
    data: CreateProductRequest,
): Promise<CreateProductResponse> => {
    const response = await axiosClient.post<CreateProductResponse>(
        "/products",
        data,
    );
    return response.data;
};

/**
 * 상품 수정
 * @param productId 수정할 상품 ID
 * @param data 상품 수정 요청 데이터
 * @returns 수정된 상품 ID
 */
export const updateProduct = async (
    productId: number,
    data: UpdateProductRequest,
): Promise<UpdateProductResponse> => {
    const response = await axiosClient.put<UpdateProductResponse>(
        `/products/${productId}`,
        data,
    );
    return response.data;
};
