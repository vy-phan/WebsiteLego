import axios from 'axios';

const useReview = () => {
    const postReview = async (review) => {
        try {
            if (!review.productId || !review.userId) {
                return { success: false, message: "Vui lòng cung cấp tất cả thông tin" }
            }
            const response = await axios.post("/api/reviews/", review);
            return response.data.data;
        } catch (error) {
            console.error("Lỗi tạo review: ", error);
            return { success: false, message: "Lỗi tạo review", error };
        }
    };

    const updateReview = async (id, review) => {
        try {
            if (!id || !review.productId || !review.userId) {
                return { success: false, message: "Vui lòng cung cấp tất cả thông tin" }
            }
            const response = await axios.put(`/api/reviews/${id}`, review);
            return response.data.data;
        } catch (error) {
            console.error("Lỗi cập nhật review: ", error);
            return { success: false, message: "Lỗi cập nhật review", error };
        }
    };

    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(`/api/reviews/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Lỗi xóa review: ", error);
            return { success: false, message: "Lỗi xóa review", error };
        }
    };


    const getReviews = async () => {
        try {
            const response = await axios.get("/api/reviews/");
            return response.data.data;
        } catch (error) {
            console.error("Lỗi lấy review: ", error);
            return { success: false, message: "Lỗi lấy review", error };
        }
    };

    return {
        postReview,
        updateReview,
        deleteReview,
        getReviews
    };
};

export default useReview;