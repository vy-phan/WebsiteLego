import React, { useEffect } from 'react'
import { FaCartPlus } from 'react-icons/fa6'
import useGetAges from '../hooks/useGetAges';
import useGetCategories from '../hooks/useGetCategories';
import { Link } from 'react-router-dom';

const CardDiscover = ({ product }) => {
    const { ages, loading: loadingAges, error: errorAges, fetchAges } = useGetAges();
    const { categories, loading: loadingCategories, error: errorCategories, fetchCategories } = useGetCategories();

    useEffect(() => {
        fetchAges();
        fetchCategories();
    }, []);


    const ageItem = ages.filter((ag) => ag._id === product.age);
    const age = ageItem[0]?.ageRange;

    return (
        <a href="#" className="group relative block overflow-hidden h-full">
            <Link to={`/detail/${product._id}`}>
                <img
                    src={product.image}
                    alt=""
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

                <form className="mt-4 flex gap-2">
                    <button
                        className="block w-full rounded bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-900 transition hover:scale-105"
                    >
                        <FaCartPlus className="inline-block" /> Add to Cart
                    </button>

                    <button
                        type="button"
                        className="block w-full rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white transition hover:scale-105"
                    >
                        Buy Now
                    </button>
                </form>
            </div>
        </a>
    )
}

export default CardDiscover