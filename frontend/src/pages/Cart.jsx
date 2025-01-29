import React, { useEffect, useState } from 'react';
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
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.productId._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.productId.name}</h3>
                      <p className="ml-4">${formatPrice(item.productId.price * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.productId.description}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border rounded p-1"
                      />
                      
                      <button
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="font-medium text-red-600 hover:text-red-500 flex items-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Price</p>
            <p>$ {formatPrice(totalPrice)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <label htmlFor="discount-code" className="sr-only">
              Discount code
            </label>
            <div className="flex justify-end">
              <input
                type="text"
                name="discount-code"
                id="discount-code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount code"
                className="block  px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="mt-6 ">
            <button
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Payment
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Continue shopping<span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;