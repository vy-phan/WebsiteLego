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

export const postProduct = async (product) => {
    try {
        const response = await axios.post("/api/products/", product, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi tạo product: ", error);
        return { success: false, message: "Lỗi tạo product", error };
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`/api/products/${id}`, product, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi cập nhật product: ", error);
        return { success: false, message: "Lỗi cập nhật product", error };
    }
};

export const deleteProduct= async (id) => {
    try {
        const response = await axios.delete(`/api/products/${id}`, getAuthHeaders());
        return response.data.data;
    } catch (error) {
        console.error("Lỗi xóa product: ", error);
        return { success: false, message: "Lỗi xóa product", error };
    }
};

export default { postProduct, updateProduct, deleteProduct };
