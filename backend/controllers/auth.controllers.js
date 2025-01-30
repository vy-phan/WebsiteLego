import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import tokenGenerate from "../utils/tokenGenerate.js";

export const register = async (req, res) => {
    try {
        const {username, email, password , role } = req.body

        // kiểm tra điền đủ thông tin 
        if(!username || !email || !password){
            return res.status(400).json({success: false, message: "Vui loại nhập day du thong tin"})
        }

        // kiểm tra có tồn tại user này với email có tồn tại đăng kí trước đó chưa
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success: false, message: "Tài khoản đã tìm thấy"})
        }

        // kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Sai định dạng email" })
        }

        // mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // vai trò
        const userRole = role || "user"

        const newUser = await User.create({username,email,password: hashedPassword,role: userRole})
        if(newUser){
            await tokenGenerate(newUser._id, res)
            await newUser.save()
            res.status(200).json({success: true, data: newUser})
        }
    } catch (error) {
        console.error("Lỗi tạo tài khoản: ", error)
        res.status(500).json({success: false, message: "Lỗi tạo tài khoản", error})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: false, message: "Tài khoản không tìm thấy"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({success: false, message: "Mật khẩu không chính xác"})
        }

        tokenGenerate(user._id, res)

        res.status(200).json({success: true, data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }})
    } catch (error) {
        console.error("Lỗi đăng nhập: ", error)
        res.status(500).json({success: false, message: "Lỗi đăng nhập", error})
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie('jwt','',{maxAge: 0})
        res.status(200).json({ message : "Logout successfull"})
    } catch (error) {
        console.log("Error : " , error.message);
        res.status(500).json({error:"internal Server Error"})
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra id có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        // Tìm user theo id
        const user = await User.findById(id).select('-password'); // Loại bỏ trường password
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        // Trả về thông tin user
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Lỗi lấy thông tin người dùng: ", error);
        res.status(500).json({ success: false, message: "Lỗi lấy thông tin người dùng", error });
    }
};

