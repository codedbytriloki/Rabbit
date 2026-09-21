import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice'
import axios from 'axios'
import Loading from '../Loading'
import { toast } from 'sonner'

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const [load, setLoad] = useState(false)
  const [checkoutId, setCheckoutId] = useState(null)
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const navigate = useNavigate()
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }

  }, [cart, navigate])

  useEffect(() => {
    if (window.Razorpay) {
      setIsRazorpayLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => setIsRazorpayLoaded(true)
    script.onerror = () => setIsRazorpayLoaded(false)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    setLoad(true)
    if(!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country || !shippingAddress.phone){
      setLoad(false)
      return toast.error("Please fill all the fields")
    }
    if(shippingAddress.phone.length < 10 || shippingAddress.phone.length > 15){
      setLoad(false)
      return toast.error("Please enter a valid phone number")
    }

    if (cart && cart.products.length > 0) {
      const res = await dispatch(createCheckout({
        checkItems: cart.products,
        shippingAddress,
        paymentMethod: "Razorpay",
        totalPrice: cart.totalPrice,
      })).unwrap();
      setLoad(false)
      if (res?._id) {
        setCheckoutId(res._id)
      }
    }
  }

  const handlePayment = async () => {

    try {
      setLoad(true)
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/checkout/${checkoutId}/pay`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      })

      const orderId = response.data.orderId;
      const razorOrder = response.data.razorOrder;
      handleVerify(orderId, razorOrder)
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerify = async (orderId, razorOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorOrder.amount,
      currency: "INR",
      name: "Rabbit",
      description: "E-commerce Website",
      order_id: razorOrder.id,
      handler: async function (res) {
        try {
          setLoad(true)
          await axios.put(`${import.meta.env.VITE_SERVER_URL}/checkout/${orderId}/verify`, {
            paymentDetails: {
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature
            }
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
          })
          await axios.post(`${import.meta.env.VITE_SERVER_URL}/checkout/${orderId}/finalize`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
          })
          navigate("/order-confirmation")
        } catch (error) {
          console.log(error)
        }
        finally {
          setLoad(false)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p className="">{error}</p>;
  }
  if(cart?.products?.length === 0 || !cart?.products) {
    return <p className="">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter" >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout} className="">
          <h3 className="text-lg mb-4">
            Contact Details
          </h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input type="email" value={user.email} className="w-full p-2 border rounded" disabled />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="block text-gray-700">First Name</label>
              <input type="text" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
            <div className="">
              <label htmlFor="" className="block text-gray-700">Last Name</label>
              <input type="text" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>
              Address
            </label>
            <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="block text-gray-700">City</label>
              <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
            <div className="">
              <label htmlFor="" className="block text-gray-700">Postal Code</label>
              <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>
              Country
            </label>
            <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>
              Phone Number
            </label>
            <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} className="w-full p-2 border rounded" required />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button className="w-full bg-black text-white py-3 rounded disabled:cursor-not-allowed disabled:opacity-60" type='submit' disabled={load} >
                {load ? "Creating checkout..." : "Continue to Payment"}
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Razorpay</h3>
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={!isRazorpayLoaded || load}
                  className="w-full rounded bg-[#3399cc] py-3 font-semibold text-white transition hover:bg-[#247da8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {!isRazorpayLoaded ? "Loading Razorpay..." : `Pay ₹${Math.round(cart.totalPrice * 99).toLocaleString()}`}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart?.products?.map((prodeuct, index) => (
            <div key={index} className="flex items-start justify-between py-2 border-b">
              <div className="flex items-start">
                <img src={prodeuct.image} alt={prodeuct.name} className='w-20 h-24 object-cover mr-4' />
                <div className="">
                  <h3 className="text-md">{prodeuct.name}</h3>
                  <p className="text-gray-500">Size: {prodeuct.size}</p>
                  <p className="text-gray-500">Color: {prodeuct.color}</p>
                  <p className="text-gray-500">Quantity: {prodeuct.quantity} × {prodeuct.price?.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xl">${((prodeuct.price || 0) * (prodeuct.quantity || 0)).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p className="">Subtotal</p>
          <p className="">${cart?.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p className="">Shipping</p>
          <p className="">Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p className="">Total</p>
          <p className="">${cart?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>

  )
}

export default Checkout