"use client";

import { fetchProducts } from "@/apis/product";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";
import { Product, ProductLandingRequest } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProductList = () => {
    const {
        searchKeyword,
        productType,
        productPrice,
        productLocation,
        productGroup,
        productPage,
    } = useProductSearchFilterStore();

    const buildParams = (): ProductLandingRequest => {
        const params: ProductLandingRequest = {
            page: productPage.currentPage,
            size: 24,
        };

        if (searchKeyword.trim()) {
            params.query = searchKeyword;
        }

        // secondaryId가 있으면 secondaryId, 없으면 primaryId 사용
        if (productType.secondaryId !== null) {
            params.categoryId = productType.secondaryId;
        } else if (productType.primaryId !== null) {
            params.categoryId = productType.primaryId;
        }

        if (productPrice.minPrice > 0 || productPrice.maxPrice > 0) {
            params.priceArrange = {
                minPrice: productPrice.minPrice,
                maxPrice: productPrice.maxPrice,
            };
        }

        // 전국이면 locationDto 자체를 보내지 않음
        if (productLocation.province && productLocation.province !== "전국") {
            // 전체면 province만, 그 외에는 province + city 모두 전송
            if (productLocation.city === "전체") {
                params.locationDto = {
                    province: productLocation.province,
                    city: null,
                };
            } else if (productLocation.city) {
                params.locationDto = {
                    province: productLocation.province,
                    city: productLocation.city,
                };
            }
        }

        if (productGroup && productGroup !== "전체") {
            params.group = productGroup;
        }

        return params;
    };

    // TODO: 추후 백엔드 타입 수정
    // 백엔드 응답 → 프론트 타입
    const transformProduct = (item: {
        productId: number;
        title: string;
        mainImageUrl: string; // 백엔드 필드명
        province: string;
        city: string;
        group: string;
        tradeType: string;
        price: number;
        quantity: number;
        viewCount: number;
        createdAt: string;
        liked: boolean; // 백엔드 필드명
    }): Product => ({
        productId: item.productId,
        title: item.title,
        thumbnailUrl: item.mainImageUrl, // mainImageUrl → thumbnailUrl
        province: item.province,
        city: item.city,
        tradeType: item.tradeType,
        price: item.price,
        quantity: item.quantity,
        viewCount: item.viewCount,
        createdAt: item.createdAt,
        isLiked: item.liked, // liked → isLiked
    });

    const query = useQuery({
        queryKey: [
            "products",
            searchKeyword,
            productType,
            productPrice,
            productLocation,
            productGroup,
            productPage,
        ],
        queryFn: () => fetchProducts(buildParams()),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        select: (data) => ({
            ...data,
            data: {
                ...data.data,
                content: data.data.content.map(transformProduct),
            },
        }),
    });

    return {
        products: query.data?.data.content ?? [],
        totalPages: query.data?.data.totalPages ?? 0,
        totalElements: query.data?.data.totalElements ?? 0,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        error: query.isError,
        refetch: query.refetch,
    };
};
