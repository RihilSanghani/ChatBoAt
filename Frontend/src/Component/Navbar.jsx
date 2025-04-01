import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { LogOut, Menu, MessageCircle, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { logout, authUser } = useAuthStore()
    let isSignedIn = false;
    if (authUser) isSignedIn = true;
    return (
        <>
            <nav className="bg-gray-900 text-gray-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left Side: Logo */}
                        <Link to='/' className="flex items-center">
                            <MessageCircle className="text-blue-500 w-6 h-6" />
                            <h1 className="ml-2 text-xl font-bold text-gray-200 hidden md:block">
                                FriendBoAt
                            </h1>
                        </Link>

                        {/* Right Side: Buttons */}
                        <div className="hidden md:flex items-center space-x-6">
                            {isSignedIn ? (
                                <>
                                    <Link to='/settings'>
                                        <button className="flex items-center space-x-1 hover:text-gray-300 transition">
                                            <Settings className="w-5 h-5" />
                                            <span>Settings</span>
                                        </button>
                                    </Link>
                                    <Link to='/profile'>
                                        <button className="flex items-center space-x-1 hover:text-gray-300 transition">
                                            <User className="w-5 h-5" />
                                            <span>Profile</span>
                                        </button>
                                    </Link>
                                    <button onClick={logout} className="flex items-center space-x-1 text-red-500 hover:text-red-400 transition">
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="hover:text-gray-300 transition">Login</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="hover:text-gray-300 transition">Signup</button>
                                    </Link>
                                    <Link to="/settings">
                                        <button className="flex items-center space-x-1 hover:text-gray-300 transition">
                                            <Settings className="w-5 h-5" />
                                            <span>Settings</span>
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
                        {isSignedIn ? (
                            <>
                                <Link to='/settings'>
                                    <button className="flex items-center justify-center space-x-2 px-4 py-2 w-full hover:bg-gray-800 rounded-md">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </Link>
                                <Link to='/profile'>
                                    <button className="flex items-center justify-center space-x-2 px-4 py-2 w-full hover:bg-gray-800 rounded-md">
                                        <User className="w-5 h-5" />
                                    </button>
                                </Link>
                                <button onClick={logout} className="flex items-center justify-center space-x-2 px-4 py-2 w-full text-red-500 hover:text-red-400 hover:bg-gray-800 rounded-md">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <button className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-800 rounded-md">
                                        <span>Login</span>
                                    </button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-800 rounded-md">
                                        <span>Signup</span>
                                    </button>
                                </Link>
                                <Link to='/settings'>
                                    <button className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-800 rounded-md">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar