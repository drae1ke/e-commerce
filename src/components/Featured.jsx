import React from 'react'
import './Featured.css'
import ItemListing from './ItemListing'
import laptop from '../assets/hero.jpg'
import headphones from '../assets/headphones.jpg'
import nikon from '../assets/nikon.jpg'
import solarpanel from '../assets/solar-panel.jpg'


const Featured = () => {
  const products = [
    {
      id: 1,
      name: "Laptop Pro 15",
      price: "$99.99",
      rating: 4.5,
      image: laptop
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$79.99",
      rating: 4.8,
      image: headphones
    },
    {
      id: 3,
      name: "Digital Camera",
      price: "$129.99",
      rating: 4.3,
      image: nikon
    },
    {
      id: 4,
      name: "Solar Panel Kit",
      price: "$59.99",
      rating: 4.6,
      image: solarpanel
    }
  ]

  

  return (
    <div className='new-arrivals'>
      <h2>New Arrivals</h2>
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
  )
}

export default Featured