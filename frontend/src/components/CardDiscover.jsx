import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import useGetAges from '../hooks/useGetAges';
import useCart from '../hooks/useCart';
import getLocalUser from '../context/getLocalUser';
import { useState } from 'react';
import { useCartContext } from '../context/CartContext';

const CardDiscover = ({ product }) => {
    const { ages } = useGetAges();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const { fetchCartCount } = useCartContext();

    const user = getLocalUser();
    const userId = user?._id;

    const ageItem = ages.filter((ag) => ag._id === product.age);
    const age = ageItem[0]?.ageRange;

    const handleAddToCart = async () => {
        if (!userId) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return;
        }

        setIsAdding(true);
        const result = await addToCart(userId, product._id, 1);
        
        if (result.success) {
            alert('Thêm vào giỏ hàng thành công!');
            fetchCartCount(); // Refresh số lượng giỏ hàng
        } else {
            alert('Lỗi khi thêm vào giỏ: ' + (result.message || 'Có lỗi xảy ra'));
        }

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    }

    return (
        <div className="group relative block overflow-hidden h-full">
            <Link to={`/detail/${product._id}`} className="block">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full rounded-bl-3xl rounded-tr-3xl object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />
            </Link>

            <div className="absolute top-0 right-0 p-2">
                <span className="bg-indigo-500 inline-block px-2 py-1 rounded-full text-xs font-medium text-white">
                    {age}
                </span>
            </div>

            <div className="relative border border-gray-100 bg-white p-6">
                <strong className="text-2xl text-gray-700">
                    $ {product.price}
                </strong>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">{product.name}</h3>

                <p className="mt-1.5 text-sm line-clamp-3 text-gray-700">
                    {product.description}
                </p>

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`block w-full rounded ${isAdding ? 'bg-gray-300' : 'bg-gray-100'} px-2 py-1.5 text-xs font-medium text-gray-900 transition hover:scale-105 ${isAdding ? 'cursor-not-allowed' : ''}`}
                    >
                        <FaCartPlus className={`inline-block ${isAdding ? 'animate-spin' : ''}`} /> 
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </button>

                    {/* <button
                        type="button"
                        className="block w-full rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white transition hover:scale-105"
                    >
                        Buy Now
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default CardDiscover;