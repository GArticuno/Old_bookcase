import {useContext} from 'react';
import styles from '../../styles/components/MovieList.module.css';

import {MoviesContext} from '../../context/MoviesContext';
import { Forms } from '../Forms';
import { PrevNext } from '../Button';

export function MovieList(){

  const {movies, notMovie, tail, MovieCellOpen, SubmitMovieDescription} = useContext(MoviesContext)

  function openAbout(imdbID: string){
    SubmitMovieDescription(imdbID);
    MovieCellOpen();
  }
  return (
  <div className={styles.container}>
    <Forms/>
    {notMovie === true && (
      <p>
        Movie not Found :(
      </p>
    )}
    {tail === true && (
      <PrevNext/>
    )}
    {notMovie === false && tail === false && (
      <>
      <div>
        <div className={styles.gridMovies}>
          {movies.map(movie => (
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
          ))}  
        </div>
      </div>
      <PrevNext/>
      </>      
    )}
  </div>
  )
}