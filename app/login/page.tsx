"use client"

import { useState } from "react"
import { Eye, EyeOff, Home } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#65FFA6] via-[#34d399] to-[#22c55e] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full h-auto md:h-[500px] p-4 md:p-6 flex flex-col-reverse md:flex-row gap-4 md:gap-6">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-2 md:px-8 py-4 md:py-0">
          {/* Home Icon */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Home className="w-10 h-10 md:w-12 md:h-12 text-black" />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">Welcome Home</h1>
            <p className="text-gray-600 text-base md:text-lg">Enter Your Details</p>
          </div>

          {/* Form */}
          <div className="space-y-3 md:space-y-4">
            {/* User Input */}
            <div>
              <input
                type="text"
                placeholder="User"
                className="w-full px-5 md:px-6 py-3 md:py-4 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-base md:text-lg"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 md:px-6 py-3 md:py-4 pr-12 md:pr-14 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-base md:text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-2 md:pt-4">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 md:py-4 px-6 rounded-full transition-colors duration-200 text-base md:text-lg">
                Log in
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Donate Platform Card */}
        <div className="flex-1 bg-gradient-to-br from-[#65FFA6] via-[#34d399] to-[#22c55e] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg min-h-[180px] md:min-h-0 py-6 md:py-0">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">Donate</h2>
            <p className="text-lg md:text-2xl font-semibold opacity-90">Platform</p>
          </div>
        </div>
      </div>
    </div>
  )
} 