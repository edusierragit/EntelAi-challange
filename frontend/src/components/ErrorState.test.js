import { render, screen } from '@testing-library/react';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  test('renderiza el mensaje de error', () => {
    render(<ErrorState message="Error de prueba" />);
    expect(screen.getByText('Error de prueba')).toBeInTheDocument();
  });

  test('aplica la clase dark-mode cuando darkMode es true', () => {
    render(<ErrorState message="Error de prueba" darkMode={true} />);
    const container = screen.getByText('Error de prueba').closest('div.container');
    expect(container).toHaveClass('dark-mode');
  });

  test('no aplica la clase dark-mode cuando darkMode es false', () => {
    render(<ErrorState message="Error de prueba" darkMode={false} />);
    const container = screen.getByText('Error de prueba').closest('div.container');
    expect(container).not.toHaveClass('dark-mode');
  });
}); 