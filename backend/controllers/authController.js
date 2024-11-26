const User = require('../model/userModel')
const bcrypt= require('bcrypt')



const insertUser = async(req,res)=>{
  const {name, email, password, mobile}=req.body
   console.log(name)
   try {
    
    const existingUser= await User.findOne({email})

     if(existingUser){
       return res.status(400).json({message:"Email already in use"})
     }
     
      const hashedPassword =await bcrypt.hash(password,10)
       
       const user = new User({
        name,
        email,
        password:hashedPassword,
        mobile
       })

       await user.save()
      
       res.status(201).json({message:"User Register Successfully"})
        
   } catch (error) {
     console.error(error)
    res.status(500).json({error:"Server error"})
   }
}




module.exports={
   insertUser
}