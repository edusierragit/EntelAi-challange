/**
 * Formatea la lista de actores para mostrar solo algunos nombres si son muchos
 * @param {string} actors - String con los actores separados por comas
 * @returns {string} - Lista formateada de actores
 */
export const formatActors = (actors) => {
  if (!actors) return 'No disponible';
  
  // Si es una lista larga, mostrar solo los primeros 3 actores
  const actorsList = actors.split(', ');
  if (actorsList.length > 3) {
    return `${actorsList.slice(0, 3).join(', ')} y otros`;
  }
  return actors;
};

/**
 * Implementación de debounce para reducir las llamadas a la API
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Tiempo en ms para esperar
 * @returns {Function} - Función con debounce
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}; 