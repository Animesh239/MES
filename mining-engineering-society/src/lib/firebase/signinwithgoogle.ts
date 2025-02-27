import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseconfig";
import toast from "react-hot-toast";
import { addDocument, getDocument } from "./dbOperation";
import { UserFormInterface } from "@/config/Minare/Registration/type";

const googleProvider = new GoogleAuthProvider();

interface FirestoreUser extends UserFormInterface {
  paymentProofImgURL?: string;
  formSubmitted?: string;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    const userInfo: UserFormInterface = {
      fullname: result.user.displayName || "",
      email: result.user.email || "",
      phonenumber: result.user.phoneNumber || "",
      collegename: "",
      branch: "",
      graduationyear: "",
      photoURL: result.user.photoURL || "",
      uid: result.user.uid
    };

    const existingUser = await getDocument("users", result.user.uid);

    if (existingUser.success && existingUser.data) {
      const userData = existingUser.data as FirestoreUser;

      if (userData.formSubmitted) {
        toast.success("Already Profile Submitted! Successfully Logging!!", {
          style: {
            backgroundColor: "black",
            color: "white"
          }
        });
        return { token, user: userData, userExists: true };
      }
    }

    const addResult = await addDocument("users", userInfo, result.user.uid);
    if (addResult.success) {
      toast.success("Successfully Signed Up With Google!", {
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });
      return { token, user: userInfo, userExists: false };
    } else {
      toast.error("Error creating user profile");
      throw new Error("Failed to add user document.");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    toast.error(errorMessage, {
      style: {
        backgroundColor: "black",
        color: "white"
      }
    });

    throw error;
  }
};
