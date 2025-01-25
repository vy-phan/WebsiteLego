import Category from "../models/categories.models.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
    try {
        const {name, description} = req.body

        if(!name || !description){
            return res.status(400).json({success: false, message: "Vui loại nhập day du thông tin"})
        }

        const category = await Category.create({name, description})
        res.status(200).json({success: true, data: category})
    } catch (error) {
        console.error("Loi tao category: ", error)
        res.status(500).json({success: false, message: "Loi tao category", error})
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({success: true, data: categories})
    } catch (error) {
        console.error("Loi lay danh sach category: ", error)
        res.status(500).json({success: false, message: "Loi lay danh sach category", error})
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const category = await Category.findById(id)
        res.status(200).json({success: true, data: category})
    } catch (error) {
        console.error("Loi lay category theo ID: ", error)
        res.status(500).json({success: false, message: "Loi lay category theo ID", error})
    }
}

export const deleteCategoryById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const category = await Category.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Xoa category thành công"})
    } catch (error) {
        console.error("Loi xoa category theo ID: ", error)
        res.status(500).json({success: false, message: "Loi xoa category theo ID", error})
    }
}

export const updateCategoryById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }

        const category = await Category.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({success: true, data: category})
    } catch (error) {
        console.error("Loi cap nhat category theo ID: ", error)
        res.status(500).json({success: false, message: "Loi cap nhat category theo ID", error})
    }
}