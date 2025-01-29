import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controllers/cart.controllers.js';

const router = express.Router();

// Thêm sản phẩm vào giỏ hàng
router.post('/add', addToCart);

// Lấy giỏ hàng của user
router.get('/:userId', getCart);

// Cập nhật số lượng sản phẩm
router.put('/:userId/update', updateCartItem);

// Xóa sản phẩm khỏi giỏ
router.delete('/:userId/:productId', removeFromCart);

export default router;
