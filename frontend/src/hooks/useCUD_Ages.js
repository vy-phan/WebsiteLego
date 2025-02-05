import axios from "axios";

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('userLego');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const postAge = async (age) => {
    try {
        const response = await axios.post("/api/ages/", age, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi tạo age: ", error);
        throw error;
    }
};

export const updateAge = async (id, age) => {
    try {
        const response = await axios.put(`/api/ages/${id}`, age, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi cập nhật age: ", error);
        throw error;
    }
};

export const deleteAge = async (id) => {
    try {
        const response = await axios.delete(`/api/ages/${id}`, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi xóa age: ", error);
        throw error;
    }
};

export default { postAge, updateAge, deleteAge };
