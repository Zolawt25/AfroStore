
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className='search-container' >
      <h1>WELCOME TO AFROSTORE.COM MARKETPLACE</h1>
      <form action='/search' >
        <div className='search-form' >
           <input type="search" name='search' placeholder='search...'/>
        <button className='search-btn'><SearchIcon/></button>
        </div>
       
      </form>
    </div>
  )
}

export default Search
