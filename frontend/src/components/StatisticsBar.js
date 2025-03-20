import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente que muestra estadísticas sobre la colección de películas
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.stats - Estadísticas de las películas
 * @returns {JSX.Element|null} - Componente de estadísticas o null si no hay datos
 */
const StatisticsBar = ({ stats }) => {
  if (!stats) return null;
  
  return (
    <div className="stats-bar p-2 mb-4 rounded text-center">
      <div className="row">
        <div className="col-md-3">
          <div className="stat-item">
            <span className="stat-value">{stats.totalMovies}</span>
            <span className="stat-label">Películas</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-item">
            <span className="stat-value">{stats.oldestMovie}</span>
            <span className="stat-label">Año más antiguo</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-item">
            <span className="stat-value">{stats.newestMovie}</span>
            <span className="stat-label">Año más reciente</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-item">
            <span className="stat-value">{stats.avgRating}</span>
            <span className="stat-label">Puntuación media</span>
          </div>
        </div>
      </div>
    </div>
  );
};

StatisticsBar.propTypes = {
  stats: PropTypes.shape({
    totalMovies: PropTypes.number.isRequired,
    oldestMovie: PropTypes.number.isRequired,
    newestMovie: PropTypes.number.isRequired,
    avgRating: PropTypes.string.isRequired
  })
};

export default StatisticsBar; 