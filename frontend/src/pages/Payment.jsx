import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useOrder from '../hooks/useOrder';
import useCart from '../hooks/useCart';
import getLocalUser from '../context/getLocalUser';
import { useCartContext } from '../context/CartContext';

const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
};

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getLocalUser();
    const { createOrder } = useOrder();
    const { deleteCart } = useCart();
    const { fetchCartCount } = useCartContext();
    const [loading, setLoading] = useState(false);

    // Get cart data from location state
    const cartData = location.state?.cartData;
    const discountCode = location.state?.discountCode;
    const totalPrice = location.state?.totalPrice;

    if (!cartData || !location.state) {
        navigate('/cart');
        return null;
    }

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const orderData = {
                userId: user?._id,
                cartId: cartData?._id,
                shippingAddress: values.address,
                phoneNumber: values.phone,
                discountCode: discountCode,
                priceOrder: totalPrice
            };

            const result = await createOrder(orderData);
            
            if (result.success) {
                // Xóa giỏ hàng sau khi đặt hàng thành công
                try {
                    if (cartData?._id) {
                        const deleteResult = await deleteCart(cartData._id);
                        if (!deleteResult.success) {
                            console.error('Failed to delete cart:', deleteResult.message);
                        }
                    }
                } catch (deleteError) {
                    console.error('Error deleting cart:', deleteError);
                }

                // Cập nhật số lượng giỏ hàng trong context
                await fetchCartCount();
                
                // Thông báo thành công
                alert('Order placed successfully!');
                
                // Chuyển đến trang orders
                navigate('/cart');
            }
        } catch (error) {
            alert('Order failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Nếu không có dữ liệu giỏ hàng, chuyển về trang cart
    if (!cartData || !cartData.items || cartData.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate('/discover')}
                >
                    Continue shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                <div className="space-y-4">
                    {cartData.items.map((item) => (
                        <div key={item.productId._id} className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img 
                                    src={item.productId.image} 
                                    alt={item.productId.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="ml-4">
                                    <h3 className="font-medium">{item.productId.name}</h3>
                                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium">
                                {formatPrice(item.productId.price * item.quantity)}
                            </p>
                        </div>
                    ))}
                    {discountCode && (
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-green-600">
                                <span>Discount code applied: {discountCode}</span>
                            </div>
                        </div>
                    )}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center font-bold text-xl">
                            <span>Total:</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping information</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onFinish({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        address: formData.get('address')
                    });
                }}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Full name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name || ''}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email || ''}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter phone number (e.g. 0912345678)"
                            title="Please enter a valid phone number (e.g. 0912345678 or 84912345678)"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            * Phone number must start with 03, 05, 07, 08, 09 or 84, and have 10 digits
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Shipping address
                        </label>
                        <textarea
                            name="address"
                            required
                            rows="4"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter shipping address"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Processing...' : 'Place order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;