const { pipeline } = require('nodemailer/lib/xoauth2')
const Product = require('../../model/productModal') 




const homeListProduct = async (req, res)=>{ 
  
    try {

  const proudcts = await Product.find({isDeleted:false})

 if(!proudcts || proudcts.length === 0){
    return res.status(400).json({message:"product Not Fount"})
 }

  return res.status(200).json(proudcts)
      
    } catch (error) {
      console.error("Server Error",error)
      res.status(500).json({message:"Server Error Product fetch"})
    }


}

const productDetails= async(req, res)=>{
   console.log('i get the requst here');
   
   const {id} = req.params
   console.log(id);
   
   try {
    const product = await Product.findById(id)

    if(!product){
      return res.status(404).json({message:"Product not found"})
    }
    console.log(product);
    
    res.status(200).json(product)

   } catch (error) {
    
     console.error("Server Error", error);
     res.status(500).json({ message: "Server Error: Unable to fetch product details" });
   }

}


 const handlLogoutUser = async (req, res)=>{
  try {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax", 
    });
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
    });




    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server Error during logout" });
  }
 }


 const cakePage = async(req, res)=>{
   try {
    console.log(req.query);
     
    const {sort,type} = req.query
    
     let query = {isDeleted: false}

     let sortConfig ={}

     switch (sort){
       case 'price_asc':
        sortConfig = {'variants.0.salePrice':1} 
        break

        case 'price_desc':
        sortConfig ={'variants.0.salePrice':-1}
        break

        case 'name_asc':
        sortConfig ={'productName':1}
         break

        case 'name_desc':
        sortConfig ={'productName':-1}
        break

        case 'newest':
        sortConfig ={'createAt':-1}
        break

         default:
        sortConfig = {createAt:-1}
     }
     const products = await Product.find(query)
     .sort(sortConfig)
     .select('productName images variants.salePrice category type')
     .lean()

     res.status(200).json(products)
   } catch (error) {
    console.error("Error fetching cakes:", error);
    res.status(500).json({ error: "Failed to fetch cakes" });

   }
 }



module.exports={
   homeListProduct,
   productDetails,
   cakePage,
   handlLogoutUser
}