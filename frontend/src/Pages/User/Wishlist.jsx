import { Heart, Trash2, ShoppingCart, Package, Calendar, DollarSign } from 'lucide-react'
import axioInstence from '../../utils/axioInstence'
import React,{useEffect, useState} from 'react'
import toast, { Toaster } from "react-hot-toast";
import NavBar from '../../Components/Navbar';



export default function Wishlist() {

const [wishlistItems, setWishlistItems]=useState([])

  const fetchWishlist = async() =>{
    try {
      const response = await axioInstence.get('/user/mywishlist')
      console.log('responshere',response);
      setWishlistItems(response.data.wishlist.products );
    } catch (error) {
     console.log(error);
     
    }
 }
 

 
 useEffect(()=>{
 fetchWishlist()
 },[])


 const removeProduct = async (productId)=>{
   try {
     const response = await axioInstence.delete(`/user/mywishlist/${productId}`)
      
     setWishlistItems(wishlistItems.filter((item)=> item.productId._id !== productId))
     toast.success(response.data.message)
   } catch (error) {
    console.log('Error removing product:', error);

   }
 }

console.log(wishlistItems);


  return (
    <>
      <NavBar/>
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
      {/* Breadcrumb */}
            <Toaster position="top-right" reverseOrder={false}/>
      <div className="text-sm text-gray-500 mb-8 flex items-center">
        <a href="#" className="hover:text-gray-700">HOME</a>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-700">WISHLIST</span>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
          <Heart className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-medium text-gray-800">My Wishlist</h1>
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-t-lg shadow-sm">
        <div className="grid grid-cols-12 gap-4 py-4 px-6 border-b text-gray-600 font-medium">
          <div className="col-span-5 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Product name
          </div>
          <div className="col-span-3 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Unit price
          </div>
          <div className="col-span-2 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Stock status
          </div>
          <div className="col-span-2"></div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.map((item) => (
          <div key={item?.productId._id} className="grid grid-cols-12 gap-4 py-6 px-6 border-b items-center hover:bg-gray-50 transition-colors">
            {/* Delete Button and Image */}
            <div className="col-span-5 flex items-center gap-4">
              <button 
              onClick={()=>removeProduct(item?.productId._id)}
              className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
              <img 
                src={item?.productId.images?.[0]} 
                alt={item?.proudctName} 
                className="w-15 h-20 object-cover rounded-md shadow-sm"
              />
              <span className="font-medium text-gray-800">{item?.productId.productName}</span>
            </div>

            {/* Price */}
            <div className="col-span-3">
              
                <span className="text-gray-400 line-through mr-2">₹{item?.productId.variants?.[0]?.regularPrice}</span>
            
              <span className="text-gray-900 font-semibold">₹{item?.productId.variants?.[0]?.salePrice}</span>
            </div>

            {/* Stock Status */}
            <div 
              className={`col-span-2 font-medium ${
                item?.productId.variants?.[0]?.stock > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}           
               >
            {item?.productId.variants?.[0]?.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Add to Cart and Date */}
            <div className="col-span-2">
              <div className="flex flex-col items-end gap-2">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to cart
                </button>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Added: {item?.createdAt?.split('T')[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

