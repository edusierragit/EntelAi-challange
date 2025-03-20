import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '../utils/formatters';

// Obtener URL de la API desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const CACHE_SIZE_LIMIT = 10; // Límite de tamaño para el caché
const API_TIMEOUT = 5000; // 5 segundos de timeout

/**
 * Función auxiliar para ordenar películas
 */
const sortMovies = (movies, sortField, direction) => {
  return [...movies].sort((a, b) => {
    let valueA = a[sortField] || '';
    let valueB = b[sortField] || '';
    
    if (sortField === 'avg_vote' || sortField === 'year') {
      valueA = parseFloat(valueA) || 0;
      valueB = parseFloat(valueB) || 0;
    } else {
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
    }
    
    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Función auxiliar para filtrar películas por género
 */
const filterByGenre = (movies, genre) => {
  if (!genre || genre.trim() === '') return movies;
  return movies.filter(movie => 
    movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase())
  );
};

/**
 * Hook personalizado para manejar la carga y filtrado de películas
 * @returns {Object} - Estado y funciones para manejo de películas
 */
export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cache, setCache] = useState({});
  
  // Función para agregar logs
  const addLog = useCallback((message) => {
    console.log(message);
    setLogs(prevLogs => [...prevLogs, { 
      time: new Date().toLocaleTimeString(), 
      message: message 
    }]);
  }, []);

  // Función para manejar errores de API
  const handleApiError = useCallback((err, message) => {
    addLog(`ERROR: ${err.message}`);
    setError(message);
    console.error('Error en API:', err);
  }, [addLog]);

  // Cargar películas al montar el componente
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        addLog("Iniciando carga de películas desde el servidor");
        setLoading(true);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
        
        const response = await fetch(`${API_URL}/movies`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }
        
        const data = await response.json();
        addLog(`Películas cargadas: ${data.length} registros`);
        
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        handleApiError(err, 'Error al cargar las películas. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [addLog, handleApiError]);

  // Extraer todos los géneros únicos
  const uniqueGenres = useMemo(() => {
    if (!movies.length) return [];
    const allGenres = new Set();
    
    movies.forEach(movie => {
      if (movie.genre) {
        const genres = movie.genre.split(', ');
        genres.forEach(g => allGenres.add(g.trim()));
      }
    });
    
    return ['', ...Array.from(allGenres)].sort();
  }, [movies]);

  // Función para filtrar y ordenar películas localmente
  const filterAndSortLocally = useCallback((searchValue, genreFilter, sortField, direction) => {
    setIsSearching(true);
    
    let result = [...movies];
    
    // Filtrar por término de búsqueda
    if (searchValue && searchValue.trim() !== '') {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtrar por género
    result = filterByGenre(result, genreFilter);
    
    // Ordenar resultados
    result = sortMovies(result, sortField, direction);
    
    setFilteredMovies(result);
    setIsSearching(false);
    addLog(`Filtrado local: Encontradas ${result.length} películas`);
  }, [movies, addLog]);

  // Función para buscar películas en el servidor (con caché)
  const performSearch = useCallback(async (value, genre, sortBy, sortDirection) => {
    setIsSearching(true);
    addLog(`Búsqueda: "${value}"`);
    
    // Revisar si tenemos este resultado en caché
    const cacheKey = `search_${value}`;
    if (cache[cacheKey]) {
      addLog(`Usando caché para: "${value}"`);
      let result = cache[cacheKey];
      result = filterByGenre(result, genre);
      result = sortMovies(result, sortBy, sortDirection);
      setFilteredMovies(result);
      setIsSearching(false);
      return;
    }
    
    try {
      // Para cualquier búsqueda, usar siempre el backend
      addLog(`Buscando en servidor: "${value}"`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(`${API_URL}/movies?title=${encodeURIComponent(value)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status}`);
      }
      
      const data = await response.json();
      addLog(`Películas encontradas para "${value}": ${data.length}`);
      
      // Limpiar caché si excede el límite
      const cacheKeys = Object.keys(cache);
      if (cacheKeys.length >= CACHE_SIZE_LIMIT) {
        const oldestKey = cacheKeys[0];
        setCache(prevCache => {
          const newCache = { ...prevCache };
          delete newCache[oldestKey];
          return newCache;
        });
      }
      
      // Guardar en caché
      setCache(prevCache => ({ 
        ...prevCache, 
        [cacheKey]: data 
      }));
      
      // Aplicar filtrado adicional y ordenamiento
      let result = filterByGenre(data, genre);
      result = sortMovies(result, sortBy, sortDirection);
      
      setFilteredMovies(result);
    } catch (err) {
      handleApiError(err, 'Error al buscar películas. Por favor, intenta de nuevo.');
    } finally {
      setIsSearching(false);
    }
  }, [cache, filterAndSortLocally, addLog, handleApiError]);

  // Crear versión con debounce de performSearch
  const debouncedSearch = useMemo(() => 
    debounce(performSearch, 300)
  , [performSearch]);

  // Obtener estadísticas de los datos
  const stats = useMemo(() => {
    if (!movies.length) return null;
    
    const years = movies.map(m => parseInt(m.year)).filter(Boolean);
    const ratings = movies.map(m => parseFloat(m.avg_vote)).filter(Boolean);
    
    return {
      oldestMovie: Math.min(...years),
      newestMovie: Math.max(...years),
      avgRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
      totalMovies: movies.length
    };
  }, [movies]);

  return {
    movies,
    filteredMovies,
    loading,
    error,
    logs,
    isSearching,
    uniqueGenres,
    stats,
    addLog,
    performSearch,
    debouncedSearch,
    filterAndSortLocally
  };
}; 