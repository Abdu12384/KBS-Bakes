const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
      fullName:{
        type:String,
        required:true, 
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
         type:String,
         required:true
      },
      mobile:{
        type:String,
        required:true
      },
      profileImage:{
        type:String,
        default:'',
      }
})

module.exports= mongoose.model('Users',userSchema)