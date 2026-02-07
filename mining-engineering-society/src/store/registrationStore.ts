import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegistrationState {
  formData: {
    fullname?: string;
    email?: string;
    phonenumber?: string;
    collegename?: string;
    branch?: string;
    graduationyear?: string;
    photoURL?: string;
    paymentProofImgURL?: string;
    uid?: string;
  };
  setFormData: (data: Partial<RegistrationState["formData"]>) => void;
  resetFormData: () => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () => set({ formData: {} }),
    }),
    {
      name: "minare-registration-storage",
    }
  )
);
