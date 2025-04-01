import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ChatBox from '../Component/ChatBox';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const validateForm = () => {
      if(!formData.fullname.trim()) return toast.error("Full name is required");
      if(!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if(!formData.password.trim()) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
      return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationForm = validateForm();

    if(validationForm===true){
      signup(formData);
    }
  };

  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
        <div className="flex w-full max-w-5xl">
          {/* Left Section */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
            <p className="text-sm text-center text-gray-400">
              Get started with your free account
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Full Name */}
              <div className="relative">
                <label className="sr-only" htmlFor="fullName">Full Name</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name='fullname'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full pl-10 p-3 text-sm text-gray-900 bg-gray-700 rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="Full Name"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="sr-only" htmlFor="email">Email</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  name='email'
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name='password'
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
                disabled={isSigningUp}
              >
                {
                  isSigningUp ? (
                    <>
                      <Loader2 className='size-5 animate-spin' />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )
                }
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-gray-800 flex items-center justify-center rounded-lg">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage