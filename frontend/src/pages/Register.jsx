import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import registerImg from '../assets/register.jpeg'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {

  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user, guestId } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/"
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        })
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/")
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email")
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await dispatch(registerUser({ name, email, password })).unwrap()
    } catch (error) {
      console.log(error);
      setError(error?.message || "Failed to register. Please try again.")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex' >
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">
            Enter your Details and Register
          </p>
          {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input id="name" type="text" value={name} name='name' onChange={(e) => setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your name' required aria-required="true" />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input id="email" type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your email address' required aria-required="true" />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input id="password" type={showPassword ? "text" : "password"} value={password} name='password' onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your password' required aria-required="true" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button type='submit' disabled={loading} className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60">
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Already, I have an account? <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>Login</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={registerImg} alt="Register" className='h-[750px] w-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Register