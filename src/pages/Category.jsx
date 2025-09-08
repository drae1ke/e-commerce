import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import '../pages/CSS/category.css'
import AddToCartButton from '../components/AddToCartButton'

const Category = (props) => {
  const { products } = useContext(ShopContext)
  return (
    <div className='shop-category'>
       <div className='banner-container'>
         <img src={props.banner} alt="banner"/>
       </div>
        <h1>{props.category}</h1>
        <div className='products-container'>
          {products.filter(item => item.category === props.category).map((product) => (
            <div className='product-card' key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <AddToCartButton />
              <p>KES{product.price}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Category
