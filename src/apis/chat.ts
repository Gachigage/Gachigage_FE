import { ChatListResponse, ChatMessage, ChatRoomInfo, ChatRoomResponse, PageResponse } from "@/types/Chat";
import { axiosClient, axiosServer } from "@/apis/axiosInstance"

interface ApiResponse<T> {
  errorCode: string;
  status: number;
  message: string;
  data: T;
}

/**
 * 채팅리스트불러오기 
 * @returns 
 */
export const fetchChatList = async (
  accessToken?: string
): Promise<ChatListResponse[]> => {
  const response = await axiosServer.get<ApiResponse<ChatListResponse[]>>(
    "/chats/rooms",
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {}
  );

  return response.data.data;
};

/**
 * 채팅방 단건 메시지 조회 (페이징)
 * @param chatRoomId 채팅방 ID
 * @param accessToken 인증 토큰
 */
export const fetchChatRoomMessages = async (
  chatRoomId: number,
  accessToken?: string
): Promise<PageResponse<ChatMessage>> => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const response = await axiosServer.get<
    ApiResponse<PageResponse<ChatMessage>>
  >(`/chats/rooms/${chatRoomId}/messages`, { headers });

  return response.data.data;
};


/**
 * 단건 채팅방정보
 * @param chatRoomId 채팅방 ID
 * @param accessToken 인증 토큰
 */
export const fetchChatRoomInfo = async (
  chatRoomId: number,
  accessToken?: string
): Promise<ChatRoomInfo> => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const response = await axiosServer.get<ApiResponse<ChatRoomInfo>>(
    `/chats/rooms/${chatRoomId}`,
    { headers }
  );

  return response.data.data;
};

/**
 * 채팅방 입장(생성)
 * @param productId 상품ID
 * @param accessToken 인증 토큰
 */
export const createChatRoom = async (
  productId: number,
  accessToken?: string
): Promise<ChatRoomResponse> => {
  const response = await axiosClient.post<{ data: ChatRoomResponse }>(
    "/chats",
    { productId },
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {}
  );

  return response.data.data; 
};