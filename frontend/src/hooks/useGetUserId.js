import axios from 'axios';
import { useState, useCallback } from 'react';

const useGetUserId = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserInfo = useCallback(async (userId) => {
        try {
            // Check if we already have this user's info cached
            if (userInfo[userId]) {
                return userInfo[userId];
            }

            setLoading(true);
            const response = await axios.get(`/api/users/${userId}`);
            
            if (response.data.success) {
                const userData = response.data.data;
                // Cache the user info
                setUserInfo(prev => ({
                       [userId]: userData
                }));
                return userData;
            }
            return null;
        } catch (error) {
            console.error('Error fetching user info:', error);
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [userInfo]);

    return {
        getUserInfo,
        userInfo,
        loading,
        error
    };
};

export default useGetUserId;