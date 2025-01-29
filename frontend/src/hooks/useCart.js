import { useState } from 'react';
import axios from 'axios';

const useCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Thêm sản phẩm vào giỏ
    const addToCart = async (userId, productId, quantity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/cart/add', {
                userId,
                productId,
                quantity
            });
            return {
                success: true,
                data: response.data.data
            };
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding to cart');
            return {
                success: false,
                message: err.response?.data?.message
            };
        } finally {
            setLoading(false);
        }
    };

    // Lấy giỏ hàng
    const getCart = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/cart/${userId}`);
            return {
                success: true,
                data: response.data.data
            };
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching cart');
            return {
                success: false,
                message: err.response?.data?.message
            };
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật số lượng
    const updateQuantity = async (userId, productId, quantity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`/api/cart/${userId}/update`, {
                productId,
                quantity
            });
            return {
                success: true,
                data: response.data.data
            };
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating quantity');
            return {
                success: false,
                message: err.response?.data?.message
            };
        } finally {
            setLoading(false);
        }
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = async (userId, productId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`/api/cart/${userId}/${productId}`);
            return {
                success: true,
                data: response.data.data
            };
        } catch (err) {
            setError(err.response?.data?.message || 'Error removing item');
            return {
                success: false,
                message: err.response?.data?.message
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        addToCart,
        getCart,
        updateQuantity,
        removeFromCart
    };
};

export default useCart;
