import React, { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { app } from "../firebase"; // Importa la configuración de Firebase

// Crear el contexto de Firebase
const FirebaseContext = createContext();

// Hook personalizado para usar el contexto
export const useFirebase = () => useContext(FirebaseContext);

/**
 * Proveedor de Firebase para toda la aplicación.
 * @param {Object} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const FirebaseProvider = ({ children }) => {
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return (
    <FirebaseContext.Provider value={{ firestore, auth, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
