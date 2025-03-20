import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para los controles de filtrado y ordenamiento
 * @param {Object} props - Propiedades del componente
 * @param {string} props.genre - Género seleccionado actualmente
 * @param {string} props.sortBy - Campo de ordenamiento actual
 * @param {string} props.sortDirection - Dirección de ordenamiento
 * @param {Array} props.genres - Lista de géneros disponibles
 * @param {Function} props.onGenreChange - Manejador de cambio de género
 * @param {Function} props.onSortChange - Manejador de cambio de ordenamiento
 * @param {boolean} props.showLogs - Si se muestran los logs
 * @param {Function} props.onToggleLogs - Manejador para mostrar/ocultar logs
 * @param {number} props.logsCount - Cantidad de logs
 * @returns {JSX.Element} - Componente de controles de filtrado
 */
const FilterControls = ({ 
  genre, 
  sortBy, 
  sortDirection, 
  genres, 
  onGenreChange, 
  onSortChange,
  showLogs,
  onToggleLogs,
  logsCount
}) => {
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="input-group">
          <label className="input-group-text" htmlFor="genreFilter">Género</label>
          <select 
            className="form-select" 
            id="genreFilter" 
            value={genre} 
            onChange={e => onGenreChange(e.target.value)}
            aria-label="Filtrar por género"
          >
            <option value="">Todos los géneros</option>
            {genres.map((g, index) => g && (
              <option key={index} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="input-group">
          <label className="input-group-text">Ordenar por</label>
          <button 
            className={`btn ${sortBy === 'title' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSortChange('title')}
          >
            Título
            {sortBy === 'title' && (
              <i className={`bi ms-1 ${sortDirection === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
            )}
          </button>
          <button 
            className={`btn ${sortBy === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSortChange('year')}
          >
            Año
            {sortBy === 'year' && (
              <i className={`bi ms-1 ${sortDirection === 'asc' ? 'bi-sort-numeric-down' : 'bi-sort-numeric-up'}`}></i>
            )}
          </button>
          <button 
            className={`btn ${sortBy === 'avg_vote' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSortChange('avg_vote')}
          >
            Puntuación
            {sortBy === 'avg_vote' && (
              <i className={`bi ms-1 ${sortDirection === 'asc' ? 'bi-sort-numeric-down' : 'bi-sort-numeric-up'}`}></i>
            )}
          </button>
        </div>
      </div>
      
      <div className="col-md-4 text-end">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={onToggleLogs}
        >
          {showLogs ? 'Ocultar registro' : 'Mostrar registro'} ({logsCount})
        </button>
      </div>
    </div>
  );
};

FilterControls.propTypes = {
  genre: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  showLogs: PropTypes.bool.isRequired,
  onToggleLogs: PropTypes.func.isRequired,
  logsCount: PropTypes.number.isRequired
};

export default FilterControls; 