import React from "react";
import { useNavigate } from "react-router-dom";
import axioInstence from "../utils/axioInstence"

function Header() {
 const navigate =  useNavigate()
   const handleLogout = async()=>{
      try {
         const response = await axioInstence.post('/auth/logout')
          console.log('the logout rasponce from backend',response);
          navigate('/user/login')
      } catch (error) {
        console.error('Logout failed',error.response?.data|| error.message)
      }
   }
  return (
    <header className="bg-gradient-to-b from-[#f5e6d3] to-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {/* Cake Icon */}
              <div className="relative w-12 h-12">
                <div className="absolute w-8 h-8 bg-[#DEB887] rounded-t-full top-1 left-2"></div>
                <div className="absolute w-10 h-3 bg-[#8B4513] bottom-1 left-1"></div>
                <div className="absolute w-6 h-2 bg-[#DEB887] bottom-3 left-3"></div>
              </div>
              {/* Brand Name */}
              <div className="ml-2">
                <span className="text-2xl font-bold text-[#8B4513]">KBS</span>
                <span className="text-2xl font-bold text-[#DEB887]">BAKES</span>
                <span className="block text-sm italic text-[#8B4513]">Cakes</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Our Cakes', 'Custom Orders', 'About'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#8B4513] hover:text-[#DEB887] transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button className="relative group">
              <div className="p-2 rounded-full hover:bg-[#f5e6d3] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B4513] group-hover:text-[#DEB887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#8B4513] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
              </div>
            </button>

            {/* User Button */}
            <button className="p-2 rounded-full hover:bg-[#f5e6d3] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B4513] hover:text-[#DEB887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
               {/* Logout Button */}
               <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#DEB887] transition-colors duration-300 font-medium"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button   className="md:hidden p-2 rounded-full hover:bg-[#f5e6d3] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B4513] hover:text-[#DEB887]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Hidden by default */}
        <div className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Home', 'Our Cakes', 'Custom Orders', 'About'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block px-3 py-2 rounded-md text-[#8B4513] hover:bg-[#f5e6d3] hover:text-[#DEB887] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

