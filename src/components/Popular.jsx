import React from 'react'
import './Featured.css'
import ItemListing from './ItemListing'
import macbook from '../assets/macbook.jpg'
import ipad from '../assets/ipad.jpg'
import slimHp from '../assets/slim hp.jpg'
import earbuds from '../assets/earbuds.jpg'

const Popular = () => {
     const products = [
        {
          id: 1,
          name: "Macboook 8th gen 256gb ssd",
          price: "$1199.99",
          rating: 4.5,
          image: macbook
        },
        {
          id: 2,
          name: "Wireless earbuds",
          price: "$59.99",
          rating: 4.8,
          image: earbuds
        },
        {
          id: 3,
          name: "Ipad with pen and touch",
          price: "$1429.99",
          rating: 4.3,
          image: ipad
        },
        {
          id: 4,
          name: "Sleek thin Hp",
          price: "$239.99",
          rating: 4.6,
          image: slimHp
        }
      ]
  return (
    <div>
         <div className='new-arrivals'>
      <h2>Popular Products</h2>
      <div className='arrivals'>
        {products.map((product) => (
        <ItemListing 
           id = {product.id}
           name = {product.name}
           price = {product.price}
           key = {product.key}
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
