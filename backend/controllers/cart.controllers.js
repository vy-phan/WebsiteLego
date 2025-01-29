import Cart from '../models/cart.models.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Tìm giỏ hàng của user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Nếu chưa có giỏ hàng thì tạo mới
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // Nếu đã có giỏ hàng, kiểm tra sản phẩm đã tồn tại chưa
            const existingItem = cart.items.find(item => 
                item.productId.toString() === productId
            );

            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingItem.quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        
        // Populate thông tin sản phẩm
        const populatedCart = await Cart.findById(cart._id)
            .populate('items.productId');

        res.status(200).json({
            success: true,
            data: populatedCart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Lấy giỏ hàng của user
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        let cart = await Cart.findOne({ userId })
            .populate('items.productId');

        if (!cart) {
            // Tạo giỏ hàng mới nếu chưa có
            cart = new Cart({
                userId,
                items: []
            });
            await cart.save();
        }

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(item => 
            item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        item.quantity = quantity;
        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate('items.productId');

        res.status(200).json({
            success: true,
            data: updatedCart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(item => 
            item.productId.toString() !== productId
        );

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate('items.productId');

        res.status(200).json({
            success: true,
            data: updatedCart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
