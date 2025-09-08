import React from 'react'
import {useState} from 'react'

const Search = () => {
    const [search,setSerach] = useState('');
    
    const handleChange = (e) =>{
        setSerach(e.target.value);
    }
  return (
    <div className='search'>
        <input 
          type="text" 
          placeholder="Search products..."
          value={search}
          onChange={handleChange}
        />
      
    </div>
  )
}

export default Search
