import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useEffect } from "react";
import useGetAges from '../hooks/useGetAges';


const CardProduct = ({ name, description, price, image, age }) => {
  const { ages, loading, error, fetchAges } = useGetAges();

  useEffect(() => {
    fetchAges();
  }, []);


  const ageItem = ages.filter((ag) => ag._id === age);
  console.log("ageItem ne: " , ageItem[0]?.ageRange);
    
  
  
  

  if (loading) return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>;
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;


  return (
    <div className="group relative block overflow-hidden">
      <span
        className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white"
      >
        10%
      </span>

      <img
        src={image}
        alt={name}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 -ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          <span className="text-sm text-gray-500 line-through">
            ${(price * (100 + 10) / 100).toFixed(2)}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>

        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FaStar className='text-yellow-400' />
            <span className="text-sm text-gray-700"></span>
          </div>

          <div className="flex items-center gap-1">
            <FaBirthdayCake className='text-yellow-400' />
            <span className="text-sm text-gray-700">{ageItem[0]?.ageRange}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="flex items-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 w-full"
          >
            <FaCartPlus />
            Add to Cart
          </button>

          <button
            className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct