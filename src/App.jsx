import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { app } from "./firebase";




// Importación de los contextos
import { AuthContext } from './context/AuthContext';
import { FirebaseContext } from './context/FirebaseContext';

// Importación de los componentes de las páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';

// Importación del layout y componentes de navegación
import MainLayout from './layouts/MainLayout';

// Importación de los servicios
import { showError } from './utils/notifications';

function App() {
  const { currentUser } = useContext(AuthContext); // Obtener el usuario autenticado desde el contexto
  const { firebaseApp } = useContext(FirebaseContext); // Obtener la instancia de Firebase desde el contexto

  return (
    <Router>
      <div className="App">
        {/* Componente de ToastContainer para notificaciones */}
        <ToastContainer />

        {/* Si el usuario no está autenticado, redirigirlo a la página de login */}
        <Routes>
          {/* Rutas públicas (Login, Signup) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Rutas privadas, que requieren autenticación */}
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={currentUser ? <Home /> : <Login />} // Redirige a Home si está logueado
            />
            <Route
              path="/profile"
              element={currentUser ? <Profile /> : <Login />} // Redirige a Profile si está logueado
            />
            <Route
              path="/reservations"
              element={currentUser ? <Reservations /> : <Login />} // Redirige a Reservations si está logueado
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

