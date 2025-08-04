import { create } from "zustand";
import type { User } from "./types";
import { persist } from "zustand/middleware";

interface AuthStore {
    user: User | null
    token: String | null
    login: (user: User, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user: User, token: string) => {
                set({ user, token })
            },
            logout: () => {
                set({ user: null, token: null });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                user: state.user,
                token:state.token
            })
        }
    )
)




interface LoadingState {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));