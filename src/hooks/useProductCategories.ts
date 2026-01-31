import { fetchProductCategories } from "@/apis/product";
import { Category } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProductCategories = () => {
    return useQuery({
        queryKey: ["productCategories"],
        queryFn: fetchProductCategories,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        select: (response) => response.data,
    });
};

// 필터용 (전체 옵션 포함)
export const useProductCategoriesForFilter = () => {
    const { data: categories, isLoading, error } = useProductCategories();

    const formattedCategories = categories
        ? [
              {
                  primary: "전체",
                  primaryId: null,
                  secondary: [{ id: null, name: "전체" }],
              },
              ...categories.map((category: Category) => ({
                  primary: category.name,
                  primaryId: category.id,
                  secondary: [
                      { id: null, name: "전체" },
                      ...category.children.map((child) => ({
                          id: child.id,
                          name: child.name,
                      })),
                  ],
              })),
          ]
        : [];

    return {
        categories: formattedCategories,
        isLoading,
        error,
    };
};

// 상품 등록, 수정 (전체 옵션 제외)
export const useProductCategoriesForForm = () => {
    const { data: categories, isLoading, error } = useProductCategories();

    const formattedCategories = categories
        ? categories.map((category: Category) => ({
              primary: category.name,
              primaryId: category.id,
              secondary: category.children.map((child) => ({
                  id: child.id,
                  name: child.name,
              })),
          }))
        : [];

    return {
        categories: formattedCategories,
        isLoading,
        error,
    };
};
