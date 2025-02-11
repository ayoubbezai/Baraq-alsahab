import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

// Get first page of data
export const getData = async (collectionName, pageSize) => {
  const q = query(
    collection(db, collectionName),
    orderBy("submissionTime", "desc"),
    limit(pageSize)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return { data: [] };

  const firstDoc = snapshot.docs[0];
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { firstDoc, lastDoc, data };
};

// Get next page of data
export const getNextPage = async (collectionName, pageSize, lastDoc) => {
  if (!lastDoc) return null;

  const q = query(
    collection(db, collectionName),
    orderBy("submissionTime", "desc"),
    startAfter(lastDoc),
    limit(pageSize)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return { data: [] };

  const firstDoc = snapshot.docs[0];
  const lastDoc2 = snapshot.docs[snapshot.docs.length - 1];
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { firstDoc, lastDoc2, data };
};

// Get previous page of data
export const getPreviousPage = async (collectionName, pageSize, firstDoc) => {
  if (!firstDoc) return null;

  const q = query(
    collection(db, collectionName),
    orderBy("submissionTime", "desc"),
    endBefore(firstDoc), // Ensure `endBefore()` is applied first
    limit(pageSize) // Fetch the last `pageSize` items before `firstDoc`
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return { data: [] };

  const firstDoc2 = snapshot.docs[0];
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { firstDoc2, lastDoc, data };
};
