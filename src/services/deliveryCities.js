import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

// ✅ Function to Get Cities from Firestore
export const getCities = async () => {
  const docRef = doc(db, "other", "cities"); 
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("This document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
};

// ✅ Function to Change City State in Firestore
export const changeState = async (cityId, isOpen) => {
  const docRef = doc(db, "other", "cities"); // ✅ Correct reference
  const data = await getCities();

  if (!data || !data.saudiCities) {
    console.error("No cities data found");
    return;
  }

  try {
    // ✅ Update the isOpen value for the specific city
    const newCities = data.saudiCities.map((city) =>
      city.id === cityId ? { ...city, isOpen: isOpen } : city
    );

    // ✅ Correct way to update Firestore document
    await updateDoc(docRef, { saudiCities: newCities });
    console.log("City state updated successfully");
  } catch (error) {
    console.error("Error updating city state:", error);
  }
};

export const sendData = async (newCities) => {
  const docRef = doc(db, "other", "cities");
  await updateDoc(docRef, newCities);
};
