import React from 'react'
import './offersection.css'
import image1 from '../../assets/offert.png'
const OfferSection = () => {
    return (
        <section className='offer section'>
            <div className='offer_container bd-grid'>
                <div className='offer_data'>
                    <h3 className='offer_title'>50% OFF</h3>
                    <p className='offer_description'>In Adidas Superstar sneakers</p>
                    <a href="#" className='button'>Shop Now</a>
                </div>
                <img src={image1} alt="" className="offer_img"></img>
            </div>
        </section>
    )
}

export default OfferSection
