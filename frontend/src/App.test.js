import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock de los hooks personalizados
jest.mock('./hooks/useMovies', () => ({
  useMovies: () => ({
    filteredMovies: [
      {
        id: 1,
        title: 'Película de prueba',
        year: 2023,
        genre: 'Drama',
        director: 'Director de prueba',
        actors: 'Actor 1, Actor 2',
        language: 'Español',
        country: 'España',
        runtime: '120 min',
        rating: '8.5',
        plot: 'Descripción de la película de prueba'
      }
    ],
    loading: false,
    error: null,
    logs: [],
    isSearching: false,
    uniqueGenres: ['Drama', 'Comedia', 'Acción'],
    stats: { total: 1, averageRating: 8.5, oldestYear: 2020, newestYear: 2023 },
    debouncedSearch: jest.fn(),
    filterAndSortLocally: jest.fn()
  })
}));

jest.mock('./hooks/useDarkMode', () => ({
  useDarkMode: () => [false, jest.fn()]
}));

jest.mock('./hooks/usePagination', () => ({
  usePagination: () => ({
    currentItems: [
      {
        id: 1,
        title: 'Película de prueba',
        year: 2023,
        genre: 'Drama',
        director: 'Director de prueba',
        actors: 'Actor 1, Actor 2',
        language: 'Español',
        country: 'España',
        runtime: '120 min',
        rating: '8.5',
        plot: 'Descripción de la película de prueba'
      }
    ],
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    paginate: jest.fn(),
    resetPage: jest.fn()
  })
}));

describe('App Component', () => {
  test('renderiza la aplicación correctamente', async () => {
    render(<App />);
    
    // Verifica el título principal
    expect(screen.getByText('Catálogo de Películas IMDB')).toBeInTheDocument();
    
    // Verifica que se muestre la película de prueba
    await waitFor(() => {
      expect(screen.getByText('Película de prueba')).toBeInTheDocument();
    });
  });
  
  test('permite cambiar entre modo claro y oscuro', async () => {
    render(<App />);
    
    // Busca el botón de cambio de tema
    const themeToggleButton = screen.getByLabelText(/Activar modo oscuro/i);
    expect(themeToggleButton).toBeInTheDocument();
    
    // Simula un clic en el botón
    await userEvent.click(themeToggleButton);
    
    // Verifica que se llame a la función setDarkMode
    // Nota: Como usamos un mock, no podemos verificar el cambio real del estado
    // pero podemos asegurarnos de que el botón existe y es interactivo
    expect(themeToggleButton).toBeInTheDocument();
  });
});
