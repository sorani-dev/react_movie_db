import React from 'react';

const MovieList = (props) => {
    const {movies, Favorites, handleFavoritesClick }  = props

	return (
		<>
			{movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={index}>
					<img src={movie.Poster} alt='movie'></img>
                    <div
                        onClick={() => handleFavoritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                        >
                        <Favorites />
                    </div>
				</div>
			))}
		</>
	);
};

export default MovieList;
