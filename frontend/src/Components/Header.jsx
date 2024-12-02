import React, { useState, useEffect } from 'react';
import { Menu, X,User, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const images = [
    '/src/assets/images/banner1.jpg',
    '/src/assets/images/banner2.jpg',
    '/src/assets/images/banner3.jpg',
    '/src/assets/images/banner4.jpg',
    '/src/assets/images/banner5.jpg',
  ]; // Array of banner images

 
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup
  }, [images.length]);

  return (
    <header className="relative">
      {/* Image Wrapper */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-[4s] ease-in-out ${
              index === currentImage ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className={`relative z-10 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <a href="/" className="text-white text-3xl font-bold drop-shadow-lg">
                KBS BAKES
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* User Profile Icon */}
              <a href="/profile" className="text-white hover:text-[#d8cbc4]">
                <User className="h-6 w-6" />
              </a>

              {/* Cart Icon */}
              <a href="/cart" className="text-white hover:text-[#d8cbc4]">
                <ShoppingCart className="h-6 w-6" />
              </a>

           
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d8cbc4] hover:bg-[#5b3e31] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
             </div>
           </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#3d2516] bg-opacity-90">
              <NavLink href="/" mobile>Home</NavLink>
              <NavLink href="/about" mobile>About</NavLink>
              <NavLink href="/products" mobile>Products</NavLink>
              <NavLink href="/contact" mobile>Contact</NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="relative z-10 flex items-center justify-center h-[calc(100vh-6rem)] text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up">
            Indulge in Sweet Perfection
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300">
            Handcrafted cakes for every occasion
          </p>
          <button className="bg-[#8b6c5c] text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#765341] transition duration-300 shadow-lg animate-fade-in-up animation-delay-600">
            Explore Our Cakes
          </button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children, mobile = false }) => (
  <a
    href={href}
    className={`${
      mobile
        ? 'block px-3 py-2 rounded-md text-base font-medium'
        : 'px-3 py-2 rounded-md text-sm font-medium'
    } text-white hover:bg-[#5b3e31] hover:text-[#d8cbc4] transition duration-300 drop-shadow-lg`}
  >
    {children}
  </a>
);

export default Header;

