import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'

const Item = ({ id, image, name, price }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='product-card'>
      <img src={image} alt={name} onClick={handleClick} style={{ cursor: 'pointer' }} />
      <h2>{name}</h2>
      <p>KES{price}</p>
      <AddToCartButton productId={id} />
    </div>
  )
}

export default Item


