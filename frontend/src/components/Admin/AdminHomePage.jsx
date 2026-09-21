import { Link } from "react-router-dom"
import { FaDollarSign, FaBox, FaClipboardList, FaArrowUp } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAdminProducts } from "../../redux/slices/adminProductSlice"
import { fetchAllOrders } from "../../redux/slices/adminOrdersSlice"
import Loading from "../Loading"


const AdminHomePage = () => {
  const dispatch = useDispatch()
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts)
  const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 md:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your store overview.</p>
        </div>

        {productsLoading || ordersLoading ? (
          <Loading />
        ) : productsError ? (
          <p className="text-center text-red-500">Error fetching products: {productsError}</p>
        ) : ordersError ? (
          <p className="text-center text-red-500">Error fetching orders: {ordersError}</p>
            ) : (
            <div className="">      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-200 text-sm font-semibold mb-2">REVENUE</h2>
                    <p className="text-4xl font-bold">${totalSales.toFixed(2)}</p>
                    <p className="text-blue-100 text-sm mt-2 flex items-center gap-1"><FaArrowUp className="text-green-300" /> 12% increase</p>
                  </div>
                  <FaDollarSign className="text-5xl opacity-20" />
                </div>
              </div>

              {/* Total Orders Card */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 shadow-lg rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-green-100 text-sm font-semibold mb-2">TOTAL ORDERS</h2>
                    <p className="text-4xl font-bold">{totalOrders}</p>
                    <Link to="/admin/orders" className="text-green-100 hover:text-white text-sm mt-2 font-medium transition-colors">
                      View Orders →
                    </Link>
                  </div>
                  <FaClipboardList className="text-5xl opacity-20" />
                </div>
              </div>

              {/* Total Products Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-purple-100 text-sm font-semibold mb-2">TOTAL PRODUCTS</h2>
                    <p className="text-4xl font-bold">{products.length}</p>
                    <Link to="/admin/products" className="text-purple-100 hover:text-white text-sm mt-2 font-medium transition-colors">
                      Manage Products →
                    </Link>
                  </div>
                  <FaBox className="text-5xl opacity-20" />
                </div>
              </div>
            </div>
                {/* Recent Orders Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-200">
                    <h2 className="text-2xl font-bold">Recent Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                          <th className="py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wider">Order ID</th>
                          <th className="py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wider">User</th>
                          <th className="py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wider">Total Price</th>
                          <th className="py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.length > 0 ?
                          (orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                              <td className="py-4 px-6 text-gray-800 font-semibold">#{order._id}</td>
                              <td className="py-4 px-6 text-gray-700">{order.user.name}</td>
                              <td className="py-4 px-6 text-gray-800 ">${order.totalPrice.toFixed(2)}</td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                                  order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                    order.status === "Cancelled" ? "bg-red-100 text-red-800" :
                                      "bg-blue-100 text-blue-800"
                                  }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))) :
                          (
                            <tr>
                              <td colSpan={4} className="py-8 px-6 text-center text-gray-500 font-medium">No recent orders found.</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div> 
          )}
        {/* Stats Cards */}
  

      
      </div>
    </div>
  )
}

export default AdminHomePage