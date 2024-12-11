
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: 
  { type: String, 
    required: true 
  },
  stock:{
    type:Number,
    default:0
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
}

);

module.exports = mongoose.model('Category', CategorySchema);
