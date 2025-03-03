import {
  collection,
  doc,
  setDoc,
  getDoc,
  //   getDocs,
  updateDoc,
  deleteDoc,
  //   query,
  //   where,
  DocumentData
  //   WhereFilterOp
} from "firebase/firestore";
import { db } from "./firebaseconfig";
import { UserFormInterface } from "@/config/Minare/Registration/type";

interface DbResponse {
  success: boolean;
  data?: UserFormInterface;
  error?: string;
  id?: string;
}

function isUserFormData(data: DocumentData): data is UserFormInterface {
  return (
    "fullname" in data &&
    "phonenumber" in data &&
    "collegename" in data &&
    "branch" in data &&
    "graduationyear" in data
  );
}

function convertToUserForm(data: DocumentData): UserFormInterface {
  if (!isUserFormData(data)) {
    throw new Error("Invalid user form data structure");
  }
  return data as UserFormInterface;
}

export const addDocument = async (
  collectionName: string,
  data: UserFormInterface,
  customId?: string
): Promise<DbResponse> => {
  try {
    const docRef = customId
      ? doc(db, collectionName, customId)
      : doc(collection(db, collectionName));

    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const getDocument = async (
  collectionName: string,
  id: string
): Promise<DbResponse> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = convertToUserForm(docSnap.data());
      return { success: true, data, id: docSnap.id };
    }
    return { success: false, error: "Document not found" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: Partial<UserFormInterface>
): Promise<DbResponse> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<DbResponse> => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

// export const queryDocuments = async (
//   collectionName: string,
//   field: string,
//   operator: WhereFilterOp,
//   value: string | number | boolean | Date
// ): Promise<DbResponse> => {
//   try {
//     const q = query(
//       collection(db, collectionName),
//       where(field, operator, value)
//     );
//     const querySnapshot = await getDocs(q);
//     const documents: UserFormInterface[] = [];

//     querySnapshot.forEach((doc) => {
//       const data = convertToUserForm(doc.data());
//       documents.push({ ...data, id: doc.id });
//     });

//     return { success: true, data: documents };
//   } catch (error) {
//     if (error instanceof Error) {
//       return { success: false, error: error.message };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// };
