import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de paginación
 * @param {Object} props - Propiedades del componente
 * @param {number} props.currentPage - Página actual
 * @param {number} props.totalPages - Total de páginas
 * @param {Function} props.onChange - Función a ejecutar al cambiar de página
 * @returns {JSX.Element} - Componente de paginación
 */
const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container d-flex justify-content-center my-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>
        
        {/* Mostrar número de página actual y total */}
        <li className="page-item active">
          <span className="page-link">
            Página {currentPage} de {totalPages}
          </span>
        </li>
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Pagination; 