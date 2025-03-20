# Visualizador de Películas IMDB

Una aplicación fullstack que permite visualizar y filtrar películas de IMDB desde un archivo CSV, desarrollada como respuesta al desafío técnico según los requisitos especificados.

## Requisitos Cumplidos

### Backend (Flask)
- ✅ API REST implementada con Flask
- ✅ Endpoint GET /movies para listar todas las películas
- ✅ Endpoint GET /movies?title= para filtrar películas por título
- ✅ Carga de datos desde el archivo CSV proporcionado

### Frontend (React)
- ✅ Aplicación React que consume la API
- ✅ Interfaz amigable con visualización en tarjetas
- ✅ Barra de búsqueda para filtrar películas por título en tiempo real

### Documentación
- ✅ README con instrucciones detalladas
- ✅ Ejemplos de interacción con la API (curl/Postman)

### Pruebas
- ✅ Pruebas para endpoints en Flask
- ✅ Pruebas para componentes de frontend (opcional cumplido)

## Características Adicionales

Además de los requisitos básicos, se han implementado las siguientes mejoras:

- 🎬 Visualización de películas en un formato de tarjetas atractivo
- 🔍 Búsqueda en tiempo real por título (procesada por backend) [Requisito principal]
- 🗂️ Filtrado por género (característica adicional - implementado en frontend)
- 🔤 Ordenamiento por título, año o puntuación (característica adicional - implementado en frontend)
- 🌓 Modo oscuro/claro (con detección automática de preferencias del sistema)
- ♿ Características de accesibilidad
- 📱 Diseño responsivo para dispositivos móviles y de escritorio
- ⚡ Optimizaciones de rendimiento (debounce, caché de búsquedas)
- 🧪 Pruebas unitarias completas

## Tecnologías Utilizadas

### Backend
- Flask
- Pandas
- Python
- Pytest

### Frontend
- React
- Bootstrap
- CSS personalizado
- Jest + React Testing Library

## Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── .env.example      # Plantilla para variables de entorno del backend
│   ├── app.py           # API en Flask
│   ├── IMDb-movies.csv  # Archivo CSV con los datos de IMDb
│   ├── requirements.txt # Dependencias del backend
│   └── tests/           # Pruebas del backend
│       └── test_api.py  # Pruebas unitarias
├── frontend/
│   ├── .env.example      # Plantilla para variables de entorno del frontend
│   ├── public/          # Archivos estáticos
│   ├── src/             # Código fuente de React
│   │   ├── App.js       # Componente principal
│   │   ├── App.css      # Estilos CSS
│   │   └── ...
│   ├── package.json     # Dependencias del frontend
├── .gitignore          # Archivos ignorados por Git
└── README.md            # Este archivo
```


## Instalación y Ejecución

### Requisitos Previos
- Python 3.8 o superior
- Node.js 14.x o superior
- npm 6.x o superior

### Configuración de Variables de Entorno

El proyecto utiliza archivos `.env` para configurar variables de entorno. Se proporcionan archivos `.env.example` como plantillas.

#### Backend
Crea un archivo `.env` en el directorio `backend/` copiando el archivo `.env.example`:
```bash
cd backend
cp .env.example .env
```

El contenido debe ser:
```
FLASK_APP=app.py
FLASK_ENV=development
API_BASE_URL=http://localhost:5000
```

#### Frontend
Crea un archivo `.env` en el directorio `frontend/` copiando el archivo `.env.example`:
```bash
cd frontend
cp .env.example .env
```

El contenido debe ser:
```
REACT_APP_API_URL=http://localhost:5000
```

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
curl ${API_BASE_URL}/movies
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
curl ${API_BASE_URL}/movies?title={término_de_búsqueda}
```

Respuesta:
```json
[
  {
    "imdb_title_id": "tt0076759",
    "title": "Star Wars",
    "year": "1977",
    "genre": "Action, Adventure, Fantasy",
    "director": "George Lucas",
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
   - Valor inicial: `{{API_BASE_URL}}`
   - Valor actual: `{{API_BASE_URL}}`

3. **Crear los siguientes requests**:

   - **GET All Movies**:
     - Método: GET
     - URL: `{{base_url}}/movies`

   - **GET Movies by Title**:
     - Método: GET
     - URL: `{{base_url}}/movies?title={término_de_búsqueda}`

La API responderá con un máximo de 100 películas por solicitud para garantizar un rendimiento óptimo.

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

### Pruebas del Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Ejecuta las pruebas:
   ```bash
   npm test
   ```

## Arquitectura y Decisiones Técnicas

### Variables de Entorno y Configuración

La aplicación utiliza variables de entorno para gestionar las configuraciones:

- **Backend**: Archivo `.env` con configuraciones de Flask y URL base
- **Frontend**: Archivo `.env` con la URL de la API

Este enfoque permite:
- Cambiar fácilmente entre entornos (desarrollo, pruebas, producción)
- Evitar URLs hardcodeadas en el código
- Facilitar el despliegue en diferentes servidores sin cambiar código

### Filtrado y Búsqueda

La aplicación implementa los requisitos de filtrado del desafío:

- **Filtrado por título (Requisito principal)**: 
  - Implementado **exclusivamente en el backend** mediante Flask
  - Endpoint: `GET /movies?title={término_de_búsqueda}`
  - Todas las búsquedas por título se envían al backend, siguiendo la arquitectura cliente-servidor correcta
  - La barra de búsqueda implementa debounce para optimizar la experiencia de usuario

- **Características adicionales de filtrado**:
  - Se añadió filtrado por género y ordenamiento como funcionalidades extra
  - Nota: En una aplicación de producción, estas funcionalidades también se implementarían en el backend

### Optimizaciones

Para mejorar la experiencia de usuario conforme a los requisitos del desafío:

- **Debounce en la búsqueda**: 
  - Espera 300ms después de la última pulsación antes de realizar la búsqueda
  - Mejora la experiencia de filtrado "en tiempo real" solicitada

- **Caché de búsquedas**: 
  - Evita peticiones repetidas al servidor con los mismos términos
  - Permite una respuesta instantánea en búsquedas recientes

- **Manejo de errores**:
  - Gestión robusta de errores de API
  - Feedback visual claro para estados de carga y error

### Modo Oscuro/Claro

La aplicación detecta automáticamente las preferencias de tema del sistema y también permite cambiar manualmente entre modos oscuro y claro.
