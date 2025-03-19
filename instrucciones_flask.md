# Instrucciones para el Backend con Flask

## 1. Instalar Python

### Opción A: Desde Microsoft Store (más fácil)
1. Abrir Microsoft Store desde Windows
2. Buscar "Python"
3. Seleccionar una versión reciente (Python 3.10 o superior)
4. Hacer clic en "Obtener" o "Instalar"

### Opción B: Desde python.org
1. Visitar [python.org](https://www.python.org/downloads/)
2. Descargar la última versión para Windows
3. Ejecutar el instalador
4. **Importante:** Marcar la opción "Add Python to PATH" durante la instalación
5. Completar la instalación

## 2. Verificar la instalación de Python

Abre una nueva ventana de PowerShell y ejecuta:
```powershell
python --version
```

Deberías ver algo como `Python 3.10.x`

## 3. Configurar el Backend Flask

1. Navega a la carpeta del backend:
```powershell
cd backend
```

2. Crea un entorno virtual (recomendado):
```powershell
python -m venv venv
```

3. Activa el entorno virtual:
```powershell
.\venv\Scripts\activate
```
(El prompt debería cambiar mostrando `(venv)` al inicio)

4. Instala las dependencias:
```powershell
pip install -r requirements.txt
```

## 4. Ejecutar el Backend

Asegúrate de que el archivo IMDb-movies.csv esté en la carpeta backend, luego ejecuta:
```powershell
python app.py
```

El servidor debería iniciarse y estar disponible en `http://localhost:5000`

## 5. Probar los endpoints con Postman

### Endpoint de todas las películas
- URL: `http://localhost:5000/movies`
- Método: GET

### Endpoint de filtrado por título
- URL: `http://localhost:5000/movies?title=godfather`
- Método: GET

## 6. Ejecutar pruebas

Asegúrate de tener el entorno virtual activado, luego ejecuta:
```powershell
pytest tests/
``` 