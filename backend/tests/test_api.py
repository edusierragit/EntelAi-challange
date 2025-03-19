import sys
import os
import json
import pytest

# Agregar el directorio raíz del proyecto al path para importar app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_movies(client):
    """Test que verifica que el endpoint /movies devuelve una lista de películas"""
    response = client.get('/movies')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_filter_movies_by_title(client):
    """Test que verifica el filtrado de películas por título"""
    # Este test asume que hay al menos una película con 'war' en el título
    # Modifica según tus datos reales
    response = client.get('/movies?title=war')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    # Verifica que todas las películas devueltas contienen 'war' en el título
    for movie in data:
        assert 'war' in movie.get('title', '').lower() 