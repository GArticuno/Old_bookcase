import {createContext, useState, ReactNode} from 'react';

import {MovieCell} from '../components/MovieCell';
import api from '../services/api';

interface Movies{
  Poster:string,
  Title:string,
  imdbID:string,
  Type:string,
  Year:string,
}

interface Ratings{
  Source: string,
  Value: string
}

interface Movie{
  Actors: string, 
  Awards: string,
  BoxOffice: string,
  Country: string, 
  Director: string, 
  Genre: string, 
  Language: string, 
  Plot: string, 
  Poster: string, 
  Production: string, 
  Ratings: Ratings[], 
  Runtime: string,
  Title: string, 
  Writer: string,
  Year: string, 
  Type: string
}
interface MoviesContextData{
    search: string;
    searchT: string;
    searchY: string;
    page: number;
    IncludeY: boolean;
    activeFind: boolean;
    notMovie: boolean;
    head: boolean;
    tail: boolean;
    movies: Movies[];
    movie: Movie;
    loadMovie: boolean;

    ChangeMovies: (event: any)=> void;
    ChangeType: (event: any) => void;
    IncludeYear: () => void;
    ChangeYear: (event: any) => void;
    SubmitMovies: (event: any) => void;
    SubmitMovieDescription: (movieId: string) => void;
    MovieCellOpen: () => void;
    MovieCellClose: () => void;
    prevPage: () => void;
    nextPage: () => void;
    resetPage: () => void;

}

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextData);


export default function MoviesProvider({children} : MoviesProviderProps){

  const [movies, setMovies]= useState([]);
  
  const [search, setSearch]= useState('');
  const [searchY, setSearchY]= useState('');
  const [searchT, setSearchT]= useState('');
  const [page, setPage] = useState(1);

  const [IncludeY, setIncludeY]= useState(false);
  const [activeFind, setActiveFind]= useState(false);
  const [notMovie, setNotMovie]= useState(false);
  const [head, setHead] = useState(true);
  const [tail, setTail] = useState(true);

  const [movie, setMovie]= useState({} as Movie);
  const [isMovieCellOpen, setIsMovieCellOpen] = useState(false);
  const [loadMovie, setLoadMovie]= useState(false);

  function ChangeMovies(event: any){
    setSearch(event.target.value);
  }

  function ChangeType(event: any){
    setSearchT(event.target.value);
  }

  function IncludeYear(){
    setIncludeY(!IncludeY);
    setSearchY('');
  }
  function ChangeYear(event: any){
    setSearchY(event.target.value);
  
  }

  function SubmitMovies(event: any){
    var year = 'y=' + searchY;
    event.preventDefault();

    api.get(`?s=${search}&${searchT}&${year}&page=${page}&?i=tt3896198&apikey=bc5b2f44`)
      .then(res => {
        console.log(res.data.Search)
        if(res.data.Search === undefined && page === 1){
          setNotMovie(true);
        }else if(res.data.Search=== undefined && page !== 1){
          setTail(true);
          setNotMovie(false);
        }else{
          setMovies(res.data.Search);
          setActiveFind(true);
          setTail(false);
          setNotMovie(false);
        }
        if(page === 1){
          setHead(true);
        }else if(page > 1){
          setHead(false);
        }
      }).catch(err => console.log(err))
  }

  function SubmitMovieDescription(movieId: string){
    setLoadMovie(true);
    api.get(`?i=${movieId}&?i=tt3896198&apikey=bc5b2f44`)
      .then(res => {
        if(res.data=== undefined){
          console.log('Something wrong happen')
        }else{
          setMovie(res.data);
          setLoadMovie(false);
          setLoadMovie(false);
        }
      })
  }

  function MovieCellOpen(){
    setIsMovieCellOpen(true);
  }

  function MovieCellClose(){
    setIsMovieCellOpen(false);
  }

  function prevPage(){
    setPage(page-1)

  }

  function nextPage(){
    setPage(page+1)
  }

  function resetPage(){
    setPage(1);
  }

  return(
    <MoviesContext.Provider
    value={{
      search,
      searchT,
      page,
      searchY,
      IncludeY,
      activeFind,
      notMovie,
      head,
      tail,
      movies,
      movie,
      loadMovie,

      ChangeMovies,
      ChangeType,
      IncludeYear,
      ChangeYear,
      SubmitMovies,
      SubmitMovieDescription,
      MovieCellOpen,
      MovieCellClose,
      prevPage,
      nextPage,
      resetPage
      
      }}
    >
      {children}
      {isMovieCellOpen && <MovieCell/>}
    </MoviesContext.Provider>
  )
}