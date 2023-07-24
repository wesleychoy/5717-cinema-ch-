from flask import Flask, jsonify, request
from flask_cors import CORS 
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

data = pd.read_csv('dataset.csv')
data1 = data[['id', 'title', 'overview', 'genre']].copy()  
data1.loc[:, 'tags'] = data1['genre'] + ' ' + data1['overview'] 
movies = data1.drop(columns=['overview', 'genre'])

cv = CountVectorizer(max_features=10000, stop_words='english')
vector = cv.fit_transform(movies['tags'].values.astype('U')).toarray()
similarity_matrix = cosine_similarity(vector)

def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distance = sorted(list(enumerate(similarity_matrix[index])), reverse=True, key=lambda item: item[1])
    recommended_movies = [movies.iloc[i[0]].title for i in distance[1:6]]  # Collect movie titles in a list
    return recommended_movies

@app.route('/api/recommendations/<name>')
def get_recommendations(name):
    movie = name
    recommendations = recommend(movie)
    return jsonify({'movies': recommendations})

if __name__ == '__main__':
    app.run(debug=True)

