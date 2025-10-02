import React, { useContext } from 'react'
import './Featured.css'
import './ProductCard.css'
import ItemListing from './ItemListing'
import { ShopContext } from '../Context/ShopContext'

const Popular = () => {
  const { products } = useContext(ShopContext)
  const featured = (products || []).filter((p) => p.isFeatured)
  return (
    <div>
         <div className='new-arrivals'>
      <h2>Popular Products</h2>
      <div className='products-grid'>
        {featured.map((product) => (
        <ItemListing 
           id = {product.id}
           name = {product.name}
           price = {`KES${product.price}`}
           key = {product.id}
           image = {product.image}
           product = {product}
        /> 
        ))}
      </div>
</div>
    </div>
  )
}

export default Popular
