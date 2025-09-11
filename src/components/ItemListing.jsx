import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import AddToCartButton from './AddToCartButton'

const ItemListing = ({id, name, price, image,product}) => {
   
  return (
      
        <div key={id} className='arrival'>
          <Link to={`/product/${id}`}>
            <img src={image} alt={name} />
          </Link>
          <h3>
            {name}
          </h3>
          <Rating product={product}/>
          <p>{price}</p>
          <AddToCartButton productId={id} />      
        </div>

  )
}

export default ItemListing
