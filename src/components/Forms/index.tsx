import {useContext} from 'react';
import styles from '../../styles/components/MovieList.module.css';

import {MoviesContext} from '../../context/MoviesContext';

export function Forms(){

  const {
    search, 
    searchY,
    IncludeY,
    
    SubmitMovies, 
    ChangeMovies,
    ChangeType,
    IncludeYear,
    ChangeYear,
    resetPage

  } = useContext(MoviesContext)

  return (
    <form onSubmit={SubmitMovies} className={styles.form}>
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
        type='submit'
        onClick={() => resetPage()}
        disabled={search===''}
      >
        Find
      </button>
    </form>
  )
}