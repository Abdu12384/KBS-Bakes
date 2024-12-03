const Product = require('../../model/productModal')




const addProdcut = async (req,res)=>{{
     
  const {productName,
         category,
         regularPrice,
         salePrice,
         stock,
         weight,
         description,
         image,
         }=req.body

         console.log('this is product data',req.body);
         
        try {
          
                const newProduct = new Product({
                      productName,
                      category,
                      salePrice,
                      regularPrice,
                      stock,
                      weight,
                      description,
                      images:image,
                    })

              await newProduct.save() 
          res.status(200).json({message:'Poduct Added successfully'})

        } catch (error) {
          console.error('Prodct update failed Server error',error)
          
        }
        

        
}}

module.exports={
   addProdcut
}