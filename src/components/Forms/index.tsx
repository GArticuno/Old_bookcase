import {useContext} from 'react';

import {MoviesContext} from '../../context/MoviesContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 1rem;

  border-radius: 0 0 20px 20px;
  font-family: 'Baloo Tammudu 2', sans-serif;
  background: var(--gray-dark);

  .div__label {
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 0.3rem;
    margin: 0.5rem;

    label {
      font-size: 1.15rem;
      margin: 0 0.5rem;

      
    }
    
    input {
      font-size:1.15rem;
      border:0;
      border-radius: 5px;
      margin-left: 0.5rem;
      outline: 0;
    }

    .checkbox {
      cursor: pointer;
      height: 0.9rem;
      width: 0.9rem;
      background-color: var(--red);

      &:checked {
        background-color: var(--red);
      }
    }

    .inputYear {
      width: 4rem;
    }
  }

  .type {
    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--red);
    padding: 0.3rem;
    border-radius: 5px;

    select{
      font-size:1.15rem;
      cursor: pointer;
      border:0;
      outline: 0;
      border-radius: 5px;
    }
  }

  @media(max-width: 843px) {
    display: grid;
    grid-template-columns: 22rem 7rem;
    column-gap: 4rem;
  }
  
  @media(max-width: 500px) {
    display: grid;
    grid-template-columns: 20rem;
    column-gap: 4rem;

    .type{  
      background: none;
    }
  }
`


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
    <Form onSubmit={SubmitMovies}>
      <div className='div__label'>  
        <label>
          Title:        
        <input 
          type="text"
          value={search}
          onChange={ChangeMovies} 
        />
        </label>  
      </div>
      
      <div className='type'>
        <select  onChange={ChangeType}>
          <option value='' >All</option>
          <option value='type=movie'>Movies</option>
          <option value="type=series">Series</option>
          <option value="type=game">Games</option>
        </select>
      </div>
      <div className='div__label'>
        <label>
          Include Year:
        <input
          className='checkbox'
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
          className='inputYear'
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
    </Form>
  )
}