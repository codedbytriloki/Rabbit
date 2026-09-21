import { useDispatch, useSelector } from "react-redux"
import Loading from "../Loading"
import { FaArrowLeft, FaCheckCircle, FaTruck, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa"
import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { orderDetail } from "../../redux/slices/adminOrdersSlice"

const AdminOrderDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedOrder, loading, error } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    if (id) {
      dispatch(orderDetail(id))
    }
  }, [dispatch, id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">Error: {error}</div>
  }

  const shippingAddress = selectedOrder?.shippingAddress || {}
  const addressText = shippingAddress.address && shippingAddress.city && shippingAddress.country && shippingAddress.postalCode
    ? `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country} ${shippingAddress.postalCode}`
    : "N/A"

  const orderItems = selectedOrder?.orderItems || []
  const subtotal = orderItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0)

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Link to="/admin/orders" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600">
            <FaArrowLeft size={12} /> Back to orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        </div>
        {selectedOrder && (
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${selectedOrder.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {selectedOrder.status || (selectedOrder.isDelivered ? "Delivered" : "Processing")}
          </span>
        )}
      </div>

      {!selectedOrder ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
          No order details found.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Order ID</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">#{selectedOrder._id}</h2>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="font-medium text-gray-800">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  <FaCheckCircle className="text-green-600" /> Payment
                </div>
                <p className="text-gray-700">Method: {selectedOrder.paymentMethod || "N/A"}</p>
                <p className="text-gray-700">Status: {selectedOrder.isPaid ? "Paid" : "Unpaid"}</p>
                <p className="text-gray-700">Paid at: {selectedOrder.paidAt ? new Date(selectedOrder.paidAt).toLocaleDateString() : "N/A"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  <FaTruck className="text-blue-600" /> Delivery
                </div>
                <p className="text-gray-700">Status: {selectedOrder.isDelivered ? "Delivered" : "Pending"}</p>
                <p className="text-gray-700">Delivery date: {selectedOrder.deliveredAt ? new Date(selectedOrder.deliveredAt).toLocaleDateString() : "N/A"}</p>
                <p className="text-gray-700">Order status: {selectedOrder.status || "Processing"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  <FaMoneyBillWave className="text-purple-600" /> Total
                </div>
                <p className="text-2xl font-bold text-gray-900">${Number(selectedOrder.totalPrice || 0).toFixed(2)}</p>
                <p className="text-gray-700">Items: {orderItems.length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <FaUser className="text-gray-600" /> Customer Information
              </div>
              <div className="space-y-3 text-gray-700">
                  <p><span className="font-medium text-gray-900">Name:</span> {shippingAddress?.firstName || selectedOrder.user?.name} {shippingAddress?.lastName && shippingAddress?.lastName }</p>
                <p><span className="font-medium text-gray-900">Email:</span> {selectedOrder.user?.email || "N/A"}</p>
                <p><span className="font-medium text-gray-900">Phone :</span> {shippingAddress?.phone || "N/A"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <FaMapMarkerAlt className="text-gray-600" /> Delivery Details
              </div>
              <div className="space-y-3 text-gray-700">
                <p><span className="font-medium text-gray-900">Address:</span> {addressText}</p>
                <p><span className="font-medium text-gray-900">City:</span> {shippingAddress.city || "N/A"}</p>
                <p><span className="font-medium text-gray-900">Postal Code:</span> {shippingAddress.postalCode || "N/A"}</p>
                <p><span className="font-medium text-gray-900">Country:</span> {shippingAddress.country || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Products</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Color</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Size</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Qty</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderItems.map((item) => (
                    <tr key={`${item.productId}-${item.name}-${item.color || "default"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                          <Link to={`/product/${item.productId}`} className="font-medium text-blue-600 hover:underline">
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3">${Number(item.price || 0).toFixed(2)}</td>
                      <td className="px-4 py-3">{item.color || "N/A"}</td>
                      <td className="px-4 py-3">{item.size || "N/A"}</td>
                      <td className="px-4 py-3">{item.quantity || 0}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        ${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-gray-700">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${Number(selectedOrder.totalPrice || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrderDetails