import { render, screen } from '@testing-library/react';
import MoviesList from './MoviesList';

// Mock del componente MovieCard para simplificar las pruebas
jest.mock('./MovieCard', () => {
  return function MockMovieCard({ movie }) {
    return <div data-testid="movie-card">{movie.title}</div>;
  };
});

// Mock del componente Pagination
jest.mock('./Pagination', () => {
  return function MockPagination() {
    return <div data-testid="pagination"></div>;
  };
});

describe('MoviesList Component', () => {
  const mockProps = {
    movies: [
      { id: 1, title: 'Película 1' },
      { id: 2, title: 'Película 2' },
      { id: 3, title: 'Película 3' }
    ],
    currentPage: 1,
    totalPages: 2,
    onPageChange: jest.fn(),
    isSearching: false,
    searchTerm: '',
    genre: '',
    sortBy: 'title',
    sortDirection: 'asc',
    totalMovies: 3
  };

  test('renderiza la lista de películas correctamente', () => {
    render(<MoviesList {...mockProps} />);
    
    // Verifica que se muestren las películas
    expect(screen.getByText('Película 1')).toBeInTheDocument();
    expect(screen.getByText('Película 2')).toBeInTheDocument();
    expect(screen.getByText('Película 3')).toBeInTheDocument();
    
    // Verifica que se muestre el componente de paginación
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('muestra mensaje de búsqueda cuando isSearching es true', () => {
    render(<MoviesList {...mockProps} isSearching={true} />);
    
    // Verifica que se muestre el mensaje de búsqueda
    expect(screen.getByText('Buscando películas...')).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay resultados', () => {
    render(<MoviesList {...mockProps} movies={[]} totalMovies={0} />);
    
    // Verifica que se muestre el mensaje de no resultados
    expect(screen.getByText('No se encontraron películas que coincidan con tu búsqueda.')).toBeInTheDocument();
  });

  test('muestra el término de búsqueda cuando se proporciona', () => {
    render(<MoviesList {...mockProps} searchTerm="Matrix" />);
    
    // Verifica que se muestre el término de búsqueda
    expect(screen.getByText(/que coinciden con "Matrix"/)).toBeInTheDocument();
  });

  test('muestra el género cuando se selecciona uno', () => {
    render(<MoviesList {...mockProps} genre="Acción" />);
    
    // Verifica que se muestre el género
    expect(screen.getByText(/en "Acción"/)).toBeInTheDocument();
  });
}); 