import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Reservations from "../pages/Reservations";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Obtenemos el estado de autenticación desde el contexto

  // Si no hay usuario autenticado, redirige a Login
  if (!currentUser) {
    return <Login />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/reservations" element={<Reservations />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
