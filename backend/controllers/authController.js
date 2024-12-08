const User = require('../model/userModel')
const bcrypt= require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const OTP = require('../model/OTPmodel')

const jwt = require('jsonwebtoken')
const { response } = require('express')



const USER_ACCESS_TOKEN_SECRET = process.env.USER_ACCESS_TOKEN_SECRET
const USER_REFRESH_TOKEN_SECRET = process.env.USER_REFRESH_TOKEN_SECRET



 const generateAdminTokens = (admin) =>{
    const adminAccessToken = jwt.sign(
      {id:admin._id, email:admin.email, isAdmin:true, role:'admin'},
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      {expiresIn:'15m'}
    )

    const adminRefreshToken = jwt.sign(
       {id: admin._id, email:admin.email, isAdmin:true, role:'admin'},
       process.env.ADMIN_REFRESH_TOKEN_SECRET,
       {expiresIn:'7d'}
    )
    return {adminAccessToken,adminRefreshToken}
 }



   

 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'kbsbakes786@gmail.com',
      pass:'uijs jkre agzy escf'
    }
 })

 const generateOTP = () =>{
    return crypto.randomInt(100000,999999)
 }

 const sendOtpToEmail = async (email,otp)=>{
  
 const mailOptions = {
    from:'kbsbakes786@gmail.com',
    to:email,
    subject:'Your OTP for KBS Bakes Registration',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP for KBS Bakes Registration</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 30px; text-align: center; background-color: #FF6B6B; border-radius: 8px 8px 0 0;">
                  <h1 style="color: #ffffff; font-size: 28px; margin: 0;">KBS Bakes</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; font-size: 24px; margin-top: 0;">Your Registration OTP</h2>
                  <p style="color: #666666; font-size: 16px; line-height: 1.5;">Thank you for registering with KBS Bakes. To complete your registration, please use the following One-Time Password (OTP):</p>
                  <div style="background-color: #f0f0f0; border-radius: 4px; padding: 20px; text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; color: #FF6B6B; letter-spacing: 5px;">${otp}</span>
                  </div>
                  <p style="color: #666666; font-size: 16px; line-height: 1.5;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
                  <p style="color: #666666; font-size: 16px; line-height: 1.5;">If you didn't request this OTP, please ignore this email.</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 30px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                  <p style="color: #999999; font-size: 14px; margin: 0;">© 2023 KBS Bakes. All rights reserved.</p>
                  <p style="color: #999999; font-size: 14px; margin: 10px 0 0;">123 Bakery Street, Cake City, CB 12345</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
  }  
  
   return new Promise((resolve,reject)=>{
     transporter.sendMail(mailOptions, (error,info)=>{
         if(error){
           console.error('Error sending OTP')
           reject('Error sending OTP')
         }else{
           console.log('OTP sent:',info,response);
           resolve('OTP sent successfully')
           
         }
     })
   })

 }





const insertUser = async(req,res)=>{
  const {fullName, email, password, mobile}=req.body

  try {
    const existingUser= await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"Email already in use"})
    }
    
    // const existingOTP = await OTP.findOne({email})
    //  if(existingOTP){
    //    return res.status(400).json({message:"OTP already sent, please varify"})
    //  } 

    const otp = generateOTP()
    console.log(otp);
    
    const hashedPassword =await bcrypt.hash(password,10)

    const otpDoc = new OTP({
      fullName,
      otp,
      email,
      password:hashedPassword,
      mobile,
      expiry: Date.now() + 30 * 1000,
    })

      await otpDoc.save()
      await sendOtpToEmail(email,otp)

       res.status(201).json({message:"Sent otp sucess fully"})
        
   } catch (error) {
     console.error(error)
    res.status(500).json({error:"Server error"})
   }
}




 const varifyOTP = async (req,res)=>{
   const {email, otp}= req.body
    // console.log('this comming otp',otpCode);
    
   try {
     const otpRecord = await OTP.findOne({email, otp})
      if(!otpRecord){
         return res.status(400).json({message:"Invalid OTP"})
      }

      if(otpRecord.expiry < Date.now()){
         await OTP.deleteOne({email})
         return res.status(400).json({message:"OTP expired"})
      }
      
      const user = new User({
        fullName: otpRecord.fullName,
        email: otpRecord.email,
        password: otpRecord.password,
        mobile: otpRecord.mobile
      })
       
      await user.save()

      const deleteResult =await OTP.deleteOne({email,otp})
       console.log(deleteResult);
       
      res.status(201).json({message:"User Registered succefull"})

   } catch (error) {
     console.error(error)
     res.status(500).json({message:"Server error"})
   }
 }



   const resendOtp= async(req,res)=>{
      const {email} = req.body
      console.log('resend otp',email);
      
      if(!email){
        return res.status(400).json({success:false, message:'Email is required'})
      }       
      try {
      const otp = generateOTP()
      await OTP.updateOne(
        {email},
        {otp, expiry:Date.now() + 60 * 1000},
        {upsert:true}
      )

       
      await sendOtpToEmail(email,otp)
         res.json({success:true, message:'OTP resent successfully'})
         } catch (error) {
          console.error('Error resendign OTP:',error)
          res.status(500).json({message:'Failed to resend OTP'})
         }
   }



   const loadLogin= async (req,res)=>{
       const {email, password} = req.body
       
       try {
         const user= await User.findOne({email})
         if(!user)return res.status(404).json({message:"User not email found"})
          
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) return res.status(401).json({message:"Invalide cridentials"})
            
            console.log(email);
            const accessToken = jwt.sign(
              {id:user._id,user:'user'},
              USER_ACCESS_TOKEN_SECRET,
              {expiresIn:"15m"}
            )
            
            const refreshToken= jwt.sign(
              {id:user._id,role:'user'},
              USER_REFRESH_TOKEN_SECRET,
              {expiresIn:"7d"}
            )
            
            user.refreshToken=refreshToken
              await user.save()
              
           res.cookie("accessToken",accessToken,{
               httpOnly:true,
               secure: process.env.NODE_ENV === "production",
               sameSite:"lax",
               maxAge:15 * 60 * 1000,
           })
          res.cookie("refreshToken", refreshToken,{
             httpOnly:true,
             secure: process.env.NODE_ENV === "production",
             sameSite:"lax",
             maxAge:7 * 24 * 60 * 60 * 1000
          })
           
          res.status(200).json({message:"Login successfull"})
       } catch (error) {
         res.status(500).json({message:"Server error"})
       }
   } 



  const  refreshControll = async (req,res)=>{
    const adminRefreshToken = req.cookies.adminRefreshToken
    const userRefreshToken = req.cookies.refreshToken
      console.log('working refersh Tokne',adminRefreshToken);
      
  if (!adminRefreshToken) return res.status(401).json({ message: "Refresh token required" });

    try {

      let decoded;
      let newAccessToken;
  
      try {

        decoded = jwt.verify(adminRefreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET);
        if (decoded) {

          newAccessToken = jwt.sign({ id: decoded.id, role: 'admin' }, process.env.ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        }
      } catch (error) {

        try {
          decoded = jwt.verify(userRefreshToken, process.env.USER_REFRESH_TOKEN_SECRET);
          if (decoded) {

            newAccessToken = jwt.sign({ id: decoded.id, role: 'user' }, process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
          }
        } catch (err) {

          return res.status(403).json({ message: "Invalid refresh token" });
        }
      }

       res.cookie('accessToken',newAccessToken,{
           httpOnly:true,
           secure:process.env.NODE_ENV === "production",
           sameSite:'lax',
           maxAge:15 * 60 * 1000
       })

       res.json({message:'Token Refreshed Successfully'})
       
    } catch (error) {
      console.error('Error during token verification:', error);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  };


   const loadLogout= async(req,res)=>{
     console.log('logout here');
     const refreshToken = req.cookies.refreshToken;
     if (!refreshToken) return res.status(204).end(); 
       try {
          const user = await User.findById(refreshToken)
          if(user){
            user.refreshToken=null
            await user.save()
          }

         res.clearCookie('accessToken',{
           httpOnly:true,
           secure:true,
           sameSite:'strict',
           maxAge:0,
         })

         res.clearCookie('refreshToken',{
           httpOnly:true,
           secure:true,
           sameSite:'strict',
           maxAge:0,
         })


       res.status(200).json({message:"Logout Successfully"})
      } catch (error) {
         console.error(error)
          res.status(500).json({message:"Error logging out"})
        
       }
   }





   const adminLogin = async(req,res)=>{
   const {email,password} = req.body
       console.log(email,password);
       
     try {

       const admin = await User.findOne({email})     
    
        if(!admin||!admin.isAdmin){
           return res.status(403).json({message:'Access denied: Not an admin'})
        }
      
      const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
           return res.status(401).json({message:'Invalid Credentials!'})
        }  

         
        const {adminAccessToken, adminRefreshToken} = generateAdminTokens(admin)

         res.cookie('adminRefreshToken',adminRefreshToken,{
             httpOnly:true,
             secure:true,
             sameSite:'lax'
         })
         res.cookie('adminAccessToken',adminAccessToken,{
             httpOnly:true,
             secure:true,
             sameSite:'lax'
         }),
         res.status(200).json({
            fullName:admin.fullName,
            email:admin.email,
            profileImage:admin.profileImage
         })
         
     } catch (error) {
      res.status(500).json({message:"Sever error"})
     }


   }


module.exports={
   insertUser,
   varifyOTP,
   resendOtp,
   loadLogin,
   refreshControll,
   loadLogout,
   adminLogin
}