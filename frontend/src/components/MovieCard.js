import React from 'react';
import PropTypes from 'prop-types';
import MovieDescription from './MovieDescription';
import { formatActors } from '../utils/formatters';

/**
 * Componente que renderiza una tarjeta de película
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.movie - Datos de la película
 * @returns {JSX.Element} - Componente de tarjeta de película
 */
const MovieCard = ({ movie }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text badge bg-primary">{movie.year}</p>
        
        {movie.genre && (
          <p className="card-text">
            <strong>Género:</strong> {movie.genre}
          </p>
        )}
        
        {movie.duration && (
          <p className="card-text">
            <strong>Duración:</strong> {movie.duration} min
          </p>
        )}
        
        {movie.director && (
          <p className="card-text">
            <strong>Director:</strong> {movie.director}
          </p>
        )}
        
        {movie.actors && (
          <p className="card-text">
            <strong>Actores:</strong> {formatActors(movie.actors)}
          </p>
        )}
        
        {movie.avg_vote && (
          <p className="card-text">
            <strong>Puntuación:</strong> 
            <span className="rating-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < Math.round(parseFloat(movie.avg_vote) / 2) ? 'bi-star-fill' : 'bi-star'}`}
                ></i>
              ))}
              <span className="ms-2">{movie.avg_vote}/10</span>
            </span>
          </p>
        )}
        
        {movie.description && (
          <div className="card-text description">
            <MovieDescription description={movie.description} />
          </div>
        )}
        
        {(movie.country || movie.language) && (
          <p className="card-text">
            <small className="text-muted">
              {movie.country} {movie.language ? `• ${movie.language}` : ''}
            </small>
          </p>
        )}

        {/* Badge para el ID de IMDb */}
        {movie.imdb_title_id && (
          <a 
            href={`https://www.imdb.com/title/${movie.imdb_title_id}/`} 
            target="_blank"
            rel="noopener noreferrer"
            className="imdb-badge"
            aria-label={`Ver ${movie.title} en IMDb`}
          >
            <span>IMDb</span>
          </a>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string,
    genre: PropTypes.string,
    duration: PropTypes.string,
    director: PropTypes.string,
    actors: PropTypes.string,
    avg_vote: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    language: PropTypes.string,
    imdb_title_id: PropTypes.string
  }).isRequired
};

export default MovieCard; 