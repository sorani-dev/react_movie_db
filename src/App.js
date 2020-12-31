import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { API_KEY } from './.env'

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async () => {
    const url = `${API_KEY}&s=star wars`

    const response = await fetch(url)

    if (response.ok) {
      const responseJson = await response.json()
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    }
  }

  useEffect(() => {
    getMovieRequest()
  })

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;
