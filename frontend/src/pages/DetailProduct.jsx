import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaCartPlus } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import useGetAges from '../hooks/useGetAges';
import useGetCategories from '../hooks/useGetCategories';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [comments, setComments] = useState([
        {
            name: 'John Doe',
            comment: 'This product is great!',
        },
        {
            name: 'Jane Smith',
            comment: 'I also like this product!',
        },
    ]);
    const [newComment, setNewComment] = useState('');
    const { ages, loading: loadingAges, error: errorAges, fetchAges } = useGetAges();
    const { categories, loading: loadingCategories, error: errorCategories, fetchCategories } = useGetCategories();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
        fetchAges();
        fetchCategories();
    }, [id]);

    const handleAddToCart = () => {
        console.log('Adding to cart:', { productId: id, quantity });
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setComments([...comments, { name: 'You', comment: newComment }]);
        setNewComment('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-xl text-gray-600">Product not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaBirthdayCake className="text-gray-600" />
                        <span className="text-gray-600">Age: {ages.map((age) => age._id === product.age ? age.ageRange : null)} years</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-gray-600">4.5/5 (24 reviews)</span>
                    </div>

                    {categories.map((category) => category._id === product.category ? (
                        <span key={category._id} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                            {category.name}
                        </span>
                    ) : null
                    )}

                    <p className="text-gray-600">{product.description}</p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-x">{quantity}</span>
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaCartPlus />
                            Add to Cart
                        </button>
                        <span className="text-gray-600">({product.stock} left)</span>
                    </div>

                    {/* Comments */}
                    <div className="mt-8 border-t pt-8">
                        <h2 className="text-xl font-bold mb-4">Comments</h2>
                        <form onSubmit={handleCommentSubmit}>
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    placeholder="Add a comment..."
                                    className="px-4 py-2 border rounded-lg w-full"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Comment
                                </button>
                            </div>
                        </form>
                        {comments.length > 0 ? (
                            <ul className="space-y-4 mt-4">
                                {comments.map((comment, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <img
                                            src="https://picsum.photos/200/300"
                                            alt="Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <p className="text-gray-900">{comment.name}</p>
                                            <p className="text-gray-600">{comment.comment}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-600">No comments yet</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;