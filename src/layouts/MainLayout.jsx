import React from "react";
import Navbar from "../components/Navbar";

/**
 * Componente de diseño principal que incluye la barra de navegación
 * y un contenedor para el contenido de cada página.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido dinámico de cada página.
 * @returns {JSX.Element} Layout principal de la aplicación.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido dinámico */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer opcional (si es necesario) */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} Gimnasio | Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default MainLayout;
