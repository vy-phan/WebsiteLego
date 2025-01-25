import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Kết nối tới MongoDB thành công")
    } catch (error) {
        console.log("Lỗi kết nối tới Mongo DB: ", error.message);
    }
}

