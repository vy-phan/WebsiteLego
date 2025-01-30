import axios from "axios";
import { useState } from "react";

const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const createOrder = async (data) => {
        try {
            const response = await axios.post(`api/orders/`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const getOrdersByUser = async (userId) => {
        try {
            const response = await axios.get(`api/orders/user/${userId}`);
            setOrders(response.data.data);
            return response.data.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };


    return {
        orders,
        createOrder,
        getOrdersByUser
    };
};

export default useOrder;
