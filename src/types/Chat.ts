export type ChatDetail = {
    chatRoomId: number;
    otherName: string;
    otherProfileImage: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export type ChatListResponse = {
    status: number;
    message: string;
    data: ChatDetail;
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