const Users = require('../../model/userModel')



const getUsers= async (req, res) =>{

    try {
      const users = await Users.find({},{password:0})
       if(!users || users.length === 0){
         res.status(404).json({message:"Users Not fount"})
       }

      res.json(users)

    } catch (error) {
      console.error("Error from Server",error)
    }

}

const toggleUserStatus = async (req,res)=>{
  
  
  const {id} = req.params
  const {isActive}= req.body
  console.log(id);
   try {
     const user = await Users.findByIdAndUpdate(
      id,
      {isActive},
      {new:true}
    )
     if(!user){
      return res.status(404).json({message:'User not found'})
     }

     res.status(200).json(user)
      
   } catch (error) {
    console.error('Error updating user status',error)
    res.status(500).json({message:'Server error while updating status'})
   }
}

module.exports={
  getUsers,
  toggleUserStatus
}