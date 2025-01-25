import Order from "../models/orders.models.js";
import mongoose from "mongoose";
import User from "../models/users.models.js";
import Product from "../models/products.models.js";

export const createOrder = async (req, res) => {
    try {
        const order = req.body

        if (!order.userId || !order.productIds || !order.quantity) {
            return res.status(400).json({success: false, message: "Vui lòng cung cấp tất cả thông tin"})
        }

        const user = await User.findById(order.userId)
        if (!user) {
            return res.status(404).json({success: false, message: "Tài khoản không tìm thấy"})
        }

        const newOrder = await Order.create({
            userId: order.userId,
            productIds: order.productIds,
            quantity: order.quantity
        })
        res.status(200).json({success: true, data: order})
    } catch (error) {
        console.error("Lỗi tạo đơn hàng: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo đơn hàng", error})
    }
}

export const getOrdersByUser = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const orders = await Order.find({userId: id})
        res.status(200).json({success: true, data: orders})
    } catch (error) {
        console.error("Lỗi lay đơn hàng theo tài khoản: ", error)
        res.status(500).json({success: false, message: "Lỗi lay đơn hàng theo tài khoản", error})
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({success: true, data: orders})
    } catch (error) {
        console.error("Lỗi lay danh sách đơn hàng: ", error)
        res.status(500).json({success: false, message: "Lỗi lay danh sách đơn hàng", error})
    }
}

export const updateOrderById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({success: true, data: order})
    } catch (error) {
        console.error("Lỗi cập nhật đơn hàng theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi cập nhật đơn hàng theo ID", error})
    }
}

export const deleteOrderById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const order = await Order.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Xóa đơn hàng thành công"})
    } catch (error) {
        console.error("Lỗi xóa đơn hàng theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi xóa đơn hàng theo ID", error})
    }
}