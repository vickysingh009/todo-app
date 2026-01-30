import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
