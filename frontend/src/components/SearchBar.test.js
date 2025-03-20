import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('renderiza correctamente', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    // Verifica que el input exista
    const searchInput = screen.getByPlaceholderText('Buscar películas por título...');
    expect(searchInput).toBeInTheDocument();
  });
  
  test('llama a onChange cuando se escribe en el input', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    // Obtener el input
    const searchInput = screen.getByPlaceholderText('Buscar películas por título...');
    
    // Escribir en el input
    await userEvent.type(searchInput, 'Matrix');
    
    // Verificar que onChange fue llamado con el valor correcto
    expect(mockOnChange).toHaveBeenCalledWith('Matrix');
  });
  
  test('muestra el valor proporcionado', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="Star Wars" onChange={mockOnChange} />);
    
    // Verifica que el input tenga el valor correcto
    const searchInput = screen.getByPlaceholderText('Buscar películas por título...');
    expect(searchInput).toHaveValue('Star Wars');
  });
}); 