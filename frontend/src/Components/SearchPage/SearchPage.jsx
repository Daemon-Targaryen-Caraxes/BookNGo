import React from 'react'
import './SearchPageStyles.css'
import { Link } from 'react-router-dom';

const SearchPage = () => {

  const Swap = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="50" height="50">
        <path d="M8 5l-4 4h3v6h2V9h3l-4-4z" />
        <path d="M16 19l4-4h-3v-6h-2v6h-3l4 4z" />
      </svg>
    );
  };

  return (
    <div className='search-container'>
      <h1>Welcome To BookNGo</h1>
      <div>
        <label htmlFor="from">From:</label>
        <input type="search" id='from' />
      </div>
      <div className='swap'>
        <Swap />
      </div>
      <div>
        <label htmlFor="to">To:</label>
        <input type="search" id='to' />
      </div>
      <div id='departure-date'>
        <label htmlFor="date">Departure Date</label>
        <input type="date" name="" id="date" />
      </div>
      <div id='days'>
        <button className='today'>Today</button>
        <button className='tomorrow'>Tomorrow</button>
      </div>
      <Link to={'/payment'}><button className='search'>Search Here</button></Link>
    </div>
  )
}

export default SearchPage
