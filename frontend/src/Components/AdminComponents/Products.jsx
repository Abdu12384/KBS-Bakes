import React, { useState } from 'react'
import { Package, Search, Plus, Edit2, Trash2, ImageIcon, RefreshCcw,Minus } from 'lucide-react'
import uploadImageToCloudinary from '../../services/uploadServise'
import { AddProductReq } from '../../services/authService'
 function Products() {
  const [products] = useState([
    { id: '#534726', name: 'Fudge Fantasy', qty: 1888, price: 6000, gst: '18%', category: 'Cakes', weight: '1kg' },
    { id: '#534726', name: 'Molten Lava Cake', qty: 1888, price: 6000, gst: '18%', category: 'Cakes', weight: '500g' },
    { id: '#534726', name: 'Dark Desire Cake', qty: 1888, price: 6000, gst: '18%', category: 'Cakes', weight: '2kg' },
  ])
  const [previewUrl, setPreviewUrl]= useState({})
  const [productData, setProductData] = useState({
     productName:'',
     category:'',
     regularPrice:0,
     salePrice:0,
     stock:0,
     weight:'1 kg',
     description:'',
     images:[]
  })

    const handleChange = (e) =>{
       const {name, value}= e.target
       setProductData((prev)=>({
         ...prev,
         [name]: value
        }))
    }

     
const handleImageChange = (e, num) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setPreviewUrl(prev => ({...prev, [num]: url}));
    
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, file]
    }));
  }
};
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
           let imageUrls = []
           if(productData.images && productData.images.length>0){
             
             const folderName='poduct_images' 
               console.log(productData.images);
               console.log('product data',productData);
               
               imageUrls  = await uploadImageToCloudinary(productData.images, folderName)
              
           }
            

           const productPayload = {
            ...productData, 
            image: imageUrls
          }
          console.log('this is payload data',productData);
          
           const result = await AddProductReq(productPayload)
            
           console.log('Product added succefully!', result)
         } catch (error) {
           console.error('Add Product Error:',error)
         }
    }
    

  return (
    <div className="min-h-screen bg-black bg-opacity-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Product Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-white bg-opacity-10 text-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            <RefreshCcw className="h-5 w-5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-4">Product Name</th>
                <th className="pb-4">Product ID</th>
                <th className="pb-4">Qty</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">GST</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Weight</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-800 text-white">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                    {product.name}
                  </td>
                  <td className="py-4">{product.id}</td>
                  <td className="py-4">{product.qty}</td>
                  <td className="py-4">{product.price}</td>
                  <td className="py-4">{product.gst}</td>
                  <td className="py-4">{product.category}</td>
                  <td className="py-4">{product.weight}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <Edit2 className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Editor */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Product Editor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors relative"
              >
            {!previewUrl[num] && (
                <div className="flex flex-col items-center justify-center space-y-2 mt-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-400">Browse Image</span>
                </div>
              )}

                 <input 
                 type="file"
                 name="image"
                 onChange={(e)=>{handleImageChange(e,num)}}
                 className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' 
                 />

                 {previewUrl[num]&&(
                <img
                  src={previewUrl[num]}
                  alt="Selected Image Preview"
                  className="   w-full h-full object-cover rounded-lg"
                />
              )}
              </div>
            ))}
          </div>
           
           <form action="" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Product Name</label>
              <input
                type="text"
                name='productName'
                value={productData.productName}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter product name"
                />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <select 
               name='category'
               onChange={handleChange}
               value={productData.category}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Vanilla Cakes</option>
                <option>Chocolate Cakes</option>
                <option>Custom Cakes</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Regular Price</label>
                <input
                  type="number"
                  name='regularPrice'
                  value={productData.regularPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                  />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Sale Price</label>
                <input
                  type="number"
                  name='salePrice'
                  value={productData.salePrice}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                  />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Stock Status</label>
                  <input 
                  type="text"
                  name='stock'
                  value={productData.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
              </div>
              <div>

            <label className="block text-gray-400 mb-2">Weight</label>
            <select 
            name='weight'
            value={productData.weight}
            onChange={handleChange}
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>1 kg</option>
              <option>2 kg</option>
              <option>500 g</option>
            </select>
        </div>
      </div>
       
       <div>
        <label className="block text-gray-400 mb-2">Description</label>
        <textarea
          name='description'
          className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={productData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="4"
          ></textarea>
      </div>

            <div className="flex gap-4">
              <button  className="flex-1 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
                Save to Drafts
              </button>
              <button 
              type='submit' 
              className="flex-1 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Publish Product
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default  Products
