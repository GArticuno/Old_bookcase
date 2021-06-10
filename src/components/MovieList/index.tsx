import {useContext} from 'react';

import {MoviesContext} from '../../context/MoviesContext';
import { Forms } from '../Forms';
import { PrevNext } from '../Button';
import styled from 'styled-components';
import { Footer } from '../Footer';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  
  min-height: 100vh;
  font-size: 1.2rem;
  color: var(--white);
  

  .gridMovies{
    display: grid;
    grid-template-columns: 0.8fr 0.8fr 0.8fr 0.8fr;
    row-gap: 1rem;
    margin-top: 1rem;

    section{
      display: grid;
      grid-template-rows: 1fr 3.3rem 2rem;
      margin: 1rem;
      border-radius: 10px;
      padding: 1rem;

      background: var(--gray-dark);

      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--red);
        padding: 1rem;
        border-radius: 10px;

        img{
          height: 15rem;
          width: 13rem;
        }
      }

      .title{
        font-family: 'Baloo Tammudu 2';
        font-size: 1.3rem;
        text-align: center;
        margin-top: 0.2rem;
      }
    }
  }

  button {
    font-size:1.15rem;
    cursor: pointer;
    border-radius: 20px;
    padding: 0.2rem 0.3rem;
    border: 0;
    outline: 0;
    color: var(--white);
    background-color: var(--red);
    transition: background-color 0.2s;

    &:not(:disabled):hover {
      background-color: var(--red-dark);
    }

    &:disabled{
      background-color: gray;
      color: darkgray;
    }
  }

  @media(max-width: 1210px){
    .gridMovies{
      grid-template-columns: 0.8fr 0.8fr 0.8fr;
    }
  }

  @media(max-width: 843px){
    .gridMovies{
      grid-template-columns: 0.8fr 0.8fr;
    }
  }

  @media(max-width: 500px){
    .gridMovies{
      grid-template-columns: 0.8fr;
      justify-content: center;
    }
  }
`

export function MovieList(){

  const {movies, notMovie, tail, MovieCellOpen, SubmitMovieDescription} = useContext(MoviesContext)

  function openAbout(imdbID: string){
    SubmitMovieDescription(imdbID);
    MovieCellOpen();
  }
  return (
  <Container>
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
        <div className='gridMovies'>
          {movies.map(movie => (
            <section key={movie.imdbID}>
              <div className='image'>
                {movie.Poster === 'N/A' && (
                  <img src='/noImage.png' alt='' title='Not have Image'/>
                )}
                {movie.Poster !== 'N/A' && (
                  <img src={movie.Poster} alt='Poster' title={movie.Title}/>
                )}
              </div>
              <div className='title'>
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
        <PrevNext/>
      </>      
    )}
    <Footer/>
  </Container>
  )
}