import { getAuth, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

interface AuthStore {
  isLoading: boolean;
  isInitialized: boolean;
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  isInitialized: false,
  setInitialized: (initialized) => set({ isInitialized: initialized }),
  setLoading: (loading) => set({ isLoading: loading })
}));

export const initializeAuthListener = () => {
  const auth = getAuth();

  onAuthStateChanged(auth, () => {
    useAuthStore.setState({ isLoading: false, isInitialized: true });
  });
};
