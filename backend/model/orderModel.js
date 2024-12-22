const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  products:[{
    productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product',
      required:true
    },
    variantId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    quantity:{
      type:Number,
      required:true,
    },
    price:{
      type:Number,
      required:true
    }
  }],
  totalPrice:{
    type: Number,
    required:true
  },
  orderDate:{
    type:Date,
    default:Date.now
  },
  status:{
    type:String,
    enum:['pending','shipped','delivered','cancelled'],
    default:'pending'
  },
  shippingAddressId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Address',
    required:true
  },
  paymentInfo:{
    type:String,
    required:true
  },
  subtotal: {
    type: Number,
    // required: true
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
})

module.exports = mongoose.model('Order',orderSchema)