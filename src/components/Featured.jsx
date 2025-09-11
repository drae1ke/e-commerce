import React, { useContext } from 'react'
import './Featured.css'
import ItemListing from './ItemListing'
import { ShopContext } from '../Context/ShopContext'


const Featured = () => {
  const { products } = useContext(ShopContext)
  const newArrivals = (products || []).filter((p) => p.isNewArrival)

  return (
    <div className='new-arrivals'>
      <h2>New Arrivals</h2>
      <div className='arrivals'>
        {newArrivals.map((product) => (
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
  )
}

export default Featured