import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import './Featured.css'

const Rating = ({product}) => {
    const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />)
    }

    return stars
  }
  return (
    <div>
        <div className='rating'>
                      {renderStars(product.rating)}
                    </div> 
    </div>
  )
}

export default Rating
