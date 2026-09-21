import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUber } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../redux/slices/authSlice"
import { clearCart } from "../../redux/slices/cartSlice"

const AdminSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    navigate("/")
  }

  return (
    <div className="p-8 flex flex-col h-screen" >
      <div className="mb-8 border-b border-gray-700 pb-6">
        <Link to="/admin" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">
          Rabbit
        </Link>
      </div>
      <h2 className="text-lg font-bold mb-8 text-gray-200 tracking-wider">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-3 flex-1">
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 shadow-lg transform scale-105" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"} >
          <FaUber className="text-lg" />
          <span className="font-medium">Users</span>
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 shadow-lg transform scale-105" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"} >
          <FaBoxOpen className="text-lg" />
          <span className="font-medium">Products</span>
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 shadow-lg transform scale-105" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"} >
          <FaClipboardList className="text-lg" />
          <span className="font-medium">Orders</span>
        </NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 shadow-lg transform scale-105" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"} >
          <FaStore className="text-lg" />
          <span className="font-medium">Shop</span>
        </NavLink>
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105" onClick={handleLogout} ><FaSignOutAlt className="text-lg" /> <span>Logout</span></button>
      </div>
    </div>
  )
}

export default AdminSidebar