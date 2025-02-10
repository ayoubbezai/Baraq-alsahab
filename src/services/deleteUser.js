import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const deleteOneUserData = async (id, collectionName) => {
  const docRef = doc(db, collectionName, id); // Reference to a document
  try {
    await deleteDoc(docRef); // Delete the document
    console.log(`Document with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};
