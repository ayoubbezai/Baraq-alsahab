import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config"; // Assuming db is already configured

export const storeData = async (data, collectionName) => {
  const collectionRef = collection(db, collectionName);

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
export const addPlace = async (newPlace) => {
  try {
    const docRef = doc(collection(db, "other"), "places");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No delivery areas found. Creating new document...");
      await setDoc(docRef, { places: [newPlace] }); // Create new document if it doesn't exist
      return true;
    }

    const places = docSnap.data().places || [];
    if (places.includes(newPlace)) {
      console.log("Place already exists.");
      return false;
    }

    const newPlaces = [...places, newPlace]; // Add new place to the array

    await updateDoc(docRef, { places: newPlaces }); // Update Firestore document

    console.log(`Place "${newPlace}" added successfully.`);
    return true;
  } catch (error) {
    console.error("Error adding place:", error);
    throw new Error("Failed to add place");
  }
};
