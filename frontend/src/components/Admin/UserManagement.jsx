import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";
import Loading from "../Loading";
import { toast } from "sonner"
import {  EyeIcon, EyeOffIcon } from "lucide-react"

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/")
      return
    }

    if (user?.role === "admin") {
      dispatch(fetchUsers())
    }
  }, [dispatch, user, navigate])

  const [formdata, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "customer"
  })

  const handleChange = (e) => {
    setFormData({
      ...formdata, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addUser(formdata)).unwrap()
      setFormData({
        email: "",
        name: "",
        password: "",
        role: "customer"
      })
      toast.success("User add successfully");
    } catch {
      // Keep the form values so the failed submission can be corrected.
    }
  }

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }))
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure. You want to delete this user?")) {
      dispatch(deleteUser(userId))
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (loading && users.length === 0) {
    return <Loading />
  }

  return (
    <div className="max-w-7xl mx-auto md:p-6  min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">User Management</h2>
      <div className="bg-white p-8 rounded-lg shadow-md mb-8 border-l-4 border-gray-600">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" name="name" value={formdata.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition" required />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" name="email" value={formdata.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition" required />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formdata.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition" required />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Role</label>
            <select name="role" id="" value={formdata.role} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition">
              <option value="customer" className="">Customer</option>
              <option value="admin" className="">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-lg hover:from-gray-700 hover:to-gray-800 font-semibold transition duration-200 shadow-md disabled:cursor-not-allowed disabled:opacity-60">Add User</button>
        </form>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-800">
            <tr>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Email</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Role</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ?
              (users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                  <td className="py-4 px-6 text-gray-800 font-semibold whitespace-nowrap">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <select name="" value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <button  onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium shadow-sm">Delete</button>
                  </td>
                </tr>
              ))) :
              (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500 font-medium">No user found.</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement