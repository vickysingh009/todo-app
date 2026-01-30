import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(async (config) => {
    if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Optional: Trigger logout via a custom event or direct auth.signOut() if appropriate,
        // but auth state changes are usually handled by onAuthStateChanged.
        // However, if the token is invalid on backend but valid on frontend, we might need to force logout.
        if (auth && auth.currentUser) {
            auth.signOut();
        }
    }
    return Promise.reject(error);
});

export default api;
