import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  // change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
     className={`fixed w-full z-50 transition-all duration-500 ${
  scrolled
  ? "bg-white shadow-md"
  : "bg-white/90 backdrop-blur"
}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-6">

       {/* Logo */}
<Link
  to="/"
  className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent"
>
  Aioon.
</Link>



        {/* Desktop Menu */}
<div className="hidden md:flex items-center gap-8 text-gray-900">

  <Link to="/" className="hover:text-purple-400 transition">Home</Link>
  <Link to="/about" className="hover:text-purple-400 transition">About</Link>
  <a href="#" className="hover:text-purple-400 transition">Services</a>
  <a href="#" className="hover:text-purple-400 transition">Contact</a>

  {/* Get Started Button */}
  <button className="ml-4 bg-[#1E4D7B] hover:bg-[#163a5c] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition">
    Get Started
  </button>
<div className="relative">

  <button
    onClick={() => setLangOpen(!langOpen)}
    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium"
  >
     EN
    <span className="text-xs">▾</span>
  </button>

  {langOpen && (
    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg overflow-hidden">
      
      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
         English
      </button>

      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
        Arabic
      </button>

    </div>
  )}

</div>
</div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

{/* Mobile Menu */}
{open && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="md:hidden bg-black/95 text-center py-6 space-y-6"
  >
    <Link to="/" onClick={() => setOpen(false)} className="block">Home</Link>
    <Link to="/about" onClick={() => setOpen(false)} className="block">About</Link>
    <a href="#" className="block">Services</a>
    <a href="#" className="block">Contact</a>

    {/* ADD THIS PART */}
    <button className="bg-[#1E4D7B] text-white px-6 py-2 rounded-lg shadow">
      Get Started
    </button>

    <button className="block mx-auto bg-white/10 px-4 py-2 rounded-lg text-white">
      🇬🇧 EN
    </button>

  </motion.div>
)}
    </motion.nav>
  )
}

export default Navbar
