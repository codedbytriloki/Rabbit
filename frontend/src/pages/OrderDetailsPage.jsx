import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import { PencilLine, Star } from "lucide-react"
import Loading from "../components/Loading";
import { toast } from "sonner";
import axios from "axios";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order)
  const [showReview, setShowReview] = useState(false)
  const [rank, setRank] = useState(0)
  const [err, setErr] = useState(null)
  // review
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("");
  const [reviewText, setReviewText] = useState("")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id))
    }
  }, [dispatch, id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="text-center">{error}</p>
  }

  const productDetail = (productId, productName) => {
    setProductId(productId)
    setProductName(productName)
    setShowReview(true)
  }

  const handleReviewSubmit = async () => {
    setErr(null)
    if (!reviewText.trim()) {
      setErr("Please enter a review before submitting.")
      return;
    }
    if (rank === 0) {
      setErr("Please select a rating before submitting your review.")
      return;
    }

    try {
      setLoad(true)
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/products/review/${productId}`, { ranking: rank, comment: reviewText }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      });
      setRank("")
      setErr("")
      setReviewText("")
      setProductName("")
      setProductId("")
      setShowReview(false)
    } catch {
      toast.error("Failed to add review")
    } finally {
      setLoad(false)
    }
  }

  const orderItems = orderDetails?.orderItems || []
  const shippingAddress = orderDetails?.shippingAddress || {}
  const addressText = shippingAddress.address && shippingAddress.city && shippingAddress.country && shippingAddress.postalCode
    ? ` ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country} ${shippingAddress.postalCode}`
    : 'N/A'

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6" >
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p className="">No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="">
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col  items-start sm:items-end mt-4 sm:mt-0">
              <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isPaid ? "Approved" : "Pending"}</span>

            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <div className="">
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p className="">Payment Method: {orderDetails.paymentMethod || 'N/A'}</p>
              <p className="">Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                <p className="">Dilevery Status: <span className={`${orderDetails.status === "Delivered" ? "bg-green-100 text-green-700" : orderDetails.status === "Shipped" ? "bg-blue-100 text-blue-700" : orderDetails.status === "Pending"  ? "bg-yellow-100 text-yellow-700" : orderDetails.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700" } px-3 py-1 rounded-sm text-sm font-medium mb-2`}>{orderDetails.status}</span></p>

            </div>
            <div className="">
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p className="">Shipping Method: {'Standard'}</p>
              <p className="">Address: {addressText}</p>
            </div>
          </div>
          {/* product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-200  ">
                <tr className="">
                  <th className="py-2 px-4 text-start">Name</th>
                  <th className="py-2 px-4 text-start">Unit Price</th>
                  <th className="py-2 px-4 text-start">Quantity</th>
                  <th className="py-2 px-4 text-start">Total</th>
                  <th className="py-2 px-4 text-start">Review</th>
                </tr>
              </thead>
              <tbody className="">
                {orderItems.map((item) => (
                  <tr key={item.productId} className="border-b" >
                    <td className="py-2 px-4 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                      <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline" >{item.name}</Link>
                    </td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.price * item.quantity}</td>
                    <td className={`py-2 px-4 ${orderDetails.isDelivered === true ? "cursor-pointer" : "cursor-not-allowed"} ${orderDetails.isDelivered === true ? "" : "opacity-50"}`} onClick={() => orderDetails.isDelivered === true ? productDetail(item.productId, item.name) : null} >
                      <PencilLine size={22} color="blue"  />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/my-orders" className="text-blue-500 hover:underline">Back to My Orders</Link>
        </div>
      )}

      {
        showReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
              <button
                type="button"
                onClick={() => setShowReview(false)}
                aria-label="Close review dialog"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                &times;
              </button>

              <div className="pr-8">
                <p className="text-sm font-medium uppercase tracking-wider text-blue-600">Share your experience</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">Write a review</h2>
                <p className="mt-2 text-sm text-gray-500">Your feedback helps other shoppers make better choices.</p>
              </div>
              <p className="mt-2 font-semibold text-gray-900">{productName || "Classic Check Shirt"}</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900">Your rating</p>
                <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Product rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRank(star)}
                      aria-label={`Rate ${star} out of 5`}
                      aria-pressed={star <= rank}
                      className="rounded-md p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <Star size={27} fill={star <= rank ? "#facc15" : "transparent"} color={star <= rank ? "#facc15" : "#d1d5db"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="review" className="text-sm font-semibold text-gray-900">Your review</label>
                <textarea
                  id="review"
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you liked about this product..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
              <button onClick={handleReviewSubmit} type="button" disabled={load} className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60">
                Submit review
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default OrderDetailsPage