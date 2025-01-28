import axios from "axios";

export const postAge = async (age) => {
    try {
        const response = await axios.post("/api/ages/", age);
        return response.data.data;
    } catch (error) {
        console.error("Lỗi tạo age: ", error);
        return { success: false, message: "Lỗi tạo age", error };
    }
};

export const updateAge = async (id, age) => {
    try {
        const response = await axios.put(`/api/ages/${id}`, age);
        return response.data.data;
    } catch (error) {
        console.error("Lỗi cập nhật age: ", error);
        return { success: false, message: "Lỗi cập nhật age", error };
    }
};

export const deleteAge = async (id) => {
    try {
        const response = await axios.delete(`/api/ages/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Lỗi xóa age: ", error);
        return { success: false, message: "Lỗi xóa age", error };
    }
};

export default { postAge, updateAge, deleteAge };
