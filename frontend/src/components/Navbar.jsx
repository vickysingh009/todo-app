import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaBars, FaTimes, FaCheckDouble } from 'react-icons/fa';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Area */}
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm shadow-sm ring-1 ring-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-wide text-white drop-shadow-sm">To-Do App</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            {currentUser ? (
                                <>
                                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-black/10 border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                        <span className="text-sm font-medium">{currentUser.email}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10 hover:border-white/30 hover:shadow-lg active:scale-95"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
                        >
                            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-2 pb-4 space-y-2 bg-indigo-700/50 backdrop-blur-md">
                    {currentUser ? (
                        <>
                            <div className="block px-4 py-3 rounded-lg bg-black/10 text-sm border border-white/5">
                                <span className="text-white/60 block text-xs uppercase tracking-wider mb-1">Signed in as</span>
                                <span className="font-medium text-white">{currentUser.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-white/10 transition-colors text-red-200 hover:text-red-100"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <Link
                                to="/login"
                                className="block text-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="block text-center px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
