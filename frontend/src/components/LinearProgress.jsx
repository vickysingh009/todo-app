import React, { useState, useEffect } from 'react';

const LinearProgress = ({ value }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="w-full px-4 pb-4 bg-purple-600/10 md:bg-transparent">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="text-2xl font-bold text-gray-900">{value}%</span>
                    <span className="text-sm text-gray-500 font-medium ml-2">Complete</span>
                </div>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LinearProgress;
