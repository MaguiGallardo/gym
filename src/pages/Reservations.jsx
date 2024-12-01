import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../context/FirebaseContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const Reservations = () => {
  const { user } = useAuth();
  const { getReservations, createReservation, deleteReservation } = useFirestore();
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Obtener las reservas del usuario desde Firebase
  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        try {
          const reservationsList = await getReservations(user.uid);
          setReservations(reservationsList);
        } catch (err) {
          setError("Error al cargar las reservas.");
        }
      };
      fetchReservations();
    } else {
      navigate("/login");
    }
  }, [user, navigate, getReservations]);

  // Maneja la creación de una nueva reserva
  const handleCreateReservation = async (e) => {
    e.preventDefault();
    if (!newReservation) {
      setError("Por favor, ingresa una fecha para la reserva.");
      return;
    }
    try {
      await createReservation(user.uid, newReservation);
      setSuccess("Reserva creada con éxito.");
      setNewReservation("");
      // Actualizar las reservas
      const reservationsList = await getReservations(user.uid);
      setReservations(reservationsList);
    } catch (err) {
      setError("Error al crear la reserva.");
    }
  };

  // Maneja la eliminación de una reserva
  const handleDeleteReservation = async (id) => {
    try {
      await deleteReservation(id);
      setSuccess("Reserva eliminada con éxito.");
      // Actualizar las reservas
      const reservationsList = await getReservations(user.uid);
      setReservations(reservationsList);
    } catch (err) {
      setError("Error al eliminar la reserva.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Mis Reservas</h1>

      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        {/* Formulario para crear una nueva reserva */}
        <div className="mb-4">
          <label htmlFor="reservation" className="block text-lg font-medium mb-2">
            Nueva Reserva
          </label>
          <input
            id="reservation"
            type="date"
            value={newReservation}
            onChange={(e) => setNewReservation(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Button label="Crear Reserva" onClick={handleCreateReservation} />
        </div>

        {/* Mostrar reservas */}
        <div>
          <h2 className="text-xl font-medium mb-2">Reservas Actuales</h2>
          {reservations.length > 0 ? (
            <ul>
              {reservations.map((reservation) => (
                <li
                  key={reservation.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{reservation.date}</span>
                  <Button
                    label="Eliminar"
                    onClick={() => handleDeleteReservation(reservation.id)}
                    className="bg-red-500 hover:bg-red-600"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes reservas.</p>
          )}
        </div>

        {/* Mensajes de error y éxito */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      </div>
    </div>
  );
};

export default Reservations;
