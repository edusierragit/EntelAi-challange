import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '../utils/formatters';

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

  // Cargar películas al montar el componente
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        addLog("Iniciando carga de películas desde el servidor");
        setLoading(true);
        
        const response = await fetch('http://127.0.0.1:5000/movies');
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }
        
        const data = await response.json();
        addLog(`Películas cargadas: ${data.length} registros`);
        
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      } catch (err) {
        addLog(`ERROR: ${err.message}`);
        setError('Error al cargar las películas. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, [addLog]);

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

  // Función para filtrar y ordenar películas localmente (sin llamar al backend)
  const filterAndSortLocally = useCallback((searchValue, genreFilter, sortField, direction) => {
    setIsSearching(true);
    
    // Comenzamos con todas las películas
    let result = [...movies];
    
    // Filtrar por término de búsqueda
    if (searchValue && searchValue.trim() !== '') {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtrar por género
    if (genreFilter && genreFilter.trim() !== '') {
      result = result.filter(movie => 
        movie.genre && movie.genre.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }
    
    // Ordenar resultados
    result.sort((a, b) => {
      let valueA = a[sortField] || '';
      let valueB = b[sortField] || '';
      
      // Convertir a número si es puntuación o año
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
      setFilteredMovies(cache[cacheKey]);
      setIsSearching(false);
      return;
    }
    
    try {
      // Si está vacío, mostrar todas las películas y filtrar localmente
      if (value.trim() === '') {
        addLog("Búsqueda vacía: usando datos locales");
        filterAndSortLocally('', genre, sortBy, sortDirection);
      } else {
        // Si hay texto corto (3 caracteres o menos), filtrar localmente
        if (value.length <= 3) {
          addLog(`Filtrado local para: "${value}"`);
          filterAndSortLocally(value, genre, sortBy, sortDirection);
        } else {
          // Para búsquedas más largas, usar el backend
          addLog(`Buscando en servidor: "${value}"`);
          const response = await fetch(`http://127.0.0.1:5000/movies?title=${encodeURIComponent(value)}`);
          if (!response.ok) {
            throw new Error(`Error en la búsqueda: ${response.status}`);
          }
          const data = await response.json();
          addLog(`Películas encontradas para "${value}": ${data.length}`);
          
          // Guardar en caché
          setCache(prevCache => ({ 
            ...prevCache, 
            [cacheKey]: data 
          }));
          
          // Aplicar filtrado adicional y ordenamiento
          let result = [...data];
          
          // Filtrar por género si es necesario
          if (genre && genre.trim() !== '') {
            result = result.filter(movie => 
              movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
          }
          
          // Ordenar resultados
          result.sort((a, b) => {
            let valueA = a[sortBy] || '';
            let valueB = b[sortBy] || '';
            
            if (sortBy === 'avg_vote' || sortBy === 'year') {
              valueA = parseFloat(valueA) || 0;
              valueB = parseFloat(valueB) || 0;
            } else {
              valueA = valueA.toString().toLowerCase();
              valueB = valueB.toString().toLowerCase();
            }
            
            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
          });
          
          setFilteredMovies(result);
        }
      }
    } catch (err) {
      addLog(`ERROR en búsqueda: ${err.message}`);
      console.error('Error searching movies:', err);
    } finally {
      setIsSearching(false);
    }
  }, [cache, filterAndSortLocally, addLog]);

  // Crear versión con debounce de performSearch
  const debouncedSearch = useMemo(() => 
    debounce(performSearch, 150)
  , [performSearch]);

  // Obtener estadísticas de los datos
  const stats = useMemo(() => {
    if (!movies.length) return null;
    
    // Convertir a números donde sea necesario
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