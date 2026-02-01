import { ChatListResponse } from "@/types/Chat";
import { axiosClient, axiosServer } from "@/apis/axiosInstance"

/**
 * 채팅리스트불러오기 
 * @returns 
 */
export const fetchChatList = async(
    accessToken?: string
): Promise<ChatListResponse> => {
    const response = await axiosServer.get<ChatListResponse>(
        "/chats/rooms",
        accessToken ? { 
            headers: { Authorization: `Bearer ${accessToken}` } 
        } : {}
    );
    return response.data;
}

/**
 * 채팅방 입장(생성)
 * @param productId 상품ID
 * @param accessToken 인증 토큰
 */
export const createChatRoom = async(
    productId: number,
    accessToken?: string
): Promise<number> => {
    const response = await axiosClient.post<number>(
        "/chats", 
        { productId },
        accessToken ? { 
            headers: { Authorization: `Bearer ${accessToken}` } 
        } : {}
    );
    return response.data;
}