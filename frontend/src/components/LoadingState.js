import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar el estado de carga
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.darkMode - Si el modo oscuro está activado
 * @returns {JSX.Element} - Componente de estado de carga
 */
const LoadingState = ({ darkMode }) => {
  return (
    <div className={`container mt-5 text-center ${darkMode ? 'dark-mode' : ''}`}>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3">Cargando películas...</p>
    </div>
  );
};

LoadingState.propTypes = {
  darkMode: PropTypes.bool
};

LoadingState.defaultProps = {
  darkMode: false
};

export default LoadingState; 