import { db } from "../firebase"; // Importa la instancia de Firestore desde el archivo firebase.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Función para agregar un nuevo documento a una colección
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id; // Devuelve el ID del documento creado
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para obtener todos los documentos de una colección
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents; // Devuelve una lista de los documentos encontrados
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para actualizar un documento existente
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para eliminar un documento
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};
