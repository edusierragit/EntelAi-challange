import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importar componentes
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import StatisticsBar from './components/StatisticsBar';
import MoviesList from './components/MoviesList';
import LogsPanel from './components/LogsPanel';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

// Importar hooks
import { useMovies } from './hooks/useMovies';
import { useDarkMode } from './hooks/useDarkMode';
import { usePagination } from './hooks/usePagination';

function App() {
  // Estado local
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showLogs, setShowLogs] = useState(false);

  // Usar custom hooks
  const { 
    filteredMovies, 
    loading, 
    error, 
    logs, 
    isSearching, 
    uniqueGenres, 
    stats, 
    debouncedSearch, 
    filterAndSortLocally 
  } = useMovies();
  
  const [darkMode, setDarkMode] = useDarkMode();
  
  const { 
    currentItems, 
    currentPage, 
    totalPages, 
    totalItems,
    paginate, 
    resetPage 
  } = usePagination(filteredMovies);

  // Manejadores de eventos
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    resetPage();
    debouncedSearch(value, genre, sortBy, sortDirection);
  }, [debouncedSearch, genre, sortBy, sortDirection, resetPage]);

  const handleGenreChange = useCallback((selectedGenre) => {
    setGenre(selectedGenre);
    resetPage();
    filterAndSortLocally(searchTerm, selectedGenre, sortBy, sortDirection);
  }, [filterAndSortLocally, searchTerm, sortBy, sortDirection, resetPage]);

  const handleSortChange = useCallback((field) => {
    resetPage();
    
    // Si hacemos clic en el mismo campo, invertimos la dirección
    if (field === sortBy) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      filterAndSortLocally(searchTerm, genre, field, newDirection);
    } else {
      // Si es un campo diferente, ordenamos ascendente
      setSortBy(field);
      setSortDirection('asc');
      filterAndSortLocally(searchTerm, genre, field, 'asc');
    }
  }, [filterAndSortLocally, searchTerm, genre, sortBy, sortDirection, resetPage]);

  // Renderizado condicional para estados de carga/error
  if (loading) return <LoadingState darkMode={darkMode} />;
  if (error) return <ErrorState message={error} darkMode={darkMode} />;

  return (
    <div className={`container mt-4 ${darkMode ? 'dark-mode' : ''}`}>
      {/* Cabecera con modo oscuro/claro */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Catálogo de Películas IMDB</h1>
        <button 
          className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
        </button>
      </div>
      
      {/* Buscador y filtros */}
      <SearchBar value={searchTerm} onChange={handleSearch} />
      
      {/* Estadísticas */}
      <StatisticsBar stats={stats} />
      
      {/* Filtros adicionales */}
      <FilterControls 
        genre={genre}
        sortBy={sortBy}
        sortDirection={sortDirection}
        genres={uniqueGenres}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        showLogs={showLogs}
        onToggleLogs={() => setShowLogs(!showLogs)}
        logsCount={logs.length}
      />
      
      {/* Panel de logs (colapsable) */}
      <LogsPanel show={showLogs} logs={logs} />

      {/* Lista de películas */}
      <MoviesList 
        movies={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
        isSearching={isSearching}
        searchTerm={searchTerm}
        genre={genre}
        sortBy={sortBy}
        sortDirection={sortDirection}
        totalMovies={totalItems}
      />
    </div>
  );
}

export default App;
