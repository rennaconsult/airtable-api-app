import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Firestore collection reference for Bases
const basesCollection = collection(db, "bases");

// Add a new Base record
export const addBase = async (base) => {
  try {
    const docRef = await addDoc(basesCollection, base);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding base: ", error);
  }
};

// Get all registered Bases
export const getBases = async () => {
  try {
    const querySnapshot = await getDocs(basesCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bases: ", error);
  }
};

// Get a specific Base by its Base ID
export const getBase = async (baseId) => {
  try {
    const q = query(basesCollection, where("baseId", "==", baseId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // Assuming Base IDs are unique
      return { id: doc.id, ...doc.data() };
    } else {
      console.warn(`No base found with ID: ${baseId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching base: ", error);
  }
};

// Delete a Base record by ID
export const deleteBase = async (id) => {
  try {
    const docRef = doc(db, "bases", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting base: ", error);
  }
};
