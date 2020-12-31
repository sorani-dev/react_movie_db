import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { API_KEY } from './.env'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('')

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
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;
