import Hero from "../components/Layout/Hero"
import GenderCollection from "../components/Products/GenderCollection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"
import FeaturedColletcion from "../components/Products/FeaturedColletcion"
import FeaturedSection from "../components/Products/FeaturedSection"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchProductByFilters } from "../redux/slices/productSlice"
import axios from "axios"
import { useState } from "react"


const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState()

  useEffect(() => {
    // fetch products for a specific collections
    dispatch(fetchProductByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8,
    }))

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {
        bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (<p className="text-center">Loading best seller product ...</p>)
      }

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Bottom Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedColletcion />
      <FeaturedSection />
    </div>
  )
}

export default Home