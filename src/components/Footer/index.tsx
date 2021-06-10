import React from 'react'
import styled from 'styled-components';
import {GoCode} from 'react-icons/all';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: auto;
  width: 100%;
  height: 60px;

  background-color: var(--gray-dark);
  font-size: 1.2rem;
  font-family: 'Baloo Tammudu 2', sans-serif;
  border-radius: 20px 20px 0px 0px;
  
  .icon {
    color: var(--red);
    font-size: 1.5rem;
    margin-top: -0.3rem;
  }

  p {
    color: var(--white);
    margin-top: 1.5rem;
    margin-left: 0.5rem;

    a {
      color: var(--white);
      transition: color 0.2s;
      &:hover{
        color: var(--red);
      }
    }
  }
`

export function Footer() {
  return (
    <StyledFooter>
      <GoCode className='icon'/>
      <p>by <a href="https://garticuno.github.io/EcoTrip/" target='_blank' rel="noreferrer">Garticuno</a>  2021</p>
    </StyledFooter>
  )
}
