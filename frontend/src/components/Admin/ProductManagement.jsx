import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import Loading from "../Loading";

const ProductManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth)
  const { products, loading, error } = useSelector((state) => state.adminProducts)

  useEffect(() => {
    dispatch(fetchAdminProducts())
  }, [dispatch])



  const handleDeleteproduct = (productId) => {
    if (window.confirm("Are you sure. You want to delete this product?")) {
      dispatch(deleteProduct(productId))
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="text-center">Error : {error}</p>
  }

  return (
    <div className="max-w-7xl mx-auto md:p-6  min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">Product Management</h2>
        <Link to="/admin/products/add" className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 md:px-4 py-2.5 rounded-lg cursor-pointer text-lg text-center" >+ Add Product</Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-800">
            <tr>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Price</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Sku</th>
              <th className="py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                    <td className="py-4 px-6 text-gray-800 font-semibold whitespace-nowrap">{product.name}</td>
                    <td className="py-4 px-6 text-gray-600">${product.price}</td>
                    <td className="py-4 px-6 text-gray-600">{product.sku}</td>
                    <td className="py-4 px-6 space-y-1 md:space-x-2 ">
                      <Link to={`/admin/products/${product._id}/edit`} className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 font-medium shadow-sm">Edit</Link>
                      <button onClick={() => handleDeleteproduct(product._id)} className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium shadow-sm">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500 font-medium">No Products found.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductManagement