import {create} from "zustand";

interface ChatUIState {
    isOpenOrderModal: boolean;
    isOpenChatTradeModal: boolean;
}

interface ChatUIActions {
    openOrderModal: () => void;
    closeOrderModal: () => void;
    openTradeModal: () => void;
    closeTradeModal: () => void;
}

export const useChatUIStore = create<ChatUIState & ChatUIActions>((set) => ({
    isOpenOrderModal: false,
    isOpenChatTradeModal: false,
    openOrderModal: () =>
        set({
            isOpenOrderModal: true,
            isOpenChatTradeModal: false,
        }),
    closeOrderModal: () => set({ isOpenOrderModal: false }),
    openTradeModal: () => set({ isOpenChatTradeModal: true}),
    closeTradeModal: () => set({ isOpenChatTradeModal: false }),
}));