import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [boardStats, setBoardStats] = useState(null); // { completion: 0, visible: false }
    const [showMobileProgress, setShowMobileProgress] = useState(false);

    return (
        <LayoutContext.Provider value={{
            boardStats,
            setBoardStats,
            showMobileProgress,
            setShowMobileProgress
        }}>
            {children}
        </LayoutContext.Provider>
    );
};
