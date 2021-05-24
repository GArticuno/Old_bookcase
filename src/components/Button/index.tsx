import React, { useContext } from 'react'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

import {MoviesContext} from '../../context/MoviesContext';
import styles from '../../styles/components/MovieList.module.css';

export function PrevNext() {
  const {prevPage, nextPage, tail, head, SubmitMovies} = useContext(MoviesContext)

  return (
    <form className={styles.formArrow} onSubmit={SubmitMovies}>
      <button className={styles.arrows} type='submit' onClick={() => prevPage()} disabled={head === true}>
        <ImArrowLeft/>
      </button>
      <button className={styles.arrows} type='submit' onClick={() => nextPage()} disabled={tail === true}>
        <ImArrowRight/>
      </button>
    </form>
  )
}
