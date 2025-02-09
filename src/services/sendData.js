import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase-config"; // Assuming db is already configured

export const storeData = async (data, collectionName) => {
  const collectionRef = collection(db,collectionName);

  try {
    // Add document to the specified collection
    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // You can return the document ID if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to store data"); // Optional error handling
  }
};
