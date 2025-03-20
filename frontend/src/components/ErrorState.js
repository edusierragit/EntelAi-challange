import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar el estado de error
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje de error
 * @param {boolean} props.darkMode - Si el modo oscuro está activado
 * @returns {JSX.Element} - Componente de estado de error
 */
const ErrorState = ({ message, darkMode }) => {
  return (
    <div className={`container mt-5 text-center ${darkMode ? 'dark-mode' : ''}`}>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
};

ErrorState.propTypes = {
  message: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

ErrorState.defaultProps = {
  darkMode: false
};

export default ErrorState; 