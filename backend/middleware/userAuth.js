const jwt = require('jsonwebtoken')



const varifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken
 console.log('working');
 
     if(!token){
       return res.status(401).json({message:"Acce token is missing"})
     }
       try {
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user= decoded
          next()
       } catch (error) {
          console.error('Token verification failed',error.message)
          return res.status(403).json({message:' expire token'})
       }
}

module.exports={
  varifyToken
}