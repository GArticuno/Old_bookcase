import {useContext} from 'react';
import styles from '../styles/components/MovieList.module.css';

import {MoviesContext} from '../context/MoviesContext';

export default function MovieList(){

  const {
    movies, 
    search, 
    searchY,
    IncludeY,
    notMovie,
    
    SubmitMovies, 
    ChangeMovies,
    ChangeType,
    IncludeYear,
    ChangeYear,
    MovieCellOpen,
    SubmitMovieDescription

  } = useContext(MoviesContext)

  function openAbout(imdbID: string){
    SubmitMovieDescription(imdbID);
    MovieCellOpen();
  }
  return (
  <div className={styles.container}>
    <form onSubmit={SubmitMovies}>
      <div>  
        <label>
          Title: 
          <input 
            type="text"
            value={search}
            onChange={ChangeMovies} 
          />
        </label>
      </div>
      
      <div className={styles.type}>
        <select  onChange={ChangeType}>
          <option value='' >All</option>
          <option value='type=movie'>Movies</option>
          <option value="type=series">Series</option>
          <option value="type=game">Games</option>
        </select>
      </div>
      <div>
        <label>
          Include Year:
          <input
            type='checkbox'
            onClick={IncludeYear}
          />
          <input 
            maxLength={4}
            min={1888}
            max={2100}
            type='number'
            value={searchY}
            disabled={!IncludeY}
            className={styles.inputYear}
            onChange={ChangeYear}
          />
        </label>
      </div>
      <button 
        type="submit"
        disabled={search===''}
      >
        Find
      </button>
    </form>
    {notMovie ===true && (
      <p>
        Movie not Found :(
      </p>
    )}
    <div>
      <div className={styles.gridMovies}>
        {notMovie === false && movies.map(movie => (
          <section key={movie.imdbID}>
            <div>
              {movie.Poster === 'N/A' && (
                <img src='/noImage.png' alt='' title='Not have Image'/>
              )}
              {movie.Poster !== 'N/A' && (
                <img src={movie.Poster} alt='Poster' title={movie.Title}/>
              )}
            </div>
            <div className={styles.title}>
                {movie.Title}
            </div>
            <button
              onClick={() => openAbout(movie.imdbID)}
            >
              More About
            </button>
          </section>
          ))
        } 
      </div>
    </div>
  </div>
  )
}