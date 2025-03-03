import { UserFormInterface } from "@/config/Minare/Registration/type";
import { toast } from "react-hot-toast";
// import { updateDocument } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { updateDocument } from "./dbOperation";

export const UpdateData = async (formData: Partial<UserFormInterface>) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser?.uid) {
      throw new Error("No user is currently logged in");
    }

    // console.log("Updating with data:", formData);
    // console.log("Current user ID:", currentUser.uid);

    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(
        ([value]) => value !== undefined && value !== null
      )
    );
    const result = await updateDocument("users", currentUser.uid, cleanedData);

    // console.log("Update result:", result);

    if (!result.success) {
      throw new Error(result.error || "Failed to submit profile");
    }

    toast.success(`Data submitted successfully!`, {
      style: {
        backgroundColor: "black",
        color: "white"
      }
    });

    return result;
  } catch (error) {
    console.error("Error updating user data:", error);

    toast.error(
      error instanceof Error ? error.message : "Failed to submit profile",
      {
        style: {
          backgroundColor: "black",
          color: "white"
        }
      }
    );

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};
