// 네이버 API 원본 응답 타입
export type NaverLocalSearchItem = {
    title: string;
    link: string;
    category: string;
    description: string;
    telephone: string;
    address: string;
    roadAddress: string;
    mapx: string;
    mapy: string;
};

export type NaverLocalSearchResponse = {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: NaverLocalSearchItem[];
};

export type Place = {
    title: string;
    address: string;
    roadAddress: string;
    latitude: number;
    longitude: number;
};

export type SearchPlacesParams = {
    query: string;
    display?: number;
};

export type PlaceSearchApiResponse = {
    status: number;
    message: string;
    data: Place[];
};
