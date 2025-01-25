import mongoose from "mongoose";

const ageSchema = new mongoose.Schema({
    ageRange: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Age = mongoose.model('Age', ageSchema)
export default Age