import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import '../pages/CSS/category.css'
import '../components/ProductCard.css'
import Item from '../components/Item'

const Category = (props) => {
  const { products } = useContext(ShopContext)
  return (
    <div className='shop-category'>
       <div className='banner-container'>
         <img src={props.banner} alt="banner"/>
       </div>
        <h1>{props.category}</h1>
        <div className='products-grid'>
          {products.filter(item => item.category === props.category).map((product) => (
            <Item key={product.id}
             id={product.id} 
             image={product.image} 
             name={product.name} 
             price={product.price} />
          ))}
        </div>
    </div>
  )
}

export default Category
