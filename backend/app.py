from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cargar datos del CSV
def load_movies():
    try:
        # Probar con diferentes codificaciones
        try:
            df = pd.read_csv('IMDb-movies.csv', encoding='latin-1')
            print("CSV cargado correctamente con encoding latin-1")
        except Exception as e:
            print(f"Error con latin-1, intentando con ISO-8859-1: {e}")
            df = pd.read_csv('IMDb-movies.csv', encoding='ISO-8859-1')
            print("CSV cargado correctamente con encoding ISO-8859-1")
        
        # Reemplazar NaN con None (se convertirá a null en JSON)
        df = df.replace({np.nan: None})
        
        return df.to_dict('records')
    except Exception as e:
        print(f"Error al cargar el archivo CSV: {e}")
        return []

movies = load_movies()

@app.route('/movies', methods=['GET'])
def get_movies():
    title_query = request.args.get('title', '').lower()
    
    if title_query:
        filtered_movies = [movie for movie in movies if title_query in movie.get('title', '').lower()]
        # Limitar a 100 resultados máximo
        return jsonify(filtered_movies[:100])
    
    # Devolver solo 100 películas cuando no hay filtro
    return jsonify(movies[:100])

if __name__ == '__main__':
    app.run(debug=True) 