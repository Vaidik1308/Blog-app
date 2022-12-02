import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({search, setSearch}) => {
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">
          <input 
            type="text" 
            id=""search
            placeholder='Search Posts'
            value={search}
            onChange={(e) => setSearch(e.target.value) } 
          />
        </label>
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">New Post</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav