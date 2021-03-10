import {createContext, useState, ReactNode} from 'react';

import MovieCell from '../components/MovieCell';
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
    IncludeY: boolean;
    activeFind: boolean;
    notMovie: boolean;
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
  
  const [IncludeY, setIncludeY]= useState(false);
  const [activeFind, setActiveFind]= useState(false);
  const [notMovie, setNotMovie]= useState(false);
  
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
    api.get(`?s=${search}&${searchT}&${year}&?i=tt3896198&apikey=bc5b2f44`)
      .then(res => {
        if(res.data.Search=== undefined){
          setNotMovie(true);
        }else{
          setMovies(res.data.Search);
          setActiveFind(true);
          setNotMovie(false);
        }
      })
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

  return(
    <MoviesContext.Provider
    value={{
      search,
      searchT,
      searchY,
      IncludeY,
      activeFind,
      notMovie,
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
      
      }}
    >
      {children}
      {isMovieCellOpen && <MovieCell/>}
    </MoviesContext.Provider>
  )
}