import { create } from "zustand";

interface AuthErrorState {
    isOpen: boolean;
    showAuthError: () => void;
    hideAuthError: () => void;
}

export const useAuthErrorStore = create<AuthErrorState>((set) => ({
    isOpen: false,
    showAuthError: () => set({ isOpen: true }),
    hideAuthError: () => set({ isOpen: false }),
}));
