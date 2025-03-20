import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de barra de búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor actual de búsqueda
 * @param {Function} props.onChange - Función para manejar cambios
 * @returns {JSX.Element} - Componente de barra de búsqueda
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6 mx-auto">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-search"></i></span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar películas por título..." 
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label="Buscar películas"
          />
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar; 