import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '../redux/slices/orderSlice'
import Loading from '../components/Loading'

const MyOrdersPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch])

  const handleRowCLick = (id) => {
    navigate(`/order/${id}`)
  }

  if(loading){
    return <Loading/>;
  }
  if(error){
    return <p className="text-center">{error}</p>
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        {/* Desktop/table view */}
        <div className="hidden md:block">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-2 px-4 sm:py-3">Image</th>
                <th className="py-2 px-4 sm:py-3">Order ID</th>
                <th className="py-2 px-4 sm:py-3">Created</th>
                <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                <th className="py-2 px-4 sm:py-3">Items</th>
                <th className="py-2 px-4 sm:py-3">Price</th>
                <th className="py-2 px-4 sm:py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const firstItem = order.orderItems?.[0] || {};

                  return (
                    <tr key={order._id} className="border-b hover:bg-gray-50" onClick={() => handleRowCLick(order._id)}  >
                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        <img
                          src={firstItem.image}
                          alt={firstItem.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {new Date(order.createdAt).toLocaleDateString()}{' '}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}
                      </td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4">{order.orderItems?.length || 0}</td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4">${order.totalPrice}</td>
                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        <span
                          className={`${order.isPaid ? 'bg-green-100 text-gray-700' : 'bg-red-100 text-red-700'} px-2 py-1 rounded-sm text-xs sm:text-sm font-medium`}
                        >
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                    You have no orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile/card view */}
        <div className="md:hidden p-2 space-y-3">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg p-3 shadow-sm border">
                <div className="flex items-center space-x-3">
                  <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-14 h-14 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">Order #{order._id}</div>
                        <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${order.totalPrice}</div>
                        <div className={`mt-1 text-xs ${order.isPaid ? 'text-green-700' : 'text-red-600'}`}>{order.isPaid ? 'Paid' : 'Pending'}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Items: {order.orderItems.length}</div>
                    <div className="mt-1 text-sm text-gray-600">{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">You have no orders</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyOrdersPage
