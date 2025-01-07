const Product = require('../../model/productModal')
const Category = require('../../model/category');  



const addProdcut = async (req,res)=>{{
     
  const {productName,
         category,
         weight,
         description,
         images,
         variants,
         type
         }=req.body
  console.log(variants);
  
         console.log('this is product data',req.body);
         
        try {

          const existingProduct = await Product.findOne({ productName });
          if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists. Duplicate entries are not allowed.' });
          }

            const updatedVariants = variants.map((variant)=>{
              const {regularPrice, discount} = variant
              const salePrice = discount ? regularPrice - (regularPrice * discount)/100 : regularPrice
              return {...variant, salePrice}
            })
            const totalStock = updatedVariants.reduce((total, variant) => total + variant.stock, 0);

           console.log('totalstock',totalStock);
           
                const newProduct = new Product({
                      productName,
                      category,
                      weight,
                      description,
                      images,
                      variants:updatedVariants,
                      type
                    })

              await newProduct.save() 
 
              const updatedCategory = await Category.findByIdAndUpdate(
                category,
                {$inc:{stock:totalStock}},
                {new:true}
              )

          res.status(200).json({message:'Poduct Added successfully'})

        } catch (error) {
          console.error('Prodct update failed Server error',error)
          
        }      
        
}}

  const showProduct = async (req,res)=>{
     console.log('getu proudect');
     
       try {
         const products = await Product.find()
          .populate('category','name')
          .exec()
          res.status(200).json(products)

       } catch (error) {
         res.status(500).json({message:'Failed to fetch Product'})
       }
  }



   const EditProduct = async (req,res)=>{     
       try {
   console.log('edit prodect');
   
        const productId = req.params.id
        const updatedData =req.body
        console.log(productId);
        
        // const productData = req.body
        console.log('mmmm',updatedData);
      
       
       if (updatedData.variants) {
        updatedData.variant = updatedData.variants.map(variant => {
          if (variant.regularPrice && variant.discount) {
            const salePrice = variant.regularPrice - (variant.regularPrice * variant.discount) / 100;
            return { ...variant, salePrice };
          }
          return variant;
        });
        delete updatedData.variants;
      }

        
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {$set:updatedData },
          {new:true, runValidators:true}
        )
       console.log('sdfdsfdsfdfsdfff',updatedProduct);
       
        if(!updatedProduct){
          return res.status(404).json({error:"Product not found"})
        }
  
        res.status(200).json({message:"Product updated Successfully"})      
       } catch (error) {
        console.error("Error updating product:",error)
        res.status(500).json({error:"Product update failed"})
       }


   }

   const softDelete= async(req,res)=>{
      const {id} = req.params
      const {isDeleted} = req.body

      try {
        const updatedProudct = await Product.findByIdAndUpdate(
          id,
          {isDeleted},
          {new: true}
        )

        if(!updatedProudct){
          return res.status(404).json({error:'Poduct not found'})
        }
        res.status(200).json(updatedProudct)
      } catch (error) {
        console.error('Error updating product:',error)
        res.status(500).json({error:'Failed to update product'})
      }
   }


module.exports={
   addProdcut,
   showProduct,
   EditProduct,
   softDelete
}