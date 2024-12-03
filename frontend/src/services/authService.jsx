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



export {
   AdminLoginReq,
   AddProductReq 
}