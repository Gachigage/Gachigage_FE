export type ChatDetail = {
  chatRoomId: number;
  otherName: string;
  otherProfileImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatListResponse {
  chatRoomId: number;
  productId: number;
  otherName: string;
  otherProfileImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatRoomInfo {
  chatRoomId: number;
  sellerName: string;
  sellerImageUrl: string;
  buyerName: string;
  buyerImageUrl: string;
  productTitle: string;
  productImageUrl: string;
  productStatus: "SELLING" | "SOLD";
  unreadCount: number;
  amIBuyer: boolean;
  memberId: number;
}
export interface ChatMessage {
  chatRoomId: number;
  content: string;
  messageType: "TEXT" | "IMAGE";
  sendAt: string;
  read: boolean;
  senderIsBuyer: boolean;
  me: boolean;
  senderId: number;
}
export interface PageResponse<T> {
  content: T[];
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type ChatSendMessage = {
  chatroomId: number;
  senderId: number;
  content: string;
  sendAt: string;
  messageType: string;
}

export type ChatRoomResponse = {
  productId: number;
  chatRoomId: number;
}