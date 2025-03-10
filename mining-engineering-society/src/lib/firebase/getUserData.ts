import { getAuth } from "firebase/auth";
// import { toast } from "react-hot-toast";
import { getDocument } from "./dbOperation";
import { UserFormInterface } from "@/config/Minare/Registration/type";
import { useAuthStore } from "./authListener";

export const GetUserDetail = async () => {
  try {
    const isInitialized = useAuthStore.getState().isInitialized;
    const isLoading = useAuthStore.getState().isLoading;

    if (!isInitialized || isLoading) {
      await new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (state.isInitialized && !state.isLoading) {
            unsubscribe();
            resolve(true);
          }
        });
      });
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser?.uid) {
      // throw new Error("you are not currently logged in");
      return {
        success: false,
        error: "you are not currently logged in",
        data: null
      };
    }

    const result = await getDocument("users", currentUser.uid);

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch user data");
    }

    const userData = result.data as UserFormInterface;
    return {
      success: true,
      data: userData
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null
    };
  }
};
