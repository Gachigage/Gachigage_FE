import { TradeInfoResponse } from "@/types/trade";
import { axiosServer } from "./axiosInstance";

interface ApiResponse<T> {
  errorCode: string;
  status: number;
  message: string;
  data: T;
}

/**
 * 채팅방에서 거래중인 상품의 가격 리스트를 조회
 * @param chatRoomId 
 * @param accessToken 
 * @returns 
 */
export const fetchTradeInfo = async (
  chatRoomId: number,
  accessToken?: string
): Promise<TradeInfoResponse> => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const response = await axiosServer.get<ApiResponse<TradeInfoResponse>>(
    `/trades/${chatRoomId}`,
    { headers }
  );

  return response.data.data;
};


export const confirmTrade = async (
  chatRoomId: number,
  productPriceId: number,
  accessToken?: string
): Promise<string> => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const response = await axiosServer.post<ApiResponse<string>>(
    `/trades/${chatRoomId}`,
    { productPriceId },
    { headers }
  );

  return response.data.data;
};