import { render, screen } from '@testing-library/react';
import LoadingState from './LoadingState';

describe('LoadingState Component', () => {
  test('renderiza el mensaje de carga', () => {
    render(<LoadingState />);
    expect(screen.getByText('Cargando películas...')).toBeInTheDocument();
  });

  test('aplica la clase dark-mode cuando darkMode es true', () => {
    render(<LoadingState darkMode={true} />);
    const container = screen.getByText('Cargando películas...').closest('div.container');
    expect(container).toHaveClass('dark-mode');
  });

  test('no aplica la clase dark-mode cuando darkMode es false', () => {
    render(<LoadingState darkMode={false} />);
    const container = screen.getByText('Cargando películas...').closest('div.container');
    expect(container).not.toHaveClass('dark-mode');
  });
}); 