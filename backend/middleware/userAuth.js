const jwt = require('jsonwebtoken')



const varifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken

     if(!token){
       return res.status(401).json({message:"Acce token is missing"})
     }
       try {
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user= decoded
          next()
       } catch (error) {
          console.error('Token verification failed',err.message)
          return res.status(403).json({message:' expire token'})
       }
}