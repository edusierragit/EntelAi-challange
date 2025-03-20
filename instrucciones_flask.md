# Instrucciones para el Backend con Flask

## Requisitos
- Python 3.10 o superior

## Configuración
1. Navega a la carpeta del backend:
```powershell
cd backend
```

2. Crea y activa el entorno virtual:
```powershell
python -m venv venv
.\venv\Scripts\activate
```

3. Instala dependencias:
```powershell
pip install -r requirements.txt
```

## Ejecutar el Backend
```powershell
python app.py
```
El servidor estará disponible en `http://localhost:5000`

## API Endpoints
- `GET /movies`: Obtiene todas las películas
- `GET /movies?title=palabra`: Filtra películas por título

## Tests
```powershell
pytest tests/
``` 