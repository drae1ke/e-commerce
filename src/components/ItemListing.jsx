import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const ItemListing = ({id, name, price, image,product}) => {
   
  return (
      
        <div key={id} className='arrival'>
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <Rating product={product}/>
          <p>{price}</p>
          <Link to={`/product/${id}`} className='btn'>
            Buy Now
          </Link>
        </div>

  )
}

export default ItemListing
