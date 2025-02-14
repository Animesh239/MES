import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseconfig";
// import axios from "axios";
import toast from "react-hot-toast";
import { addDocument, getDocument } from "./dbOperation";
import { UserFormInterface } from "@/config/Minare/Registration/type";

const googleProvider = new GoogleAuthProvider();

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
      paymentProofImgURL: "",
      uid: result.user.uid
    };

    const existingUser = await getDocument("users", result.user.uid);

    if (existingUser.success) {
      return { token, user: userInfo, userExists: true };
    }

    if (!existingUser.success) {
      const addResult = await addDocument("users", userInfo, result.user.uid);

      if (addResult.success) {
        toast.success("Successfully signed up!", {
          style: {
            backgroundColor: "black",
            color: "white"
          }
        });
      } else {
        toast.error("Error creating user profile");
      }
    } else {
      toast.success("Successfully signed in!", {
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });
      return { token, user: userInfo, userExists: false };
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    if (error instanceof Error) {
      toast.error(error.message || "Failed to sign in. Please try again.", {
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });
    } else {
      toast.error("An unknown error occurred during sign-in.", {
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });
    }
    throw error;
  }
};
