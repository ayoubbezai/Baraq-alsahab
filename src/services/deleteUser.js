import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
}
export const deleteUserArchive = async (archiveId, collectionName) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("id", "==", archiveId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching document found for deletion.");
      return false;
    }

    // Assuming only one matching document exists
    const docRef = doc(db, collectionName, querySnapshot.docs[0].id);
    await deleteDoc(docRef);

    console.log(`Archived document with ID ${archiveId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting archived document:", error);
    throw new Error("Failed to delete archived document");
  }
};
