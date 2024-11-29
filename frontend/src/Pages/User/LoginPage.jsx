import React, { useState, } from 'react'
import { Mail, Lock, Coffee } from 'lucide-react'
import Carousel from '../../Components/Carousel'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 




function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState()
  const [error,setError]= useState('')        
     
     const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
           const response = await axios.post('http://localhost:3000/auth/login',
            {email,password},
            {withCredentials:true}
           )
           console.log(response);
           navigate('/user/home')
        }catch(err){
          console.log("Login error here",err);
          
        }
     }




  return (
    <div className="min-h-screen bg-[#e5f5e9] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[750px] bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white/80 to-[#e5f5e9]/30">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <span>KBS</span>
                <span className="text-[#4a9d5e]">BAKES</span>
              </h2>
              <p className="text-gray-600 mt-3">Welcome back! Please sign in to continue.</p>
            </div>
            
            <form  onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d5e] focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#4a9d5e] focus:ring-[#4a9d5e] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm font-medium text-[#4a9d5e] hover:text-[#3d8b4f]">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Sign in
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a9d5e] transition-all duration-200"
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
                Sign in with Google
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#4a9d5e] hover:text-[#3d8b4f] font-medium">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#e5f5e9] p-12 flex-col items-center justify-center">
          <div className="max-w-md text-center">
            <div className=" flex justify-center">
              <Coffee className="w-16 h-16 text-[#4a9d5e]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-0">Welcome back to KBS Bakes!</h1>
            <p className="text-lg text-gray-600 ">
              Sign in to explore our delicious treats and place your order. Your next sweet adventure awaits!
            </p>
          </div>
          <Carousel/>
        </div>
      </div>
    </div>

  )
}

export default LoginPage
