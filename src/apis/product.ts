import { CategoryResponse } from "@/types/Product";
import { axiosServer } from "./axiosInstance";

export const fetchProductCategories = async (): Promise<CategoryResponse> => {
    const response =
        await axiosServer.get<CategoryResponse>("/products/category");
    return response.data;
};
