import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axioInstence from "../../utils/axioInstence";
import uploadImageToCloudinary from "../../services/uploadServise";
import {  EyeIcon, EyeOffIcon, UserCircle, Mail, Phone, Lock, Save, X, Camera  } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";




function UserDetailsForm() {


  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    profileImage:"",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null)




  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

console.log(formData);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axioInstence.get("/user/profile-update");
        console.log(response);
        setFormData(response.data)
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchAddress();
  }, []);




   const handleChange = (e) =>{
     const {name, value} = e.target
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }
    const handleImageChange = (e) =>{
       const file = e.target.files[0]
       setImageFile(file)
    }

    const validate = () => {
      const newErrors = {};
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "A valid email is required.";
      if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
        newErrors.mobile = "Mobile number must be 10 digits.";
      if (formData.newPassword && formData.newPassword.length < 6)
        newErrors.newPassword = "Password must be at least 6 characters.";
      if (formData.newPassword !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };




  const handleSubmit = async (e) =>{
     e.preventDefault()
      if(!validate()) return
     try {
       if(imageFile){
         const uploadedUrls = await uploadImageToCloudinary([imageFile])
         if(uploadedUrls && uploadedUrls.length>0){
           formData.profileImage = uploadedUrls[0]
         }
       }

      const response = await axioInstence.post('/user/profile-update',formData)
      console.log("Response:", response.data);
      toast.success(response.data.message)
      
    } catch (error) {
      console.error('dsfsdfsf',error.response.data);
      toast.error(error.response.data.message)

     }
  }


  return (
     <div className="min-h-screen bg-gradient-to-br from-[#f3e7e1] to-[#e7d5c9] py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" reverseOrder={false}/>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-teal-500 p-8">
          <h1 className="text-3xl font-bold text-white">Account Details</h1>
          <p className="mt-2 text-amber-100">Manage your personal information and security</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
            {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)} // Show the preview image if a file is selected
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-black shadow-lg"
          />
        ) : formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 shadow-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <UserCircle className="w-16 h-16 text-gray-400" />
            </div>
          )}
              <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{formData.fullName}</h2>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                </div>
             {errors.fullName && <span className="text-sm text-red-500">{errors.fullName}</span>}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" >Email Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                </div>
              </div>
                  {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" >Phone Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    id="phone"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                </div>
              </div>
           {errors.mobile && <span className="text-sm text-red-500">{errors.mobile}</span>}
            </div>

            {/* Change Password */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" >Current Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    name="currentPassword"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="focus:outline-none focus:text-amber-400 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword.current ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" >New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="focus:outline-none focus:text-amber-400 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword.new ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" >Confirm New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={()=>togglePasswordVisibility('confirm')}
                      className="focus:outline-none focus:text-amber-400 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword.confirm ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
            >
              <X className="mr-2 h-5 w-5 text-gray-400" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetailsForm;


// <div className="min-h-screen bg-[#d8cbc4] p-6 flex justify-center items-center">
// <Toaster position="top-right" reverseOrder={false}/>
// <div className="w-full max-w-4xl bg-[#bca89f] rounded-xl shadow-lg overflow-hidden">
// {/* Header Section */}
// <div className="relative mb-16">
//   <div className="h-48 w-full rounded-xl overflow-hidden">
//     <img
//       src={formData.profileImage||"/placeholder.svg?height=192&width=1152"}
//       alt="Profile Banner"  
//       className="w-full h-full object-cover"
//     />
//   </div>
//   <div className="absolute -bottom-12 left-8 flex items-end gap-6">
//     <div className=" relative w-24 h-24 rounded-full border-4 border-white overflow-hidden group">
//     {imageFile ? (
//     <img
//       src={URL.createObjectURL(imageFile)} // Show the preview image if a file is selected
//       alt="Profile"
//       className="w-full h-full object-cover"
//     />
//   ) : formData.profileImage ? (
//         <img
//           src={formData.profileImage}
//           alt="Profile"
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-200">
//         <UserCircle className="w-16 h-16 text-gray-400" />
//       </div>
//     )}
//     <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//       <Camera className="text-white w-8 h-8" />
//       <input 
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="hidden"
//       />
//     </label>
//     </div>
//   </div>
// </div>

// {/* Form Section */}
// <form 
// onSubmit={handleSubmit}
// className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">


//   <div className="md:col-span-2">
//     <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//       Personal Details
//       <span className="w-4 h-4 text-gray-400">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <circle cx="12" cy="12" r="10"/>
//           <path d="M12 16v-4"/>
//           <path d="M12 8h.01"/>
//         </svg>
//       </span>
//     </h2>
//   </div>

//   <div className="space-y-4">
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">Full Name</label>
//       <input
//         type="text"
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//     {errors.fullName && <span className="text-sm text-red-500">{errors.fullName}</span>}
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">Email</label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//     {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
//       <input
//         type="mobile"
//         name="fullName"
//         value={formData.mobile}
//         onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//   </div>
//   {errors.mobile && <span className="text-sm text-red-500">{errors.mobile}</span>}
//   <div className="space-y-4">
//     <div>
//       <label className="block text-sm text-gray-600 mb-1">Address</label>
//       <input
//         type="text"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
    
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Country</label>
//         <select 
//          name="country"
//          value={formData.country}
//          onChange={handleChange}
//          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
//           <option>Select Country</option>
//           <option value="India">India</option>
//           <option value="USA">USA</option>
//           {/* Add country options */}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">State</label>
//         <select 
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
//           <option>Select State</option>
//           <option value="Kerala">Kerala</option>
//           <option value="California">California</option>
//           {/* Add state options */}
//         </select>
//       </div>
//     </div>

//     <div>
//       <label className="block text-sm text-gray-600 mb-1">Pincode</label>
//       <input
//        type="text"
//        name="pincode"
//        value={formData.pincode}
//        onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//   </div>

//   {/* Password Section */}
//   <div className="md:col-span-2 mt-8">
//     <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Current Password</label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password" }
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />
//             <div
//             className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? (
//               <EyeClosed className="h-5 w-5 text-gray-400" />
//             ) : (
//               <EyeIcon className="h-5 w-5 text-gray-400" />
//             )}
//            </div>
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">New Password</label>
//         <div className="relative">
//         <input
//           type={showPassword ? "text" : "password" }
//           name="newPassword"  
//           value={formData.newPassword}
//           onChange={handleChange}
//           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//         />
//               <div
//             className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? (
//               <EyeClosed className="h-5 w-5 text-gray-400" />
//             ) : (
//               <EyeIcon className="h-5 w-5 text-gray-400" />
//             )}
//            </div>
//        </div>
//       </div>
//       {errors.newPassword && (
//     <span className="text-sm text-red-500">{errors.newPassword}</span>
//   )}
//       <div className="md:col-span-2">
//         <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//         />
//          {errors.confirmPassword && (
//           <span className="text-sm text-red-500">{errors.confirmPassword}</span>
//         )}
//       </div>
//     </div>
//   </div>

//   {/* Form Actions */}
//   <div className="md:col-span-2 flex justify-end gap-4 mt-8">
//     <button
//       type="button"
//       className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//     >
//       Cancel
//     </button>
//     <button
//       type="submit"
//       className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
//     >
//       Save
//     </button>
//   </div>
// </form>
// </div>
// </div>