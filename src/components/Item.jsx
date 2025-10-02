import React from 'react'
import ProductCard from './ProductCard'

const Item = ({ id, image, name, price }) => {
  return (
    <ProductCard
      id={id}
      image={image}
      name={name}
      price={price}
      variant="default"
    />
  )
}

export default Item


