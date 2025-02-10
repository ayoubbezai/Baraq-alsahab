import {
  collection,
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase-config"; // Assuming db is already configured

export const getDataOrderedByDate = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, orderBy("submissionTime", "desc"));

  try {
    // Fetch all documents from the specified collection ordered by submissionTime
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Data: ", data);
    return data; // Returning the fetched data
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw new Error("Failed to get data"); // Optional error handling
  }
};

export const getOneUserData = async (id, collectionName) => {
  const docRef = doc(db, collectionName, id); // Correct reference to a document
  try {
    const docSnap = await getDoc(docRef); // Fetch the document
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Fetched Data: ", data);
      return { id: docSnap.id, ...data }; // Returning data with document ID
    } else {
      console.error("No such document!");
      return null; // Handle the case where the document does not exist
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw new Error("Failed to get data"); // Optional error handling
  }
};
