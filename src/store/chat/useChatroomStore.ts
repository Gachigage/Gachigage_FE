import { create } from "zustand";

interface ChatRoomState {
  selectedChatRoomId?: number;        
  selectChatRoomId: (chatRoomId: number) => void;
  clearChatRoomId: () => void;
}

export const useChatRoomStore = create<ChatRoomState>((set) => ({
  selectedChatRoomId: undefined,     
  selectChatRoomId: (chatRoomId) => set({ selectedChatRoomId: chatRoomId }),
  clearChatRoomId: () => set({ selectedChatRoomId: undefined }),
}));
