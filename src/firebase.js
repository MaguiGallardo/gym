// firebase.js

// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Autenticación
import { getStorage } from "firebase/storage"; // Storage

// Configuración de tu aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCED42KyIFOkAvd2wX9dmGoN9TXrpnuqXU",
  authDomain: "gym-1ec90.firebaseapp.com",
  projectId: "gym-1ec90",
  storageBucket: "gym-1ec90.appspot.com", // Corregí un posible error en el bucket
  messagingSenderId: "599475604856",
  appId: "1:599475604856:web:746084f94a13894b9f4c8d",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios específicos y expórtalos
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Exporta la instancia de la app
export default app;
