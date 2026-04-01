// client/src/components/Navbar.jsx
import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets.js'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { toast } from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // ✅ Fix: Call API to change role
  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error.message || 'Server error')
    }
  }

  return (
    <motion.div
      initial={{y: -20, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
      text-gray-600 border-b border-borderColor relative transition-all 
      ${location.pathname === '/' ? 'bg-light' : ''}`}
    >
      {/* Logo */}
      <Link to="/" onClick={() => setOpen(false)}>
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="Logo" className="h-8" />
      </Link>

      {/* Menu Section */}
      <div
        className={`
          ${open ? 'flex' : 'hidden'} 
          sm:flex sm:flex-row sm:items-center sm:gap-6 sm:ml-auto
          flex-col w-full sm:w-auto absolute sm:static left-0 top-full bg-white sm:bg-transparent px-6 sm:px-0 py-4 sm:py-0 z-10
        `}
      >
        {/* Menu Links */}
        <div className="flex flex-col sm:flex-row gap-6">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="hover:text-black transition"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Box (Visible on lg+) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 relative sm:ml-6 mt-4 sm:mt-0">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search products"
          />
          <button
            aria-label="Search"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img src={assets.search_icon} alt="Search Icon" className="w-4" />
          </button>
        </div>

        {/* Dashboard + Login */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 sm:mt-0">
          <button
            onClick={() => (isOwner ? navigate('/owner') : changeRole())} // ✅ FIXED: call changeRole correctly
            className="cursor-pointer"
          >
            {isOwner ? 'Dashboard' : 'List cars'}
          </button>

          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden cursor-pointer ml-4"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="Menu Icon"
        />
      </button>
    </motion.div>
  )
}

export default Navbar
