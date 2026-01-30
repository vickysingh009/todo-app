import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import { FaSignOutAlt, FaBars, FaTimes, FaCheckDouble, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LinearProgress from './LinearProgress';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { boardStats, showMobileProgress, setShowMobileProgress } = useLayout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md sticky top-0 z-50 flex-shrink-0 transition-height duration-300 relative">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Logo Area */}
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold tracking-wide text-white drop-shadow-sm leading-tight">TaskFlow</span>
                                </div>
                                <span className="text-[10px] text-purple-100 font-medium tracking-wider uppercase leading-none">Stay productive</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-6">
                        {currentUser ? (
                            <>
                                <div className="hidden md:flex items-center space-x-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                                    <span className="text-sm font-medium text-white/90">{currentUser.email}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
                                >
                                    <FaSignOutAlt />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-white/90 hover:text-white font-medium text-sm transition-colors">Login</Link>
                                <Link to="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors shadow-sm">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Progress Toggle - Centered at Bottom */}
            {boardStats && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowMobileProgress(!showMobileProgress);
                    }}
                    className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 p-1.5 text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full transition-all shadow-lg border-2 border-white z-10"
                >
                    {showMobileProgress ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                </button>
            )}

            {/* Mobile Progress Bar (Slide Down) */}
            {boardStats && showMobileProgress && (
                <div className="md:hidden w-full bg-white border-b border-gray-100 animate-slideDown">
                    <LinearProgress value={boardStats.completion} />
                </div>
            )}
        </nav>
    );
};


export default Navbar;
