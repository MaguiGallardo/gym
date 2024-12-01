import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const Login = () => {
  const { login } = useAuth(); // Custom hook para obtener la función de login del contexto de autenticación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Maneja el submit del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirige a la página de inicio después del login exitoso
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Iniciar Sesión
      </h1>

      {/* Formulario de login */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-lg shadow-lg w-96"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Botón de login */}
        <Button label="Iniciar Sesión" type="submit" />
      </form>
      
      <p className="mt-4 text-white text-center">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-blue-400 hover:underline">
          Regístrate
        </a>
      </p>
    </div>
  );
};

export default Login;
