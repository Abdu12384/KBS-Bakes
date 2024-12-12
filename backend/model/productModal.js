const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
  weight:{
    type:String,
    required:true
   },
   regularPrice:{
    type:Number,
    required:true
   },
   salePrice:{
    type:Number,
    required:true
   },
   stock:{
    type:Number,
    required:true
   },
  //  customization:{
  //   type:Boolean,
  //   default:false
  //  }
  
})



const prodcutSchema = new mongoose.Schema({
   productName:{
     type:String,
     required:true
   },
   category:{
    type:String,
    required:true
   },
   qty:{
     type:Number,
     required:false,
     default:0
    },
    images:{
      type:[String],
      required:true
    },
    description:{
      type:String,
      required:true
    },
    category:{
     type: mongoose.Schema.Types.ObjectId, 
     ref:"Category",
     required:true
    },
 
   isDeleted:{
     type:Boolean,
     default:false
   },
   variants:[variantSchema],
},
{
  timestamps:true
}
)

module.exports = mongoose.model('Product',prodcutSchema)