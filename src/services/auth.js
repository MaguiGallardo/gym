import { auth } from "../firebase"; // Importa el objeto de autenticación de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Función para registrar un nuevo usuario
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario registrado
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario autenticado
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth); // Cierra la sesión del usuario
  } catch (error) {
    throw new Error(error.message); // Manejo de errores
  }
};

// Función para escuchar el estado de autenticación
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback); // Llama a la función de Firebase que escucha el cambio de estado de autenticación
};
