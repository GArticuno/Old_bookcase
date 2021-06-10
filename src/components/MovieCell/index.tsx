import { useContext } from 'react';
import {MoviesContext} from '../../context/MoviesContext';
import styled from 'styled-components';

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background: var(--background);
    max-height: 100vh;
    width: 100%;
    max-width: 650px;
    padding: 1.7rem 3.5rem;
    border: 3px solid var(--red);
    border-radius: 10px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    position: relative;

    .loading {
      color: var(--white);
      font-size: 1.2rem;
    }

    .movieCell {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      color: var(--white);

      img {
        height: 15rem;
        width: 13rem;
      }

      p {
        font-family: 'Shippori Mincho B1', sans-serif;
        font-size: 0.9rem;
      }

      label {
        color: var(--gold);
      }
    }
    button {
      position: absolute;
      cursor: pointer;
      right: 0.5rem;
      top: 0.5rem;
      background: transparent;
      border: 0;
      outline: 0;
      font-size: 0px;
    }
  }

  @media(max-width: 360px){

    .container {
      padding-top: 20rem;

      .movieCell {
        grid-template-columns: 1fr;
      }

      button{
      position: fixed;
      }
    }
  }
`


export function MovieCell() {

  const {movie, MovieCellClose, loadMovie} = useContext(MoviesContext)

  return (
    <Overlay onClick={MovieCellClose}>
      <div className='container' onClick={e => {e.stopPropagation();}}>
        {loadMovie ? (
          <p className='loading'>
            Loading...
          </p>
        ):(
          <>
            <div className='movieCell'>
              <div className='firstGrid'>
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
              <div className='secondGrid'>
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
    </Overlay>
  )
}