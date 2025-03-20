import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el tema oscuro/claro
 * @returns {Array} - Estado y función para cambiar el tema
 */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Inicializar el tema según las preferencias del sistema
  useEffect(() => {
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    
    // Escuchar cambios en el tema del sistema
    const darkModeListener = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    darkModeListener.addEventListener('change', handleChange);
    
    return () => {
      darkModeListener.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Aplicar clases CSS cuando cambia el tema
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  // Devolver estado actual y toggler
  return [darkMode, setDarkMode];
}; 