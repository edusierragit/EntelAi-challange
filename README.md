# Visualizador de Películas IMDB

Una aplicación fullstack que permite visualizar y filtrar películas de IMDB desde un archivo CSV.

![Screenshot de la aplicación](https://via.placeholder.com/800x400?text=Screenshot+Visualizador+IMDB)

## Características Principales

- 🎬 Visualización de películas en un formato de tarjetas atractivo
- 🔍 Búsqueda en tiempo real por título
- 🗂️ Filtrado por género
- 🔤 Ordenamiento por título, año o puntuación
- 🌓 Modo oscuro/claro (con detección automática de preferencias del sistema)
- ♿ Características de accesibilidad
- 📱 Diseño responsivo para dispositivos móviles y de escritorio
- ⚡ Optimizaciones de rendimiento (filtrado local, caché)

## Tecnologías Utilizadas

### Backend
- Flask
- Pandas
- Python

### Frontend
- React
- Bootstrap
- CSS personalizado

## Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── app.py            # API en Flask
│   ├── IMDb-movies.csv   # Archivo CSV con los datos de IMDb
│   ├── requirements.txt  # Dependencias del backend
│   └── tests/            # Pruebas del backend
│       └── test_api.py   # Pruebas unitarias
├── frontend/
│   ├── public/           # Archivos estáticos
│   ├── src/              # Código fuente de React
│   │   ├── App.js        # Componente principal
│   │   ├── App.css       # Estilos CSS
│   │   └── ...
│   ├── package.json      # Dependencias del frontend
└── README.md             # Este archivo
```

## Instalación y Ejecución

### Requisitos Previos
- Python 3.8 o superior
- Node.js 14.x o superior
- npm 6.x o superior

### Backend (Flask)

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Crea un entorno virtual (recomendado):
   ```bash
   python -m venv venv
   ```

3. Activa el entorno virtual:
   - En Windows:
     ```bash
     venv\Scripts\activate
     ```
   - En macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

5. Asegúrate de tener el archivo `IMDb-movies.csv` en el directorio backend.

6. Ejecuta el servidor Flask:
   ```bash
   python app.py
   ```

El servidor estará disponible en `http://localhost:5000`.

### Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## API Endpoints

### Obtener todas las películas

```bash
curl http://localhost:5000/movies
```

Respuesta:
```json
[
  {
    "imdb_title_id": "tt0000009",
    "title": "Miss Jerry",
    "year": "1894",
    "genre": "Romance",
    "director": "Alexander Black",
    "actors": "Blanche Bayliss, William Courtenay, Chauncey Depew",
    "avg_vote": "5.9",
    ...
  },
  ...
]
```

### Filtrar películas por título

```bash
curl http://localhost:5000/movies?title=godfather
```

Respuesta:
```json
[
  {
    "imdb_title_id": "tt0068646",
    "title": "The Godfather",
    "year": "1972",
    "genre": "Crime, Drama",
    "director": "Francis Ford Coppola",
    ...
  },
  ...
]
```

## Configuración de Postman

Para probar la API utilizando Postman, sigue estos pasos:

1. **Crear una nueva colección**:
   - Nombre: "IMDB Movie Visualizer"

2. **Configurar una variable de entorno**:
   - Nombre: `base_url`
   - Valor inicial: `http://localhost:5000`
   - Valor actual: `http://localhost:5000`

3. **Crear los siguientes requests**:

   - **GET All Movies**:
     - Método: GET
     - URL: `{{base_url}}/movies`

   - **GET Movies by Title**:
     - Método: GET
     - URL: `{{base_url}}/movies?title=godfather`

## Ejecución de Pruebas

### Pruebas del Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Asegúrate de tener el entorno virtual activado.

3. Ejecuta las pruebas con pytest:
   ```bash
   pytest tests/
   ```

## Características Avanzadas

### Filtrado Local y Caché

La aplicación implementa un sistema de caché para almacenar búsquedas previas y utiliza filtrado local para términos cortos, lo que mejora significativamente el rendimiento de la aplicación al reducir las llamadas al servidor.

### Accesibilidad

La aplicación incluye características de accesibilidad como:
- Alto contraste
- Compatibilidad con lectores de pantalla
- Navegación por teclado

### Modo Oscuro/Claro

La aplicación detecta automáticamente las preferencias de tema del sistema y también permite cambiar manualmente entre modos oscuro y claro.

## Posibles Mejoras

- Implementación de paginación para conjuntos de datos más grandes
- Búsqueda avanzada por múltiples campos
- Sistema de favoritos persistente
- Integración con la API oficial de IMDB para obtener datos actualizados
- Implementación de pruebas automatizadas más completas

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. #   E n t e l A i - c h a l l a n g e  
 