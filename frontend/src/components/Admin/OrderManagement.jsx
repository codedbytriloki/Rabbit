import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrdersStatus } from "../../redux/slices/adminOrdersSlice";
import Loading from "../Loading";

const OrderManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth)
  const { orders, loading, error } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    }
    if (user?.role === "admin") {
      dispatch(fetchAllOrders())
    }
  }, [dispatch, user, navigate])


  const handleStatusChange = async (orderId, status) => {
    await dispatch(updateOrdersStatus({ id: orderId, status }))
  };

  if (loading) {
    return <Loading />
  }
  if(error){
    return <p className="text-center">Error : {error}</p>
  }

  return (
    <div className="max-w-7xl mx-auto md:p-6" >
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">Order Management</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-800">
            <tr>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Order ID</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Customer</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Total Price</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer" >
                    <td className="py-4 px-6 text-gray-800 font-semibold whitespace-nowrap" onClick={() => navigate(`/admin/orders/${order._id}`)}>#{order._id}</td>
                    <td className="py-4 px-6 text-gray-600" onClick={() => navigate(`/admin/orders/${order._id}`)}>{order.user.name}</td>
                    <td className="py-4 px-6 text-gray-600">{order.totalPrice.toFixed(2)}</td>
                    <td className="py-4 px-6 space-y-1 md:space-x-2 ">
                      <select name="" value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 ">
                      <button onClick={() => handleStatusChange(order._id, "Delivered")} className={`inline-flex items-center px-2 py-1  md:px-2 md:py-1 lg:px-3 lg:py-2 rounded text-sm lg:text-lg font-semibold bg-green-600 text-white  *:hover:bg-green-700 transition duration-200 ${order.status === "Delivered" ? "opacity-50 cursor-not-allowed" : ""}`} disabled={order.status === "Delivered"}>
                       Mark as Delivered
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 px-6 text-center text-gray-500 font-medium">No Orders found.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagement