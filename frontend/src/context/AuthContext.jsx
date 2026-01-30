import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

import Loading from '../components/Loading';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col p-4">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Firebase Not Configured</h1>
                <p className="text-gray-700 mb-4 text-center">
                    Please update the <code>frontend/.env</code> file with your Firebase credentials.
                </p>
                <div className="bg-white p-4 rounded shadow text-sm overflow-auto max-w-lg w-full">
                    <pre>
                        VITE_FIREBASE_API_KEY=...{"\n"}
                        VITE_FIREBASE_AUTH_DOMAIN=...{"\n"}
                        VITE_FIREBASE_PROJECT_ID=...
                    </pre>
                </div>
            </div>
        );
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        }, (error) => {
            console.error("AuthProvider: Auth Error:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        logout
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
