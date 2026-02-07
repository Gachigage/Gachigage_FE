import { NaverLocalSearchItem, NaverLocalSearchResponse } from "@/types/Naver";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const NAVER_API_URL = "https://openapi.naver.com/v1/search/local.json";

function stripHtmlTags(str: string): string {
    return str.replace(/<[^>]*>/g, "");
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const display = searchParams.get("display") || "5";

    if (!query || query.trim() === "") {
        return NextResponse.json(
            { status: 400, message: "검색어를 입력해주세요.", data: [] },
            { status: 400 },
        );
    }

    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { status: 500, message: "서버 설정 오류", data: [] },
            { status: 500 },
        );
    }

    try {
        const response = await axios.get<NaverLocalSearchResponse>(
            NAVER_API_URL,
            {
                params: { query, display },
                headers: {
                    "X-Naver-Client-Id": clientId,
                    "X-Naver-Client-Secret": clientSecret,
                },
                timeout: 5000,
            },
        );

        // 네이버 API의 mapx/mapy는 WGS84 좌표 * 10000000 형태
        const places = response.data.items.map(
            (item: NaverLocalSearchItem) => ({
                title: stripHtmlTags(item.title),
                address: item.roadAddress || item.address, // 도로명 주소를 우선적으로
                roadAddress: item.roadAddress,
                latitude: parseInt(item.mapy) / 10000000,
                longitude: parseInt(item.mapx) / 10000000,
            }),
        );

        return NextResponse.json({
            status: 200,
            message: "성공",
            data: places,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            return NextResponse.json(
                { status, message: "검색 중 오류 발생", data: [] },
                { status },
            );
        }

        return NextResponse.json(
            { status: 500, message: "검색 중 오류가 발생했습니다.", data: [] },
            { status: 500 },
        );
    }
}
