import menscollectionImg from '../../assets/mens-collection.jpeg'
import womencollectionImg from '../../assets/women-collection.jpeg'
import { Link } from 'react-router-dom'


const GenderCollection = () => {
  return (
    <section className='py-16 px-6 lg:px-0' aria-labelledby="gender-collections">
      <h2 id="gender-collections" className="sr-only">Gender Collections</h2>
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1 rounded-md overflow-hidden">
          <img src={womencollectionImg} alt="Model wearing items from the women's collection" loading="lazy" className='w-full h-64 md:h-96 lg:h-[700px] object-cover' />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 p-4 rounded shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h3>
            <Link to="/collections/all?gender=Women" className='inline-block mt-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500' aria-label="Shop Women's Collection">Shop Now</Link>
          </div>
        </div>
        <div className="relative flex-1 rounded-md overflow-hidden">
          <img src={menscollectionImg} alt="Model wearing items from the men's collection" loading="lazy" className='w-full h-64 md:h-96 lg:h-[700px] object-cover' />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 p-4 rounded shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h3>
            <Link to="/collections/all?gender=Men" className='inline-block mt-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500' aria-label="Shop Men's Collection">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GenderCollection