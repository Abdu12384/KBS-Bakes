import React, { useState ,useEffect} from 'react'
import { User, Mail, Phone, Lock } from 'lucide-react'
import axios from 'axios';
import Carousel from '../../Components/Carousel';
import OTPInput from '../../Components/OTPvarify';


function SignupPage() {
  const [isOtpModalVisible, setOtpModalVisible]= useState(false)
     const [formData, setFormData] = useState({
       fullName:"",
       email:"",
       mobile:"",
       password:""
     })
     const [errors, setErrors] = useState({});
     useEffect(() => {}, []);
     


     const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({...formData,[name]:value});
            
           setErrors({...errors,[name]:''})
    };
       
    const validateForm = () => {
      const newErrors = {};
      if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
      if (!formData.email) newErrors.email = 'Email is required.';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
      if (!formData.mobile) newErrors.mobile = 'Phone Number is required.';
      else if (formData.mobile.length < 10) newErrors.mobile = 'Phone Number is invalid.';
      if (!formData.password) newErrors.password = 'Password is required.';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
          
       const handleSubmit = async (e)=>{
         e.preventDefault()
         if(!validateForm()) return

          console.log("Form Data Updated:", formData);
          try {
            const response = await axios.post('http://localhost:3000/auth/signup',formData)
            console.log("Respose:",response.data);
            setOtpModalVisible(true)
          } catch (error) {
            console.error("Error:",error)
          }
       }
       const closeOtpModal = () =>{
        setOtpModalVisible(false)
       }
    
  return (
    <div className="min-h-screen bg-[#e5f5e9] flex items-center justify-center p-4">
      <div className="w-full h-screen  bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl flex overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 bg-[#e5f5e9] p-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to KBS Bakes Where every bite feels like home!</h1>
            <p className="text-lg text-gray-600">
            Join us today, indulge in sweet creations, and experience the magic of freshly baked delights. Let’s make memories!
            </p>
          </div>
          <Carousel/>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white/80 to-[#e5f5e9]/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <span>KBS</span>
              <span className="text-[#4a9d5e]">BAKES</span>
            </h2>
            <p className="text-gray-600 mt-3">Create your account and start your journey with us!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id='fullName'
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                  placeholder="John Smith"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id='mobile'
                  name="mobile"
                  onChange={handleChange}
                  value={formData.mobile}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}

            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id='password'
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 mt-6"
            >
              Sign up
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a9d5e] transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-[#4a9d5e] hover:text-[#3d8b4f] font-medium">
                Sign in
              </a>
            </p>
          </form>
        </div>
        {isOtpModalVisible && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
           <div className="relative">
             <button
               onClick={closeOtpModal}
               className="absolute bottom-40  left-40 bg-gray-300 p-3 rounded-full focus:outline-none z-10"
             >
               x
             </button>
             <OTPInput email={formData.email}/>
           </div>
         </div>
        )}
      </div>
    </div>
  )
}

export default SignupPage
