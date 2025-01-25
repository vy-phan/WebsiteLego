import Product from "../models/products.models.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.error("Lỗi lay danh sách sản phẩm: ", error)
        res.status(500).json({success: false, message: "Lỗi lay danh sách sản phẩm", error})
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const product = await Product.findById(id)
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error("Lỗi lay sản phẩm theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi lay sản phẩm theo ID", error})
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body
        if(!product.name || !product.description || !product.image || !product.price || !product.stock || !product.category || !product.age){
            return res.status(400).json({success: false, message: "Vui lòng cung cấp tất cả thông tin"})
        }
        const newProduct = await Product.create(product)
        res.status(200).json({success: true, data: newProduct})
    } catch (error) {
        console.error("Lỗi tạo sản phẩm: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo sản phẩm", error})
    }
}

export const updateProductById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi cập nhật sản phẩm theo ID", error})
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Xóa sản phẩm thành công"})
    } catch (error) {
        console.error("Lỗi xóa sản phẩm theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi xóa sản phẩm theo ID", error})
    }
}

