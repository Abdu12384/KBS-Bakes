import axioInstence from "../utils/axioInstence";


const AdminLoginReq = async (email, password) =>{
   try {
     const response = await axioInstence.post('/auth/admin/login',{
        email,
        password
     })
     return response.data
   } catch (error) {
    console.log('Error from adminLogin',error);
    
   }
}

const AddProductReq = async (productData)=>{
    try {
       const response = await axioInstence.post('/admin/add-product',productData)
        return response.data
    } catch (error) {
      console.log('Failed to add Product',error);
      
    }
}

const updatedProductReq = async (productId, updatedProductData)=>{
     try {
       const response = await axioInstence.put(`/admin/products/${productId}`,updatedProductData)
        return response.data
     } catch (error) {
      console.error("Error updating product:",error)
     }
}


export {
   AdminLoginReq,
   AddProductReq,
   updatedProductReq 
}