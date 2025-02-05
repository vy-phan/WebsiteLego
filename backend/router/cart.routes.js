import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controllers/cart.controllers.js';
import protectRouterToken from '../middleware/protectRouterToken.js';

const router = express.Router();

// Thêm sản phẩm vào giỏ hàng
router.post('/add', protectRouterToken,addToCart);

// Lấy giỏ hàng của user
router.get('/:userId',protectRouterToken, getCart);

// Cập nhật số lượng sản phẩm
router.put('/:userId/update', protectRouterToken,updateCartItem);

// Xóa sản phẩm khỏi giỏ
router.delete('/:userId/:productId', protectRouterToken,removeFromCart);

export default router;
