import Order from "../models/orders.models.js";
import mongoose from "mongoose";
import User from "../models/users.models.js";
import Product from "../models/products.models.js";
import Cart from "../models/cart.models.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, cartId } = req.body;

        if (!userId || !cartId) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp userId và cartId" });
        }

        // Kiểm tra user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Tài khoản không tìm thấy" });
        }

        // Lấy thông tin giỏ hàng
        const cart = await Cart.findById(cartId).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ success: false, message: "Giỏ hàng không tồn tại hoặc trống" });
        }

        // Kiểm tra số lượng sản phẩm trong kho
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: `Sản phẩm ${item.productId} không tồn tại` 
                });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Sản phẩm ${product.name} không đủ số lượng trong kho` 
                });
            }
        }

        // Tạo đơn hàng mới
        const newOrder = await Order.create({
            userId: userId,
            products: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            })),
            priceOrder: req.body.priceOrder || cart.total, // Sử dụng giá từ frontend hoặc tính từ cart
            status: 'pending'
        });

        // Cập nhật số lượng sản phẩm trong kho
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { quantity: -item.quantity } }
            );
        }

        // Xóa giỏ hàng sau khi đặt hàng thành công
        await Cart.findByIdAndDelete(cartId);

        // Trả về kết quả
        res.status(201).json({
            success: true,
            message: "Đặt hàng thành công",
            data: newOrder
        });
    } catch (error) {
        console.error("Lỗi tạo đơn hàng: ", error);
        res.status(500).json({ success: false, message: "Lỗi tạo đơn hàng", error });
    }
}

export const getOrdersByUser = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const orders = await Order.find({userId: id}).populate("products.productId")
        res.status(200).json({success: true, data: orders})
    } catch (error) {
        console.error("Lỗi lay đơn hàng theo tài khoản: ", error)
        res.status(500).json({success: false, message: "Lỗi lay đơn hàng theo tài khoản", error})
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("products.productId")
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