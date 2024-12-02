
import React, { useState,useRef } from 'react';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Cake, AlertTriangle, Ruler, Plus, Minus } from 'lucide-react';
import 'react-medium-image-zoom/dist/styles.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isOutOfStock = false; // When stock is 0, the product is out of stock
  const isSoldOut = false;    // For cases where stock might be less than 0, marking as sold out
  const isAvailable = !isOutOfStock && !isSoldOut; // If it's not out of stock or sold out, it's available

  const imageRef = useRef(null);

  const product = {
    name: "Chocolate Delight Cake",
    price: 35.99,
    rating: 4.5,
    stock:1,
    regularPrice: 49.99,
    description: "Indulge in the rich, velvety goodness of our Chocolate Delight Cake. This decadent creation features layers of moist chocolate sponge, filled with smooth chocolate ganache, and covered in a luxurious chocolate buttercream. Perfect for chocolate lovers and special occasions!",
    ingredients: ["Chocolate sponge cake", "Chocolate ganache", "Chocolate buttercream", "Chocolate shavings"],
    sizes: ["2 kg", "1 kg", "500 kg"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    images: [
      "/src/assets/images/img4.png",
      "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+2",
      "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+3",
      "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+4"
    ]
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + product.images.length) % product.images.length);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  


  return (
    <div className="bg-gradient-to-br from-[#f3e7e0] to-[#d8cbc4] min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9">
              <div 
              className="relative rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div 
                ref={imageRef}
                className="relative w-full h-full overflow-hidden cursor-zoom-in"
                onClick={toggleZoom}
              >
                <img
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-[2.5]' : 'scale-100'
                  }`}
                  src={product.images[currentImage]}
                  alt={`${product.name} - Image ${currentImage + 1}`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    ...(isZoomed ? {
                      transform: `scale(2.5) translate(${
                        (50 - mousePosition.x) / 2.5
                      }%, ${(50 - mousePosition.y) / 2.5}%)`,
                    } : {})
                  }}
                />
                
                {isZoomed && (
                  <div 
                    className="absolute top-2 right-2 bg-white bg-opacity-75 px-3 py-1 rounded-md text-sm text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(false);
                    }}
                  >
                    Close Zoom
                  </div>
                )}
              </div>
            </div>
            
                <button
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </button>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

             {/* Stock Details Section */}
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-[#5b3e31]">
              Stock: 
              <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} items available` : 'Out of Stock'}
              </span>
            </h3>
          </div>

              
              <div className="mt-6 flex justify-center space-x-4 overflow-x-auto pb-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === index ? 'border-[#8b6c5c] ring-2 ring-[#8b6c5c] ring-opacity-50' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[#8b6c5c] transition duration-300 shadow-md`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={image} alt={`${product.name} - Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 p-6 lg:p-8 space-y-6">
              <h1 className="text-4xl font-extrabold text-[#3d2516] leading-tight">{product.name}</h1>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-[#5b3e31] font-medium">{product.rating} out of 5 stars</span>
              </div>

              <div className="flex items-center space-x-4 mt-2">
               <p className="text-2xl font-bold text-[#8b6c5c]">${product.price}</p>
               <p className="text-2xl font-bold text-[#d8d8d8] line-through">${product.regularPrice}</p>
              </div>
              <p className="text-lg text-[#5b3e31] leading-relaxed">{product.description}</p>
              <div>
                <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
                  <Cake className="mr-2" size={24} />
                  Ingredients
                </h3>
                <ul className="list-none text-[#5b3e31] grid grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#8b6c5c] rounded-full mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
                  <AlertTriangle className="mr-2" size={24} />
                  Allergens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <span key={index} className="px-3 py-1 bg-[#bca89f] text-[#3d2516] rounded-full text-sm font-bold uppercase tracking-wide">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
                  <Ruler className="mr-2" size={24} />
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <button 
                      key={index} 
                      className="px-4 py-2 border-2 border-[#8b6c5c] rounded-md text-[#5b3e31] font-bold hover:bg-[#8b6c5c] hover:text-white transition duration-300 transform hover:scale-105 shadow-md"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center border-2 border-[#8b6c5c] rounded-md shadow-md">
                  <button 
                    className="px-3 py-2 text-[#5b3e31] hover:bg-[#8b6c5c] hover:text-white transition duration-300 text-xl font-bold"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 text-[#3d2516] font-bold text-xl">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-[#5b3e31] hover:bg-[#8b6c5c] hover:text-white transition duration-300 text-xl font-bold"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

                    <div className="availability mt-4">
                {isSoldOut && (
                  <p className="text-red-500 font-bold text-xl">Sold Out</p>
                )}
                {isOutOfStock && !isSoldOut && (
                  <p className="text-yellow-500 font-bold text-xl">Out of Stock</p>
                )}
                {isAvailable && (
                  <p className="text-green-500 font-bold text-xl">Available Now</p>
                )}
                  </div>

                     <div className="flex-shrink-0 flex gap-3">
                    <button className=" sm:w-auto px-1 py-3 bg-[#8b6c5c] text-white rounded-md hover:bg-[#765341] transition duration-300 flex items-center justify-center text-lg font-bold uppercase tracking-wide transform hover:scale-105 shadow-md">
                       
                      Buy Now
                    </button>    
                     <button className=" sm:w-auto px-1 py-3 bg-[#8b6c5c] text-white rounded-md hover:bg-[#765341] transition duration-300 flex items-center justify-center text-lg font-bold uppercase tracking-wide transform hover:scale-105 shadow-md">
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Cart
                 </button>    
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;



// import { useState } from "react";
// import { Heart, ChevronLeft, ChevronRight, Star, Cake, AlertTriangle, Box } from "lucide-react";

// const ProductDetails = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const product = {
//     name: "Chocolate Delight Cake",
//     price: 35.99,
//     regularPrice: 49.99,
//     rating: 4.5,
//     description: "Indulge in the rich, velvety goodness of our Chocolate Delight Cake. This decadent creation features layers of moist chocolate sponge, filled with smooth chocolate ganache, and covered in a luxurious chocolate buttercream. Perfect for chocolate lovers and special occasions!",
//     ingredients: ["Chocolate sponge cake", "Chocolate ganache", "Chocolate buttercream", "Chocolate shavings"],
//     sizes: ["6 inch", "8 inch", "10 inch"],
//     allergens: ["Eggs", "Dairy", "Gluten"],
//     images: [
//       "/src/assets/images/img4.png",
//       "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+2",
//       "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+3",
//       "https://via.placeholder.com/1200x800?text=Chocolate+Delight+Cake+4"
//     ]
//   };

//   const nextImage = () => {
//     setCurrentImage((currentImage + 1) % product.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImage((currentImage - 1 + product.images.length) % product.images.length);
//   };

//   const toggleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#f3e7e0] to-[#d8cbc4] min-h-screen font-sans">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="flex flex-col lg:flex-row">
//             <div className="lg:w-2/3 p-6">
//               <div className="relative rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9">
//                 <img 
//                   className="w-full h-full object-cover" 
//                   src={product.images[currentImage]} 
//                   alt={`${product.name} - Image ${currentImage + 1}`} 
//                 />
//                 <button
//                   className="absolute top-4 right-4 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
//                   onClick={toggleWishlist}
//                 >
//                   <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
//                 </button>
//                 <button
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
//                   onClick={prevImage}
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
//                 <button
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-[#8b6c5c] hover:text-[#3d2516] transition duration-300 shadow-md"
//                   onClick={nextImage}
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="mt-6 flex justify-center space-x-4 overflow-x-auto pb-4">
//                 {product.images.map((image, index) => (
//                   <button
//                     key={index}
//                     className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 ${
//                       currentImage === index ? 'border-[#8b6c5c] ring-2 ring-[#8b6c5c] ring-opacity-50' : 'border-transparent'
//                     } focus:outline-none focus:ring-2 focus:ring-[#8b6c5c] transition duration-300 shadow-md`}
//                     onClick={() => setCurrentImage(index)}
//                   >
//                     <img src={image} alt={`${product.name} - Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="lg:w-1/3 p-6 lg:p-8 space-y-6">
//               <h1 className="text-4xl font-extrabold text-[#3d2516] leading-tight">{product.name}</h1>
//               <div className="flex items-center">
//                 <div className="flex mr-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
//                   ))}
//                 </div>
//                 <span className="text-[#5b3e31] font-medium">{product.rating} out of 5 stars</span>
//               </div>
//               <div className="flex items-center space-x-4 mt-2">
//                 <p className="text-2xl font-bold text-[#8b6c5c]">${product.price}</p>
//                 <p className="text-2xl font-bold text-[#d8d8d8] line-through">${product.regularPrice}</p>
//               </div>

//               <p className="text-lg text-[#5b3e31] leading-relaxed">{product.description}</p>
              
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
//                   <Cake className="mr-2" size={24} />
//                   Ingredients
//                 </h3>
//                 <ul className="list-none text-[#5b3e31] grid grid-cols-2 gap-2">
//                   {product.ingredients.map((ingredient, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="w-2 h-2 bg-[#8b6c5c] rounded-full mr-2"></span>
//                       {ingredient}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
//                   <AlertTriangle className="mr-2" size={24} />
//                   Allergens
//                 </h3>
//                 <ul className="list-none text-[#5b3e31] grid grid-cols-2 gap-2">
//                   {product.allergens.map((allergen, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="w-2 h-2 bg-[#8b6c5c] rounded-full mr-2"></span>
//                       {allergen}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="text-xl font-semibold text-[#3d2516] mb-3 flex items-center">
//                   <Box className="mr-2" size={24} />
//                   Available Sizes
//                 </h3>
//                 <ul className="list-none text-[#5b3e31]">
//                   {product.sizes.map((size, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="w-2 h-2 bg-[#8b6c5c] rounded-full mr-2"></span>
//                       {size}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div className="mt-6 flex items-center space-x-4">
//                 <button className="px-6 py-3 bg-[#8b6c5c] text-white font-semibold rounded-lg hover:bg-[#7b5e46] transition duration-300">
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={toggleWishlist}
//                   className="px-6 py-3 border-2 border-[#8b6c5c] text-[#8b6c5c] font-semibold rounded-lg hover:bg-[#8b6c5c] hover:text-white transition duration-300"
//                 >
//                   {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
