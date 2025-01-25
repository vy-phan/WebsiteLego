import Review from "../models/reviews.models.js";
import Product from "../models/products.models.js";
import User from "../models/users.models.js";
import mongoose from "mongoose";

export const createReviewByProductId = async (req, res) => {
    try {
        const review = req.body
        
        // kiem tra dien du thong tin
        if(!review.productId || !review.userId || !review.rating ){
            return res.status(400).json({success: false, message: "Vui lòng cung cấp tất cả thông tin"})
        }

        const product = await Product.findById(review.productId)
        if(!product){
            return res.status(404).json({success: false, message: "Sản phẩm không tìm thấy"})
        }

        const user = await User.findById(review.userId)
        if(!user){
            return res.status(404).json({success: false, message: "Tài khoản không tìm thấy"})
        }

        const newReview = await Review.create(review)
        res.status(200).json({success: true, data: newReview})
    } catch (error) {
        console.error("Lỗi tạo review: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo review", error})
    }
}

// export const getReviewsByProdudctId = async (req, res) => {
//     const {productId} = req.params
//     try {
//         const reviews = await Review.find({productId: productId})
//         if(!reviews){
//             return res.status(404).json({success: false, message: "Reviews không tìm thấy"})
//         }
//         res.status(200).json({success: true, data: reviews})
//     } catch (error) {
//         console.error("Lỗi lấy review: ", error)
//         res.status(500).json({success: false, message: "Lỗi lấy review", error})
//     }
// }

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json({success: true, data: reviews})
    } catch (error) {
        console.error("Lỗi tạo review: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo review", error})
    }
}

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const review = await Review.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({success: true, data: review})
    } catch (error) {
        console.error("Lỗi tạo review: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo review", error})
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const review = await Review.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Xóa review thành công"})
    } catch (error) {
        console.error("Lỗi xóa review: ", error)
        res.status(500).json({success: false, message: "Lỗi xóa review", error})
    }
}