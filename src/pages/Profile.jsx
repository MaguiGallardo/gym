import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updatePassword, updateEmail, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Maneja el cambio de contraseña
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(password);
      setSuccess("Contraseña actualizada con éxito.");
    } catch (err) {
      setError("Error al actualizar la contraseña.");
    }
  };

  // Maneja el cambio de correo electrónico
  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(email);
      setSuccess("Correo electrónico actualizado con éxito.");
    } catch (err) {
      setError("Error al actualizar el correo electrónico.");
    }
  };

  // Maneja el logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Error al cerrar sesión.");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirige a login si no está autenticado
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Mi Perfil</h1>

      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        {/* Mostrar correo electrónico */}
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-2">Correo Electrónico</h2>
          <p>{email}</p>
        </div>

        {/* Formulario para cambiar correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Cambiar Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Nuevo correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Button label="Actualizar Correo" onClick={handleEmailChange} />
        </div>

        {/* Formulario para cambiar la contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium mb-2">
            Cambiar Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Button label="Actualizar Contraseña" onClick={handlePasswordChange} />
        </div>

        {/* Mensajes de éxito y error */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        {/* Botón de logout */}
        <Button label="Cerrar Sesión" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
