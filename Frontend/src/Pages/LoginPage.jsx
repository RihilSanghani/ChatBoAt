import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../Store/useAuthStore'
import ChatBox from '../Component/ChatBox'

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login, isLogingIng } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationForm = validateForm();

    if (validationForm === true) {
      login(formData);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-col md:flex-row w-full max-w-5xl">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-white">Login</h2>
            <p className="text-sm text-center text-gray-400">
              Enter your email and password to login
            </p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {/* Email */}
              <div className="relative">
                <label className="sr-only" htmlFor="email">Email</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 p-3 text-sm text-gray-900 bg-gray-700 rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 p-3 text-sm text-gray-900 bg-gray-700 rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {isLogingIng ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex w-full md:w-1/2 bg-gray-800 items-center justify-center rounded-lg">
            <ChatBox /> {/* ChatBox component for the right section */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage