from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cargar datos del CSV
def load_movies():
    try:
        # Probar con diferentes codificaciones
        try:
            df = pd.read_csv('backend/IMDb-movies.csv', encoding='latin-1')
            print("CSV cargado correctamente con encoding latin-1")
        except Exception as e:
            print(f"Error con latin-1, intentando con ISO-8859-1: {e}")
            df = pd.read_csv('backend/IMDb-movies.csv', encoding='ISO-8859-1')
            print("CSV cargado correctamente con encoding ISO-8859-1")
        
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
        return jsonify(filtered_movies)
    
    return jsonify(movies)

if __name__ == '__main__':
    app.run(debug=True)
