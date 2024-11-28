const User = require('../model/userModel')
const bcrypt= require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const OTP = require('../model/OTPmodel')
const { send } = require('process')
const { resolve } = require('path')
const { response } = require('express')




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
        {otp, expiry:Date.now() + 30 * 1000},
        {upsert:true}
      )
      
      await sendOtpToEmail(email,otp)
         res.json({success:true, message:'OTP resent successfully'})
         } catch (error) {
          console.error('Error resendign OTP:',error)
          res.status(500).json({message:'Failed to resend OTP'})
         }
   }

module.exports={
   insertUser,
   varifyOTP,
   resendOtp
}