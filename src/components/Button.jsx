import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable Button component.
 * @param {string} text - Text to display on the button.
 * @param {string} type - Type of button ('button', 'submit', 'reset').
 * @param {string} variant - Style variant of the button ('primary', 'secondary', 'danger').
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {function} onClick - Function to call when the button is clicked.
 * @param {string} className - Additional custom classes for the button.
 * @param {React.ReactNode} icon - Optional icon to display on the button.
 * @returns {JSX.Element} Styled button component.
 */
const Button = ({ 
  text, 
  type = "button", 
  variant = "primary", 
  disabled = false, 
  onClick, 
  className = "", 
  icon 
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none transition-all";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default Button;
