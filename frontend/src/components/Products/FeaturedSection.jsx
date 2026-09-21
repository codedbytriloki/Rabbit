import React from 'react'
import { HiOutlineArrowCircleDown, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi"

const FeaturedSection = () => {
  return (
    <section className='py-16 px-4 bg-white' >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        <article className="flex flex-col items-center group" role="group" aria-label="Free international shipping">
          <div className="p-4 rounded-full mb-4 bg-indigo-50 text-indigo-600 shadow-sm transition-transform transform group-hover:scale-105">
            <HiShoppingBag className='text-3xl' aria-hidden="true" />
          </div>
          <h3 className="tracking-tighter mb-2 text-lg font-semibold">
            FREE INTERNATIONAL SHIPPING
          </h3>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders over $100.00
          </p>
        </article>


        <article className="flex flex-col items-center group" role="group" aria-label="45 days return">
          <div className="p-4 rounded-full mb-4 bg-indigo-50 text-indigo-600 shadow-sm transition-transform transform group-hover:scale-105">
            <HiOutlineArrowCircleDown className='text-3xl' aria-hidden="true" />
          </div>
          <h3 className="tracking-tighter mb-2 text-lg font-semibold">
            45 DAYS RETURN
          </h3>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back guarantee
          </p>
        </article>


        <article className="flex flex-col items-center group" role="group" aria-label="Secure checkout">
          <div className="p-4 rounded-full mb-4 bg-indigo-50 text-indigo-600 shadow-sm transition-transform transform group-hover:scale-105">
            <HiOutlineCreditCard className='text-3xl' aria-hidden="true" />
          </div>
          <h3 className="tracking-tighter mb-2 text-lg font-semibold">
            SECURE CHECKOUT
          </h3>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secured checkout process
          </p>
        </article>
      </div>
    </section>
  )
}

export default FeaturedSection