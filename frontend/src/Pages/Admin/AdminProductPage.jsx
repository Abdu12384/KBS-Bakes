import React, { useEffect, useState, useRef } from 'react'
import { Search, Plus, Edit2, Trash2,X } from 'lucide-react'
import axioInstence from '../../utils/axioInstence'
import AddProduct from '../../Components/AdminComponents/AddProduct' 
import EditProduct from '../../Components/AdminComponents/EditProduct'
import toast, { Toaster } from "react-hot-toast";
import Breadcrumbs from '../../Components/BrudCrums'

function AdminProductsPage() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState([])
  const [showEditProduct, setShowEditProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery]= useState("")
  const [currentPage, setCurrentPage]= useState(1)
  const productsPerPage=5

  const formSectionRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axioInstence.get('/admin/products')
        console.log('Fetched products', response.data)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    fetchProducts()
  }, [])

   const handleSearchChange = (e) =>{
     setSearchQuery(e.target.value)
   }
   const filteredProducts = products.filter((products)=>
  products.productName.toLowerCase().startsWith(searchQuery.toLowerCase())
  )
  
  const handleEdit = (product)=>{

    setSelectedProduct(product)
    setShowEditProduct(true)
    setShowAddProduct(false)
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }) 
  }

  const handleCancel= ()=>{
    setShowEditProduct(false)
    setShowAddProduct(false)
    setSelectedProduct(null)
  }

   const handleProductUpadated = (updatedProduct)=>{
     setProducts(prevProducts=>
       prevProducts.map(product=>
        product._id=== updatedProduct._id ? updatedProduct:product
       )
     )
     setShowEditProduct(false)
     setSelectedProduct(null)
   }

   const handleAddProductToggle = () => {

    setShowAddProduct((prevState) => {
      const newState = !prevState;
      if (newState) {
        setShowEditProduct(false);
        setSelectedProduct(null);
      }
      if (formSectionRef.current) {
        setTimeout(() => {
          formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
  
      return newState;
    });
  };

  const handleSoftDelete = async (productId)=>{
     try {
      await axioInstence.put(`http://localhost:3000/admin/products/${productId}`,{
        isDeleted:true,
      })

       setProducts((prevProducts)=>
        prevProducts.filter((product)=> product._id !== productId)
      )
      toast.success('Poduct Deleted Successfully')
     } catch (error) {
     console.error('Error soft-deleting product',error)
      
     }
  }


  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className=" flex flex-col w-full ml-7">
    <Breadcrumbs/>
      {/* Header */}
      <Toaster position="top-right" reverseOrder={false}/>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-16 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Product Management</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 bg-white bg-opacity-10 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
           {!showEditProduct && (
            <button
              onClick={handleAddProductToggle}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto"
          >
            {showAddProduct ? 'Cancel' : 'Add Product'}
             {showAddProduct ? <X />: <Plus />}
          </button>
           )}
        </div>    
      </div>

      {/* Product Table */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-4">Product Name</th>
              <th className="pb-4">Product Name</th>
              <th className="pb-4">Qty</th>
              <th className="pb-4">salePrice</th>
              <th className="pb-4">regularPrice</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Weight</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index} className="border-b border-gray-800 text-white">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg">
                    {/* <img 
                    src={product.images} 
                    alt="img"/> */}
                  </div>
                   

                </td>
                <td className="py-4 text-sm sm:text-base">{product.productName}</td>
                <td className="py-4 text-sm sm:text-base">{product.stock}</td>
                <td className="py-4 text-sm sm:text-base">{product.salePrice}</td>
                <td className="py-4 text-sm sm:text-base">{product.regularPrice}</td>
                <td className="py-4 text-sm sm:text-base">{product.category}</td>
                <td className="py-4 text-sm sm:text-base">{product.weight}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button 
                    className="p-1 sm:p-2 hover:bg-gray-700 rounded-lg"
                     onClick={()=>handleEdit(product)}
                    >
                      <Edit2 className="h-4 w-4 text-blue-300" />
                    </button>
                    <button 
                    className="p-1 sm:p-2 hover:bg-gray-700 rounded-lg"
                    onClick={()=>handleSoftDelete(product._id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex-wrap justify-center items-center mt-4 gap-2'>
      {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg  ${
              currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Product Section (Conditionally Rendered) */}
      <div ref={formSectionRef}>

      {showAddProduct && (       
          <AddProduct
            onCancel={handleCancel}
            onProductAdded={(newProduct) =>{
              setProducts((prevProducts)=> [...prevProducts, newProduct])
                 setShowAddProduct(false)                
            }}
          />  
      )}

       {showEditProduct&&(
            <EditProduct
            product={selectedProduct}
            onCancel={handleCancel}
            onProductAdded={handleProductUpadated}
           />
       )}
    </div>
      </div>
  )
}

export default AdminProductsPage
