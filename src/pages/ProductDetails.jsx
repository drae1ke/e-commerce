import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import AddToCartButton from '../components/AddToCartButton'
import { useParams } from 'react-router-dom'
import './CSS/productDetails.css'

const ProductDetails = () => {
  const { products } = useContext(ShopContext)
  const { productId } = useParams()
  const product = products.find((p) => String(p.id) === String(productId))

  if (!product) {
    return <div className='product-details'>Product not found.</div>
  }

  return (
    <>
      <div className='product-details'>
        <div className='product-details-right-side'>
          <div className='product-images'>
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
          </div>
          <div className='product-image-main'>
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className='product-details-left-side'>
          <div className='product-info'>
            <h1>{product.name}</h1>
            {product.description && <p>{product.description}</p>}
            <p>KES{product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
            <p>Weight: {product.weight}</p>
            <p>Dimensions: {product.dimensions}</p>
            <p>Material: {product.material}</p>
            <p>Style: {product.style}</p>
            <p>Type: {product.type}</p>
            <p>Model: {product.model}</p>
            <p>Series: {product.series}</p>
            <p>Features: {product.features}</p>
            <p>Warranty: {product.warranty}</p>
            <p>Made in: {product.madeIn}</p>
            <p>Made by: {product.madeBy}</p>
            <p>Made in: {product.madeIn}</p>
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
