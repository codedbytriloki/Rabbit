import { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FIlterSidebar from '../components/Products/FIlterSidebar'
import SortOptions from '../components/Products/SortOptions'
import ProductGrid from '../components/Products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByFilters } from '../redux/slices/productSlice'
import Loading from '../components/Loading'

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products)
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null)
  const [isSidebar, setIsSidebar] = useState(false)

  useEffect(() => {
    dispatch(fetchProductByFilters({
      collections: collection,
      ...queryParams
    }))
  }, [dispatch, collection, searchParams])


  const toggleSidebar = () => {
    setIsSidebar((prev) => !prev)
  }

  const handleClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebar(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide)
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide)
    }
  }, [])



  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col lg:flex-row' >
      {/* Mobile */}
      <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2' />
      </button>
      {/* sidebar */}
      <div ref={sidebarRef} className={`${isSidebar ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FIlterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* sort */}
        <SortOptions />

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default CollectionPage