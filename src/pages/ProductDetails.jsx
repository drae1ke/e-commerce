import React from 'react'
import useContext from 'react'
import { ShopContext } from '../context/shop-context'
import AddToCartButton from '../components/AddToCartButton'

const ProductDetails = (props) => {
  const { products } = useContext(ShopContext)
  return (
    <div className='product-details'>
        <div className='product-image'>
            <img src={props.image} alt={props.name} />
        </div>
        <div className='product-info'>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>KES{props.price}</p>
            <AddToCartButton />
        </div>
        </div>
      
  )
}

export default ProductDetails
