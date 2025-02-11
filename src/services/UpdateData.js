import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export const updateArchiveData = async (newData, id, collectionName) => {
  try {
    // Query to find the document with matching "id"
    const q = query(collection(db, collectionName), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      return false;
    }

    // Get the actual Firestore document ID
    const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

    // Update the document with new data
    await updateDoc(docRef, newData);

    console.log(`Archived document with ID ${id} updated successfully.`);
    return true;
  } catch (error) {
    console.error("Error updating archived document:", error);
    throw new Error("Failed to update archived document");
  }
};
