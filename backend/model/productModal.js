const mongoose = require('mongoose')


const prodcutSchema = new mongoose.Schema({
   productName:{
     type:String,
     required:true
   },
   qty:{
    type:Number,
    required:false,
    default:0
   },
   category:{
    type:String,
    required:true
   },
   weight:{
    type:String,
    required:true
   },
   images:{
    type:[String],
    required:true
   },
   description:{
     type:String,
     required:true
   },
   stock:{
    type:Number,
    required:true
   },
   salePrice:{
    type:Number,
    required:true
   },
   regularPrice:{
    type:Number,
    required:true
   },
},
{
  timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } //
}
)

module.exports = mongoose.model('Product',prodcutSchema)