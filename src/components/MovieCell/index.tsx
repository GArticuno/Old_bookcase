import { useContext } from 'react';
import {MoviesContext} from '../../context/MoviesContext';
import styles from '../../styles/components/MovieCell.module.css';

export function MovieCell() {

  const {movie, MovieCellClose, loadMovie} = useContext(MoviesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {loadMovie ? (
          <div>
            Loading...
          </div>
        ):(
          <>
            <div>
              <div>
                {movie.Poster === 'N/A' && (
                  <img src='/noImage.png' alt='' title='Not have Image'/>
                )}
                {movie.Poster !== 'N/A' && (
                  <img src={movie.Poster} alt='Poster' title={movie.Title}/>
                )}
                <p><label>Plot:</label>  {movie.Plot}</p>
                <p><label>Runtime:</label> {movie.Runtime}</p>
                <p><label>BoxOffice:</label> {movie.BoxOffice}</p>
                {movie.Ratings.map((Rating, index) =>(
                  <p key={index}><label>{Rating.Source}:</label> {Rating.Value}</p>
                ))}
                
              </div>
              <div>
                <p><label>Title:</label> {movie.Title} </p>
                <p><label>Genre:</label> {movie.Genre}</p>
                <p><label>Actors:</label> {movie.Actors}</p>
                <p><label>Director(s):</label> {movie.Director}</p>
                <p><label>Production:</label> {movie.Production}</p>
                
                <p><label>Awards:</label> {movie.Awards}</p>
                <p><label>Language:</label> {movie.Language}</p>
                <p><label>Country:</label> {movie.Country}</p>
                <p><label>Year:</label> {movie.Year}</p>
                
              </div>
            </div>
            <button 
              type='button'
              onClick={MovieCellClose}
            >
              <img src="/icons/close.svg" alt="Fechar"/>
            </button>
          </>
        )}    
      </div>
    </div>
  )
}