import React from 'react'
import { Link } from 'react-router-dom'
import featuredImg from "../../assets/featured.jpeg"

const FeaturedColletcion = () => {
  return (
    <section className='py-16 px-4 lg:px-0' >
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-orange-50 rounded-3xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Dicover high-quality, confortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
          </p>
          <Link to="/collections/all" className='bg-black text-white px-5 py-3 rounded-lg text-lg hover:bg-gray-800'>
            Shop Now
          </Link>
        </div>

        <div className="lg:w-1/2">
          <img src={featuredImg} alt="featureImage" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
        </div>
      </div>
    </section>
  )
}

export default FeaturedColletcion