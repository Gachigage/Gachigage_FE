import {
    CategoryResponse,
    CreateProductRequest,
    CreateProductResponse,
    EditProductRequest,
    EditProductResponse,
    ProductDetailResponse,
    ProductImageUploadResponse,
    ProductLandingRequest,
    ProductLandingResponse,
    ProductLikeResponse,
} from "@/types/Product";
import { axiosClient, axiosServer } from "./axiosInstance";

export const fetchProductCategories = async (): Promise<CategoryResponse> => {
    const response =
        await axiosServer.get<CategoryResponse>("/products/category");
    return response.data;
};

export const fetchProductDetail = async (
    productId: number,
    accessToken?: string,
): Promise<ProductDetailResponse> => {
    const response = await axiosServer.get<ProductDetailResponse>(
        `/products/${productId}`,
        accessToken
            ? { headers: { Authorization: `Bearer ${accessToken}` } }
            : {},
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

export const productLike = async (
    productId: number,
): Promise<ProductLikeResponse> => {
    const response = await axiosClient.post<ProductLikeResponse>(
        `/products/${productId}/like`,
    );
    return response.data;
};

export const fetchProducts = async (
    data: ProductLandingRequest,
): Promise<ProductLandingResponse> => {
    const { priceArrange, locationDto, ...rest } = data;

    const params = {
        ...rest,
        ...(priceArrange && { priceArrange }),
        ...(locationDto && { locationDto }),
    };

    const response = await axiosServer.get<ProductLandingResponse>(
        `/products`,
        { params },
    );

    return response.data;
};

/**
 * 상품 수정
 * @param productId 수정할 상품 ID
 * @param data 상품 수정 요청 데이터
 * @returns 수정된 상품 ID
 */
export const editProduct = async (
    data: EditProductRequest,
    productId: number,
): Promise<EditProductResponse> => {
    const response = await axiosClient.put<EditProductResponse>(
        `/products/${productId}`,
        data,
    );

    return response.data;
};
