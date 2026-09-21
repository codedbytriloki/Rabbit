import React from 'react'
import { Link } from "react-router-dom"

const ProductGrid = ({ products, loading, error }) => {
  if(loading){
    return <p className="">Loading ...</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' >
      {
        products?.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className='block' >
            <div className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow transform hover:-translate-y-1">
              <div className="w-full h-72 md:h-96 mb-4 overflow-hidden rounded-lg">
                <img src={product?.images?.[0]?.url} alt={product?.images?.[0]?.altText || product?.name} loading="lazy" className='w-full h-full object-cover' />
              </div>
              <h3 className="text-sm mb-2 truncate" title={product.name}>{product.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price || 0))}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ProductGrid