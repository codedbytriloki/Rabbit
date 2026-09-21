import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";



const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout)

  // clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart())
      localStorage.removeItem("cart")
    } else {
      navigate("/my-orders")
    }
  }, [checkout, dispatch, navigate])

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center  mb-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>

      {
        checkout && (<div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-10">
            <div className="">
              <h2 className="text-sm md:text-xl  font-semibold">Order ID: {checkout._id}</h2>
              <p className="text-gray-500">
                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            
            </div>
          </div>
          {/* order items */}
          <div className="mb-9">
            {
              checkout?.checkItems?.map((item) => (
                <div key={item.productId} className="flex items-center mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="">
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color} | {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md">${item.price} X {item.quantity}</p>
                    <p className="text-sm text-gray-500"></p>
                  </div>
                </div>
              ))
            }
          </div>
            <div className="border-1 border-gray-300 border-top m-2"></div>
            <div className="flex items-end justify-end">
              <p className="text-lg font-semibold ">Total Price :</p>
              <p className="text-lg font-bold text-emerald-700">
                ${checkout?.totalPrice?.toFixed(2)}
              </p>
            </div>

       

        </div>)
      }
    </div >
  )
}

export default OrderConfirmationPage