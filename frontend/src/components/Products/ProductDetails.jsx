import { useEffect, useState } from "react"
import { toast } from "sonner"
import ProductGrid from "./ProductGrid"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productSlice"
import { addToCart } from "../../redux/slices/cartSlice"
import Loading from "../Loading"
import { Star } from "lucide-react"

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProduct } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth)
  const [mainImage, setMainImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      setSelectedSize("")
      setSelectedColor("")
      setQuantity(1)
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }))
    }
  }, [dispatch, productFetchId])


  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url)
    }
  }, [selectedProduct])

  const handleQuantityChange = (action) => {

    if(selectedProduct && selectedProduct.countInStock === 0) {
      toast.error("Product is out of stock.", {
        duration: 1000,
      })
      return;
    }

    if(action === "plus" && quantity >= selectedProduct.countInStock) {
      toast.error(`Cannot add more than ${selectedProduct.countInStock} items.`, {
        duration: 1000,
      })
      return;
    }

    if (action === "plus") setQuantity((prev) => Math.min(prev + 1, selectedProduct.countInStock))
    if (action === "minus") setQuantity((prev) => Math.max(1, prev - 1))
  }

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      })
      return;
    }
    setIsButtonDisabled(true)
    await dispatch(addToCart({ productId: productFetchId, quantity, size: selectedSize, color: selectedColor, guestId, userId: user?._id })).then(() => {
      toast.success("Product added to cart!", { duration: 1000 })
    })
      .finally(() => {
        setIsButtonDisabled(false)
      })
  };


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="">Error : {error}</p>
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* left thumbnail */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((image) => (
                <button
                  key={image.url}
                  onClick={() => setMainImage(image?.url)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMainImage(image?.url); } }}
                  aria-pressed={mainImage === image?.url}
                  aria-label={`View ${image.altText}`}
                  className={`p-0 bg-transparent border-0 cursor-pointer`}
                >
                  <img loading="lazy" src={image?.url} alt={image?.altText} className={`w-20 h-20 object-cover rounded-lg ${mainImage === image?.url ? "border-black" : "border-gray-300"}`} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                {mainImage && (
                  <img loading="lazy" src={mainImage} alt={selectedProduct.images.find(i => i.url === mainImage)?.altText || selectedProduct?.images[0]?.altText} className="w-full h-auto md:h-[700px] object-cover rounded-lg" />
                )}
              </div>
            </div>

            {/* Mobile thumbnail */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct?.images?.map((image) => (
                <button
                  key={image.url}
                  onClick={() => setMainImage(image?.url)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMainImage(image?.url); } }}
                  aria-pressed={mainImage === image?.url}
                  aria-label={`View ${image.altText}`}
                  className={`p-0 bg-transparent border-0 cursor-pointer`}
                >
                  <img loading="lazy" src={image?.url} alt={image?.altText} className={`w-20 h-20 object-cover rounded-lg ${mainImage === image?.url ? "border-black" : "border-gray-300"}`} />
                </button>
              ))}
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
              <div className="flex gap-3">
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {fmt.format(selectedProduct.price)}
                </p>
                <p className="text-xl text-gray-500 mb-2">
                  {fmt.format(selectedProduct.discountPrice)}
                </p>
              </div>
              <div className="flex items-center gap-2 my-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} fill={star <= Math.round(selectedProduct.rating) ? "#facc15" : "none"} color={star <= Math.round(selectedProduct.rating) ? "#facc15" : "#d1d5db"} />
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  {selectedProduct.rating} ({selectedProduct.numReviews})
                </span>

              </div>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((col) => (
                    <button
                      onClick={() => setSelectedColor(col)}
                      key={col}
                      className={`w-8 h-8 rounded-full border ${selectedColor === col ? "ring-2 ring-black" : "border-gray-300"} focus:outline-none`}
                      style={{ backgroundColor: col.toLowerCase().replace(/ /g, '-') }}
                      aria-label={`Select color ${col}`}
                      title={col}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button onClick={() => setSelectedSize(size)} key={size} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""} focus:outline-none focus:ring-2 focus:ring-indigo-500`} aria-pressed={selectedSize === size}>{size}</button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button onClick={() => handleQuantityChange("minus")} className="px-2 py-1 bg-gray-200 rounded text-lg" aria-label="Decrease quantity">
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button onClick={() => handleQuantityChange("plus")} className="px-2 py-1 bg-gray-200 rounded text-lg" aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </div>
              <button onClick={handleAddToCart} disabled={isButtonDisabled || selectedProduct.countInStock === 0} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 disabled:opacity-50 ${isButtonDisabled ? "cursor-not-allowed" : "hover:bg-gray-900"}`}>{isButtonDisabled ? "Adding..." : "ADD TO CART"}</button>
              {selectedProduct.countInStock === 0 && (
                <p className="text-red-500 text-sm">Product is out of stock.</p>
              )}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
            <ProductGrid products={similarProduct} loading={loading} error={error} />
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetails
