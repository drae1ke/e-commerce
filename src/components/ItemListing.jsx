import React from 'react'
import ProductCard from './ProductCard'

const ItemListing = ({id, name, price, image, product}) => {
  return (
    <ProductCard
      id={id}
      image={image}
      name={name}
      price={price}
      product={product}
      showRating={true}
      variant="featured"
    />
  )
}

export default ItemListing
