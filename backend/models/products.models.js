import mongoose from "mongoose";    

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    age: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Age',
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
export default Product