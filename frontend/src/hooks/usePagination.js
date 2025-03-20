import { useState, useMemo } from 'react';

/**
 * Hook personalizado para manejar la paginación
 * @param {Array} items - Lista de elementos a paginar
 * @param {number} itemsPerPage - Elementos por página
 * @returns {Object} - Estado y funciones para paginación
 */
export const usePagination = (items = [], itemsPerPage = 9) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular elementos a mostrar en la página actual
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  // Calcular número total de páginas
  const totalPages = useMemo(() => 
    Math.ceil(items.length / itemsPerPage)
  , [items.length, itemsPerPage]);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para restablecer a la página 1
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    totalItems: items.length,
    paginate,
    resetPage
  };
}; 