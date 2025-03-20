import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

/**
 * Componente que muestra la lista de películas con paginación
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.movies - Lista de películas a mostrar
 * @param {number} props.currentPage - Página actual
 * @param {number} props.totalPages - Total de páginas
 * @param {Function} props.onPageChange - Función para cambiar de página
 * @param {boolean} props.isSearching - Si se está realizando una búsqueda
 * @param {string} props.searchTerm - Término de búsqueda
 * @param {string} props.genre - Género seleccionado
 * @param {string} props.sortBy - Campo de ordenamiento
 * @param {string} props.sortDirection - Dirección de ordenamiento
 * @returns {JSX.Element} - Componente de lista de películas
 */
const MoviesList = ({ 
  movies, 
  currentPage, 
  totalPages, 
  onPageChange,
  isSearching,
  searchTerm,
  genre,
  sortBy,
  sortDirection,
  totalMovies
}) => {
  if (isSearching) {
    return (
      <div className="alert alert-info mb-4">
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Buscando...</span>
          </div>
          <span>Buscando películas...</span>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No se encontraron películas que coincidan con tu búsqueda.
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-info mb-4">
        <span>
          Mostrando {totalMovies} películas
          {searchTerm ? ` que coinciden con "${searchTerm}"` : ''}
          {genre ? ` en "${genre}"` : ''}
          {sortBy === 'title' && ` ordenadas por título`}
          {sortBy === 'year' && ` ordenadas por año`}
          {sortBy === 'avg_vote' && ` ordenadas por puntuación`}
          {sortDirection === 'desc' && ` (descendente)`}
        </span>
      </div>

      <div className="row">
        {movies.map((movie, index) => (
          <div key={index} className="col-md-4 mb-4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onChange={onPageChange}
      />
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  totalMovies: PropTypes.number.isRequired
};

export default MoviesList; 