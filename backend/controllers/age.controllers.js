import Age from "../models/ages.models.js";
import mongoose from "mongoose";

export const createAge = async (req, res) => {
    try {
        const {ageRange} = req.body
        const age = await Age.create({ageRange})
        res.status(200).json({success: true, data: age})
    } catch (error) {
        console.error("Lỗi tạo age: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo age", error})
    }
}

export const getAges = async (req, res) => {
    try {
        const ages = await Age.find()
        res.status(200).json({success: true, data: ages})
    } catch (error) {
        console.error("Lỗi lay danh sách age: ", error)
        res.status(500).json({success: false, message: "Lỗi lay danh sách age", error})
    }
}

export const getAgesById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const age = await Age.findById(id)
        res.status(200).json({success: true, data: age})
    } catch (error) {
        console.error("Lỗi lay age theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi lay age theo ID", error})
    }
}

export const deleteAgeById = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success: false, message: "ID không hợp lệ"})
        }
        const age = await Age.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Xóa age thành công"})
    } catch (error) {
        console.error("Lỗi xóa age theo ID: ", error)
        res.status(500).json({success: false, message: "Lỗi xóa age theo ID", error})
    }
}