import { PlaceSearchApiResponse, SearchPlacesParams } from "@/types/Naver";
import { axiosServer } from "./axiosInstance";

export const searchPlaces = async (
    params: SearchPlacesParams,
): Promise<PlaceSearchApiResponse> => {
    const response = await axiosServer.get<PlaceSearchApiResponse>(
        "/naver/search",
        {
            params: {
                query: params.query,
                display: params.display || 5, // 최대 5개
            },
        },
    );

    return response.data;
};
