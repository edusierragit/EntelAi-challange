const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Función para cargar películas desde el CSV
const loadMovies = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream('IMDb-movies.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Seleccionar solo columnas relevantes
        const movie = {
          imdb_title_id: data.imdb_title_id,
          title: data.title,
          year: data.year,
          genre: data.genre,
          duration: data.duration,
          director: data.director,
          actors: data.actors,
          description: data.description,
          avg_vote: data.avg_vote,
          country: data.country,
          language: data.language
        };
        results.push(movie);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Error al leer el archivo CSV:', error);
        reject(error);
      });
  });
};

// Endpoint para obtener películas
app.get('/movies', async (req, res) => {
  try {
    const allMovies = await loadMovies();
    const titleQuery = req.query.title;
    
    if (titleQuery) {
      // Filtrar películas por título (case insensitive)
      const filteredMovies = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(titleQuery.toLowerCase())
      );
      // Limitar a 100 resultados
      return res.json(filteredMovies.slice(0, 100));
    }
    
    // Si no hay filtro, devolver las primeras 100 películas
    return res.json(allMovies.slice(0, 100));
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return res.status(500).json({ error: 'No se pudieron cargar los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 