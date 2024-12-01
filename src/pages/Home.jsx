import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      {/* Título principal */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        ¡Bienvenido a Gimnasio App!
      </h1>
      
      {/* Descripción */}
      <p className="text-lg md:text-xl text-center mb-8 max-w-xl">
        Reserva tus clases, planifica tus entrenamientos y disfruta de una experiencia única. 
        ¡Todo desde tu dispositivo móvil!
      </p>
      
      {/* Botones principales */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/classes">
          <Button label="Explorar Clases" />
        </Link>
        <Link to="/reservations">
          <Button label="Mis Reservas" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
