import React, { useState } from 'react'
import { ShieldCheck, Mail, Lock } from 'lucide-react'
import { AdminLoginReq } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 const navigate = useNavigate()
  const handleSubmit =  async(e) => {
    e.preventDefault()
    // Handle login logic here
    try {
      const data = await AdminLoginReq(email,password)
      console.log('Login attempted with:', { email, password })
      
       if(data){
         navigate('/admin/dashboard')
       }
       
    } catch (error) {
      console.error('Login failed:',error)
    }
    
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left half - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/src/assets/images/adminimg.png"
          alt="Admin dashboard illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right half - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="text-center mb-8">
              <ShieldCheck className="mx-auto h-12 w-12 text-teal-500" />
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Admin Login
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <p className="text-center text-sm text-gray-600">
            Forgot your password?{" "}
            <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

