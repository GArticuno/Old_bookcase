import {MovieList} from './components/MovieList';
import './styles/global.css';
import MoviesProvider from './context/MoviesContext'

function App() {
  return (
    <MoviesProvider>
      <MovieList/>
    </MoviesProvider>
  );
}

export default App;
