import { searchPlaces } from "@/apis/naver";
import { useQuery } from "@tanstack/react-query";

export const usePlaceSearch = (query: string) => {
    return useQuery({
        queryKey: ["places", query],
        queryFn: () => searchPlaces({ query }),
        enabled: query.trim().length > 0,
        staleTime: 1000 * 60 * 5,
    });
};
