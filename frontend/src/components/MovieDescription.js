import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar la sinopsis de una película con opción para expandir/contraer
 * @param {Object} props - Propiedades del componente
 * @param {string} props.description - Texto de la sinopsis
 * @returns {JSX.Element} - Componente de descripción expandible
 */
const MovieDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const fullText = description || 'No disponible';
  const truncated = fullText.length > 80 ? fullText.substring(0, 80) + '...' : fullText;
  
  return (
    <>
      <strong>Sinopsis:</strong> 
      <p>{expanded ? fullText : truncated}</p>
      {fullText.length > 80 && (
        <button 
          className="btn btn-sm btn-link ver-mas" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '« Ver menos' : 'Ver más »'}
        </button>
      )}
    </>
  );
};

MovieDescription.propTypes = {
  description: PropTypes.string
};

export default MovieDescription; 