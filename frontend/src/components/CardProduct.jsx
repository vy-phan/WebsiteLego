import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import useGetAges from '../hooks/useGetAges';
import useCart from '../hooks/useCart';
import getLocalUser from '../context/getLocalUser';
import { useCartContext } from '../context/CartContext';

const CardProduct = ({ _id, name, description, price, image, age }) => {
  const { ages, loading, error, fetchAges } = useGetAges();
  const { addToCart } = useCart();
  const { fetchCartCount } = useCartContext();
  const [isAdding, setIsAdding] = useState(false);

  const user = getLocalUser();
  const userId = user?._id;

  useEffect(() => {
    fetchAges();
  }, []);

  const ageItem = ages.filter((ag) => ag._id === age);

  const handleAddToCart = async () => {
    if (!userId) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }

    setIsAdding(true);
    const result = await addToCart(userId, _id, 1);
    
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

  if (loading) return <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <div className="group relative block overflow-hidden">
      <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
        10%
      </span>
      <Link to={`/detail/${_id}`}>
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 -ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
        />
      </Link>

      <div className="relative border border-gray-100 bg-white p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
        </div>

        <h3 className="mt-4 text-lg font-medium text-gray-900">
          <Link to={`/detail/${_id}`} className="hover:text-blue-600">
            {name}
          </Link>
        </h3>

        <p className="mt-1.5 text-sm text-gray-700 line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-gray-600" />
            <span className="text-sm text-gray-600">{ageItem[0]?.ageRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 text-white transition rounded-lg ${isAdding
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }  `
          }
        >
          <FaCartPlus className={isAdding ? 'animate-spin' : ''} />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default CardProduct;