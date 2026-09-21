import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
// import Stylishacket from '../../assets/Stylish Jacket.jpeg'
// import CasualShirt from '../../assets/Casual Shirt.jpeg'
// import ElegantDress from '../../assets/Elegant Dress.jpeg'
// import TrendySneakers from '../../assets/Trendy Sneakers.jpeg'
// import FormalPants from '../../assets/Formal Pants.jpeg'
// import ClassicPlaetedTrousers from '../../assets/Classic Plaeted Trousers.jpeg'
// import VNeckWrapTop from '../../assets/V-Neck Wrap Top.jpeg'
// import RuffleSleeveBlouse from '../../assets/Ruffle Sleeve Blouse.jpeg'
import axios from 'axios'

const NewArrivals = () => {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const [newArrivals, setNewArrivals] = useState([])

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/new-arrivals`)
        setNewArrivals(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNewArrivals()
  }, [])

  // const newArrivals = [
  //   {
  //     _id: 1,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: Stylishacket,
  //         altText: "Stylish Jacket"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 2,
  //     name: "Casual Shirt",
  //     price: 99,
  //     images: [
  //       {
  //         url: CasualShirt,
  //         altText: "Casual Shirt"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 3,
  //     name: "Formal Pants",
  //     price: 70,
  //     images: [
  //       {
  //         url: FormalPants,
  //         altText: "Formal Pants"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 4,
  //     name: "Trendy Sneakers",
  //     price: 55,
  //     images: [
  //       {
  //         url: TrendySneakers,
  //         altText: "Trendy Sneakers"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 5,
  //     name: "Elegant Dress",
  //     price: 45,
  //     images: [
  //       {
  //         url: ElegantDress,
  //         altText: "Elegant Dress"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 6,
  //     name: "Classic Plaeted Trousers",
  //     price: 99,
  //     images: [
  //       {
  //         url: ClassicPlaetedTrousers,
  //         altText: "Classic Plaeted Trousers"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 7,
  //     name: "V-Neck Wrap Top",
  //     price: 120,
  //     images: [
  //       {
  //         url: VNeckWrapTop,
  //         altText: "V-Neck Wrap Top"
  //       }
  //     ]
  //   },
  //   {
  //     _id: 8,
  //     name: "Ruffle Sleeve Blouse",
  //     price: 50,
  //     images: [
  //       {
  //         url: RuffleSleeveBlouse,
  //         altText: "Ruffle Sleeve Blouse"
  //       }
  //     ]
  //   },

  // ]

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  //  scroll container
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
  }

  // update scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth

      setCanScrollLeft(leftScroll > 0)
      setCanScrollRight(rightScrollable)

    }

    /* console.log({
       scrollLeft: container.scrollLeft,
       clientWidth: container.clientWidth,
       containerScrollWidth: container.scrollWidth,
       offsetLeft: scrollRef.current.offsetLeft
     });*/
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons)
    }
    updateScrollButtons()
    return () => container.removeEventListener("scroll", updateScrollButtons)
  }, [newArrivals])

  return (
    <section className='py-16 px-4 lg:px-0 '>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to keep your wardrode on the cutting edge of fashion.
        </p>
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border  ${canScrollLeft ? "bg-white text-black" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}>
            <FiChevronLeft className='text-2xl' />
          </button>
          <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`p-2 rounded border  ${canScrollRight ? "bg-white text-black" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}>
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
      </div>

      <div ref={scrollRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave} className={`container mx-auto overflow-x-scroll flex space-x-6 relative container-class ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
            <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} className='w-full h-[500px] object-cover rounded-lg' draggable="false" />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className='block'>
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals