import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type User = {
    id: string;
    username: string;
    email: string;
    roleName: string;
}
type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token:string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (user, token) => set({isAuthenticated: true, user: user, token: token}),
      logout: () => set({isAuthenticated:false, user:null, token: null })
    }),
    { name: 'auth-storage' }
  )
);