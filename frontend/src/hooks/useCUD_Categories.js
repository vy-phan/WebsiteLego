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

export const postCategory = async (category) => {
    try {
        const response = await axios.post("/api/categories/", category, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi tạo category: ", error);
        return { success: false, message: "Lỗi tạo category", error };
    }
};

export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`/api/categories/${id}`, category, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi cập nhật category: ", error);
        return { success: false, message: "Lỗi cập nhật category", error };
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`/api/categories/${id}`, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi xóa category: ", error);
        return { success: false, message: "Lỗi xóa category", error };
    }
};

export default { postCategory, updateCategory, deleteCategory };
