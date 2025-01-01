import React, { useState } from 'react'
import { User, ShoppingCart, LogOut, LogIn, Menu, X, Cake } from 'lucide-react'

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-white hover:text-[#d8cbc4] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </a>
)

export default function NavBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated)

  return (
    
      <nav className="mb-10 bg-[#3d2516] bg-opacity-80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <a href="/" className="flex items-center text-white text-3xl font-bold drop-shadow-lg">
                <Cake className="h-8 w-8 mr-2" />
                KBS BAKES
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/user/cakes">Cakes</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="relative text-white hover:text-[#d8cbc4] focus:outline-none transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 w-56 bg-white rounded-lg shadow-xl py-2 mt-2">
                    {isAuthenticated ? (     
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Welcome, John Doe!</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    ) : (
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">Welcome to KBS Bakes! Please log in to place your order.</p>
                      </div>
                    )}
                    {isAuthenticated && (
                      <a
                        href="/user/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      >
                        <User className="mr-3 h-5 w-5 text-[#8b6c5c]" />
                        Your Account 
                      </a>
                    )}                  
                    <div className="border-t border-gray-200 mt-2">
                      <button
                        onClick={toggleAuth}
                        className="block px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center w-full text-left"
                      >
                        {isAuthenticated ? (
                          <>
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                          </>
                        ) : (
                          <>
                            <LogIn className="mr-3 h-5 w-5" /> 
                            Login
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <a href="/user/cart" className="text-white hover:text-[#d8cbc4]">
                <ShoppingCart className="h-6 w-6" />
              </a>
            
              <div className="md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d8cbc4] hover:bg-[#5b3e31] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    
  )
}