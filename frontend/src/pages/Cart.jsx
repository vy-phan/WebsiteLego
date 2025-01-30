import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import getLocalUser from '../context/getLocalUser';
import { useCartContext } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { getCodeDiscount } from '../utils/code';

const formatPrice = (price) => {
  return Number(price).toFixed(2);
};

const Cart = () => {
  const user = getLocalUser();
  const userId = user?._id;
  const { getCart, updateQuantity, removeFromCart } = useCart();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useCartContext();
  const [discountCode, setDiscountCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    setLoading(true);
    const result = await getCart(userId);
    if (result.success) {
      setCart(result.data);
    }
    setLoading(false);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    // Validate quantity
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    if (newQuantity > 99) {
      newQuantity = 99;
    }

    const result = await updateQuantity(userId, productId, newQuantity);
    if (result.success) {
      fetchCart();
      fetchCartCount();
    } else {
      alert('Lỗi khi cập nhật số lượng: ' + (result.message || 'Có lỗi xảy ra'));
    }
  };

  const handleRemoveItem = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      const result = await removeFromCart(userId, productId);
      if (result.success) {
        fetchCart();
        fetchCartCount();
      } else {
        alert('Lỗi khi xóa sản phẩm: ' + (result.message || 'Có lỗi xảy ra'));
      }
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/payment', { 
      state: { 
        cartData: cart,
        discountCode: discountCode,
        totalPrice: totalPrice
      } 
    });
  };

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const totalPrice = getCodeDiscount(discountCode) ? total - (getCodeDiscount(discountCode)/100 * total) : total;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.productId._id} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-full h-full object-center object-cover rounded-md"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.productId.name}</h3>
                      <p className="ml-4">${formatPrice(item.productId.price * item.quantity)}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FaMinus className="text-gray-500" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FaPlus className="text-gray-500" />
                      </button>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border p-2 rounded"
            />
            {getCodeDiscount(discountCode) && (
              <span className="text-green-600">
                Discount : {getCodeDiscount(discountCode)}%
              </span>
            )}
          </div>

          <div className="border-t border-gray-200 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Total price</p>
              <p>${formatPrice(totalPrice)}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleProceedToCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;