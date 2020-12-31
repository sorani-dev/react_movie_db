import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { API_KEY } from './.env'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavorites from './components/AddToFavorites';
import RemoveFavourites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])
  const localStorageKey = 'react-movie-app-favourites'

  const getMovieRequest = async (searchValue) => {
    const url = `${API_KEY}&s=${searchValue}`

    const response = await fetch(url)

    if (response.ok) {
      const responseJson = await response.json()
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey)
    if (stored !== null) {
      const movieFavorites = JSON.parse(stored)
      setFavorites(movieFavorites)
    }
  }, [])

  const saveToLocalStorage = item => {
    localStorage.setItem(localStorageKey, JSON.stringify(item))
  }


  const addFavoriteMovie = (movie) => {
    const id = favorites.find(favorite => favorite.imdbID === movie.imdbID)
    if (id === undefined) {
      const newFavorites = [ ...favorites, movie ]
      setFavorites(newFavorites)
      saveToLocalStorage(newFavorites)
    }
  }

  const removeFavoriteMovie = (movie) => {
    const newFavorites = favorites.filter(favorite => favorite.imdbID !== movie.imdbID)
    setFavorites(newFavorites)
    saveToLocalStorage(newFavorites)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          Favorites={AddToFavorites}
          handleFavoritesClick={addFavoriteMovie}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='row'>
				<MovieList
					movies={favorites}
					handleFavoritesClick={removeFavoriteMovie}
					Favorites={RemoveFavourites}
				/>
			</div>
    </div>
  );
};

export default App;
