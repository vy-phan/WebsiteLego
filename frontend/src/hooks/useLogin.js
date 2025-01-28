import axios from "axios";
import { useState } from "react";

const useLogin = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password
            });
            
            const userData = {
                ...response.data.data,
                token: response.data.token,
                isAuthenticated: true,
                loginTime: new Date().toISOString()
            };
            
            setUser(userData);
            // Store user data in localStorage with key 'userLego'
            localStorage.setItem('userLego', JSON.stringify(userData));
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during login");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setUser(null);
            localStorage.removeItem('userLego');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return { user, loading, error, login, logout };
};

export default useLogin;