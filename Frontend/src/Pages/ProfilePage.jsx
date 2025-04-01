import { Camera, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'

const ProfilePage = () => {

  const { authUser, updateProfile, isProfileUpdated } = useAuthStore()

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({ picture: base64Image });
    };
  }


  // Date formate
  const timestamp = authUser.createdAt;

  // Convert the timestamp to a Date object
  const dateObject = new Date(timestamp);

  // Extract only the date in YYYY-MM-DD format
  const formattedDate = dateObject.toISOString().split('T')[0];
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-yellow-400">Profile</h1>
          <p className="text-sm text-center text-gray-400">
            Your profile information
          </p>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mt-6">
            <div className="relative">
              <img
                src={selectedImage || authUser.picture || "./Avtar.jpeg"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-700 object-cover"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-yellow-400 p-1 rounded-full hover:bg-yellow-500 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-gray-900" />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Click the camera icon to update your photo
            </p>
          </div>

          {/* Profile Form */}
          <div className="mt-6 space-y-4">
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={authUser?.fullname}
                className={`w-full pl-10 p-3 text-sm text-gray-900 bg-gray-700 rounded-md border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400 `}
                placeholder="Full Name"
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={authUser?.email}
                className={`w-full pl-10 p-3 text-sm text-gray-900 bg-gray-700 rounded-md border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400 `}
                placeholder="Email Address"
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-300">Account Information</h3>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Member Since</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage