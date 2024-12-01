import { firestore } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

/**
 * Hook personalizado para manejar operaciones con Firestore.
 * @returns {Object} Funciones para interactuar con Firestore.
 */
const useFirestore = () => {
  const { firestore } = useFirebase();

  /**
   * Agregar un documento a una colección.
   * @param {string} collectionName - Nombre de la colección.
   * @param {Object} data - Datos del documento a agregar.
   * @returns {Promise} Promesa con la referencia al documento agregado.
   */
  const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), data);
      return docRef;
    } catch (error) {
      console.error("Error al agregar documento:", error);
      throw error;
    }
  };

  /**
   * Obtener todos los documentos de una colección.
   * @param {string} collectionName - Nombre de la colección.
   * @returns {Promise<Array>} Promesa con un array de documentos.
   */
  const getDocuments = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      throw error;
    }
  };

  /**
   * Actualizar un documento en una colección.
   * @param {string} collectionName - Nombre de la colección.
   * @param {string} documentId - ID del documento a actualizar.
   * @param {Object} updatedData - Datos actualizados.
   * @returns {Promise<void>} Promesa resuelta cuando la actualización sea exitosa.
   */
  const updateDocument = async (collectionName, documentId, updatedData) => {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error al actualizar documento:", error);
      throw error;
    }
  };

  /**
   * Eliminar un documento de una colección.
   * @param {string} collectionName - Nombre de la colección.
   * @param {string} documentId - ID del documento a eliminar.
   * @returns {Promise<void>} Promesa resuelta cuando la eliminación sea exitosa.
   */
  const deleteDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      throw error;
    }
  };

  return {
    addDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
  };
};

export default useFirestore;
