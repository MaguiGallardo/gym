import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Componente Navbar reutilizable con menú tipo hamburguesa.
 * @param {Array} links - Lista de enlaces con etiquetas y rutas.
 * @returns {JSX.Element}
 */
const Navbar = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-500 text-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          GymApp
        </Link>
        <button
          className="text-white text-2xl focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <ul className="hidden md:flex gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className="hover:text-blue-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden mt-4 bg-blue-400 rounded-lg shadow-lg p-2">
          {links.map((link) => (
            <li key={link.label} className="mb-2 last:mb-0">
              <Link
                to={link.path}
                className="block px-4 py-2 hover:bg-blue-300 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
