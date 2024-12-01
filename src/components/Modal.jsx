import React from "react";
import PropTypes from "prop-types";

/**
 * Componente Modal reutilizable para mostrar información.
 * @param {boolean} isOpen - Controla si el modal está visible.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {string | JSX.Element} title - Título del modal.
 * @param {JSX.Element | string} children - Contenido principal del modal.
 * @returns {JSX.Element | null}
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Modal;
