// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app, firestore } from "../firebase"; // Importar Firestore
import { doc, setDoc } from "firebase/firestore"; // Para guardar datos en Firestore

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // Si el usuario está autenticado, guardar información en Firestore
        saveUserToFirestore(currentUser);
      }
    });

    return unsubscribe;
  }, [auth]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  // Función para guardar el usuario en Firestore
  const saveUserToFirestore = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date(),
      });
    } catch (error) {
      console.error("Error guardando usuario en Firestore:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
