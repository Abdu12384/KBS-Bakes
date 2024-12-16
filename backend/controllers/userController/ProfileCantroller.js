const User = require('../../model/userModel')
const Address = require('../../model/addressModel')
const { use } = require('../../routes/userRoute')
const bcrypt = require('bcrypt');


const profileUpdate = async(req, res) =>{

    const {
      fullName,
      email,
      mobile,
      profileImage,
      address,
      country,
      state,
      pincode,
      currentPassword,
      newPassword
    }= req.body
    
    console.log('here user',req.body);
    try {
      const user = await User.findById(req.userId)
       
      if(!user) return res.status(404).json({error:"User not found"})


         if(currentPassword){
           const isMatch = await bcrypt.compare(currentPassword,user.password)
            if(!isMatch){
              return res.status(400).json({ message: "Current password is incorrect" });

            }

            if(newPassword){
              const hashedPassword = await bcrypt.hash(newPassword,10)
              user.password = hashedPassword
             }
         }



        user.fullName = fullName || user.fullName
        user.email = email || user.email
        user.mobile = mobile || user.mobile
        user.profileImage = profileImage || user.profileImage

        let addressDoc = await Address.findOne({userId: user._id})
         
        if(addressDoc){
          addressDoc.address = address || addressDoc.address
          addressDoc.country = country || addressDoc.country
          addressDoc.state = state || addressDoc.state
          addressDoc.pincode = pincode || addressDoc.pincode
          await addressDoc.save()
        } else{
            addressDoc = new Address({
               userId: user._id,
               address,
               country,
               state,
               pincode
            })
            await addressDoc.save()
        }

        user.addressId = addressDoc._id
        console.log(user);
        
        await user.save()
         
   res.json({ message: "Profile updated successfully", user, address: addressDoc });

    } catch (error) {
      console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });

    }
}



module.exports={
   profileUpdate
}