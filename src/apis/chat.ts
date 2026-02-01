import { ChatListResponse } from "@/types/Chat";
import { axiosClient, axiosServer } from "@/apis/axiosInstance"

/**
 * 채팅리스트불러오기 
 * @returns 
 */
export const fetchChatList = async(): Promise<ChatListResponse> => {
    const response = await axiosServer.get<ChatListResponse>("/chats/rooms");
    return response.data;
}

/**
 * 채팅방입장(생성)
 * @param productId 상품ID
 * @returns 
 */
export const createChatRoom = async(productId: number):Promise<number> => {
    const response = await axiosClient.post<number>("/chats/rooms", productId);
    return response.data;
}