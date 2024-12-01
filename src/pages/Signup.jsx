import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Maneja el registro de un nuevo usuario
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      await signup(email, password);
      setSuccess("Cuenta creada con éxito.");
      setTimeout(() => {
        navigate("/login"); // Redirige al login después de registrarse
      }, 2000);
    } catch (err) {
      setError("Hubo un error al crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Crear Cuenta</h1>

      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        {/* Formulario de registro */}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Botón de envío */}
          <Button label="Crear Cuenta" type="submit" />

          {/* Mensajes de error y éxito */}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          {success && <div className="text-green-500 text-center mt-4">{success}</div>}
        </form>
      </div>

      {/* Enlace a la página de login */}
      <div className="mt-4">
        <p className="text-white">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="underline text-blue-200">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
