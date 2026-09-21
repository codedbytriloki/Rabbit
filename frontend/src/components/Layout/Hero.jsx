import heroImg1 from "../../assets/hero-section.jpeg"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative" aria-labelledby="hero-heading">
      <img src={heroImg1} alt="Models showcasing vacation outfits" loading="lazy" className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="text-center text-white p-6">
          <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link to="/collections/all" aria-label="Shop vacation collection" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg inline-block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white">Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero