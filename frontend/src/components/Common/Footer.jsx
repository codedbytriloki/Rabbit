import { useState } from 'react'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import axios from 'axios'
import { toast } from "sonner"

const Footer = () => {
  const shopLinks = ['Men', 'Women', 'Top Wear', 'Bottom Wear']
  const [email, setEmail] = useState('')
  const supportLinks = ['Contact Us', 'Shipping & Returns', 'FAQs', 'Size Guide']

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/subscriber`, { email })
      toast.success("Subscribed successfully")
      setEmail('')
    } catch (error) {
      toast.error( error.response?.data?.message || "Failed to Subscribe")
      console.log(error);
    }
  }

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50 text-gray-700">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-0">
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="/" className="text-2xl font-medium tracking-tight text-gray-950">
            Rabbit
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
            Everyday essentials made for your individual style.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.facebook.com" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://www.pinterest.com" aria-label="Pinterest" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              <FaPinterestP className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Shop</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {shopLinks.map((link) => (
              <li key={link}><a href="#" className="transition hover:text-rabbit-orange">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Help</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {supportLinks.map((link) => (
              <li key={link}><a href="#" className="transition hover:text-rabbit-orange">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Stay in the loop</h2>
          <p className="mt-4 text-sm leading-6 text-gray-500">Get updates on new drops and special offers.</p>
          <form onSubmit={handleSubmit} className="mt-4 flex max-w-md border-b border-gray-400 focus-within:border-gray-950">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              name="email"
              value={email}
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              required onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="px-2 text-sm font-semibold text-gray-950 transition hover:text-rabbit-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
              Join
            </button>
          </form>
          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <a href="mailto:hello@rabbit.com" className="flex items-center gap-2 hover:text-gray-950"><HiOutlineEnvelope className="h-4 w-4" />hello@rabbit.com</a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-gray-950"><HiOutlinePhone className="h-4 w-4" />+1 234 567 890</a>
            <p className="flex items-start gap-2"><HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0" />New York, NY</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto flex flex-col gap-2 px-6 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-0">
          <p>&copy; {new Date().getFullYear()} Rabbit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-950">Privacy</a>
            <a href="#" className="hover:text-gray-950">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer