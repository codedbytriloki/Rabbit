import { useState } from "react"
import { FaBars } from "react-icons/fa"
import AdminSidebar from "./AdminSidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  const [isSidebar, setIsSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex md:hidden p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <button className="hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200" onClick={toggleSidebar} >
          <FaBars className="text-gray-100" size={24} />
        </button>
        <h1 className="ml-4 text-xl font-bold tracking-wide" >Admin Dashboard</h1>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebar && (
        <div className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300" onClick={toggleSidebar}>

        </div>
      )}

      <div className="flex flex-1">
        {/* sidebar */}
        <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white  fixed top-0 left-0 transform ${isSidebar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:h-screen z-20 shadow-2xl md:shadow-lg w-64 overflow-y-auto`}>
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full md:ml-64 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout