import axios from "axios";
import { useState } from "react";

const useRegister = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/auth/signup", {
                username,
                email,
                password
            });
            
            const userData = {
                ...response.data.data,
                token: response.data.token,
                isAuthenticated: true,
                registrationTime: new Date().toISOString()
            };
            
            setUser(userData);
            // Store user data in localStorage with key 'userLego'
            localStorage.setItem('userLego', JSON.stringify(userData));
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during registration");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, register };
};

export default useRegister;