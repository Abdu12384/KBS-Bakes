import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import uploadImageToCloudinary from "../../services/uploadServise";
import { AddProductReq } from "../../services/authService";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = ({onCancel,onProductAdded}) => {
  const [previewUrl, setPreviewUrl] = useState({});
  const [errors, setErrors]=useState({})
  const [loading,setLoading]= useState(false)
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    regularPrice: 0,
    salePrice: 0,
    stock: 0, 
    weight: "1 kg",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!productData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    
    if (productData.regularPrice < 0) {
      newErrors.regularPrice = "Price cannot be negative";
    }
    
    if (productData.salePrice > productData.regularPrice) {
      newErrors.salePrice = "Sale price cannot be higher than regular price";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleImageChange = (e, num) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl((prev) => ({ ...prev, [num]: url }));

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, file],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return
    setLoading(true)
    try {
      let imageUrls = [];
      if (productData.images && productData.images.length > 0) {

        imageUrls = await uploadImageToCloudinary(productData.images);
      }

      const productPayload = {
        ...productData,
        images: imageUrls,
      };
      const result = await AddProductReq(productPayload);
      toast.success("Product Added successfully")
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Could not Add product")

    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
     <Toaster position="top-right" reverseOrder={false}/>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Add Product</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Image Upload Section */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors relative"
            >
              {!previewUrl[num] && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Browse Image</span>
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, num)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewUrl[num] && (
                <img
                  src={previewUrl[num]}
                  alt="Selected Image Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter product name"
              />
                {errors.productName && (
                <p className="text-red-600 text-sm">{errors.productName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <select
                name="category"
                onChange={handleChange}
                value={productData.category}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
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
                  name="regularPrice"
                  value={productData.regularPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
                  {errors.regularPrice && (
                <p className="text-red-600 text-sm">{errors.regularPrice}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Sale Price</label>
                <input
                  type="number"
                  name="salePrice"
                  value={productData.salePrice}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
                    {errors.salePrice && (
                <p className="text-red-600 text-sm">{errors.salePrice}</p>
              )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Stock</label>
                <input
                  type="text"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Weight</label>
                <select
                  name="weight"
                  value={productData.weight}
                  onChange={handleChange}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>1 kg</option>
                  <option>2 kg</option>
                  <option>500 g</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter product description"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
             {loading ? "Loading...":"Add Product"} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

