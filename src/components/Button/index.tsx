import React, { useContext } from 'react'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

import {MoviesContext} from '../../context/MoviesContext';
import styled from 'styled-components';

const Formarrow = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 1.9rem;
    border-radius: 50%;
    margin: 1rem;
  }
`

export function PrevNext() {
  const {prevPage, nextPage, tail, head, SubmitMovies} = useContext(MoviesContext)

  return (
    <Formarrow onSubmit={SubmitMovies}>
      <button type='submit' aria-label='ArrowLeft' onClick={() => prevPage()} disabled={head === true}>
        <ImArrowLeft aria-hidden='true'/>
      </button>
      <button type='submit' aria-label='ArrowRight' onClick={() => nextPage()} disabled={tail === true}>
        <ImArrowRight aria-hidden='true'/>
      </button>
    </Formarrow>
  )
}
