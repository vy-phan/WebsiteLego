import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaCartPlus } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import useGetAges from '../hooks/useGetAges';
import useGetCategories from '../hooks/useGetCategories';
import useCart from '../hooks/useCart';
import { useCartContext } from '../context/CartContext';
import getLocalUser from '../context/getLocalUser';
import useReview from '../hooks/useCUD_Reviews';
import useGetUserId from '../hooks/useGetUserId';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const quantityStock = product?.stock;
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [reviewUsers, setReviewUsers] = useState({});
    const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
    const { postReview, getReviews } = useReview();
    const { getUserInfo } = useGetUserId();
    const { ages, loading: loadingAges, error: errorAges, fetchAges } = useGetAges();
    const { categories, loading: loadingCategories, error: errorCategories, fetchCategories } = useGetCategories();
    const { addToCart } = useCart();
    const { fetchCartCount } = useCartContext();
    const user = getLocalUser();
    const userId = user?._id;
    const [isAdding, setIsAdding] = useState(false);

    // Fetch user information for reviews
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userMap = {};
            for (const review of reviews) {
                if (!reviewUsers[review.userId]) {
                    const userInfo = await getUserInfo(review.userId);
                    if (userInfo) {
                        userMap[review.userId] = userInfo;
                    }
                }
            }
            if (Object.keys(userMap).length > 0) {
                setReviewUsers(prev => ({ ...prev, ...userMap }));
            }
        };

        if (reviews.length > 0) {
            fetchUserInfo();
        }
    }, [reviews, getUserInfo]);

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

        const fetchReviews = async () => {
            const reviewsData = await getReviews();
            if (reviewsData) {
                // Filter reviews for current product
                const productReviews = reviewsData.filter(review => review.productId === id);
                setReviews(productReviews);
            }
        };

        fetchProduct();
        fetchReviews();
        fetchAges();
        fetchCategories();
    }, [id]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>Loading product...</p>
            </div>
        );
    }

    const handleAddToCart = async () => {
        if (!userId) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return;
        }

        setIsAdding(true);
        const result = await addToCart(userId, product._id, quantity);

        if (result.success) {
            alert('Thêm vào giỏ hàng thành công!');
            fetchCartCount();
        } else {
            alert('Lỗi khi thêm vào giỏ: ' + (result.message || 'Có lỗi xảy ra'));
        }

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    }

    const handleReviewChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value
        });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('Vui lòng đăng nhập để thêm đánh giá');
            return;
        }

        const reviewData = {
            userId: userId,
            productId: id,
            rating: parseInt(newReview.rating),
            comment: newReview.comment
        };

        const result = await postReview(reviewData);
        if (result.success !== false) {
            // Get user info for the new review
            const userInfo = await getUserInfo(reviewData.userId);
            if (userInfo) {
                setReviewUsers(prev => ({
                    ...prev,
                    [reviewData.userId]: userInfo
                }));
            }
            setReviews([...reviews, result]);
            setNewReview({ comment: '', rating: 5 });
        } else {
            alert('Lỗi khi thêm đánh giá: ' + (result.message || 'Có lỗi xảy ra'));
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    if (loading || loadingAges || loadingCategories) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorAges || errorCategories) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-xl text-gray-600">Something went wrong</p>
            </div>
        )
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
                        <span className="text-gray-600">{calculateAverageRating()}/5 ({reviews.length} reviews)</span>
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
                            disabled={isAdding}
                            className={`flex items-center gap-2 ${isAdding ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg transition-colors`}
                        >
                            <FaCartPlus />
                            {isAdding ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <span className="text-gray-600">({quantityStock !== product.stock ? (product.stock - quantity) : (product.stock)} left)</span>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-8 border-t pt-8">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        {userId && (
                            <form onSubmit={handleReviewSubmit} className="space-y-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <label className="text-gray-600">Rating:</label>
                                    <select
                                        name="rating"
                                        value={newReview.rating}
                                        onChange={handleReviewChange}
                                        className="border rounded px-2 py-1"
                                    >
                                        {[5, 4, 3, 2, 1].map(num => (
                                            <option key={num} value={num}>{num} stars</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="text"
                                        name="comment"
                                        value={newReview.comment}
                                        onChange={handleReviewChange}
                                        placeholder="Add a review..."
                                        className="px-4 py-2 border rounded-lg w-full"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        )}
                        {reviews.length > 0 ? (
                            <ul className="space-y-4">
                                {reviews.map((review, index) => (
                                    <li key={index} className="border-b pb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {reviewUsers[review.userId]?.username || 'Unknown User'}
                                                </span>
                                                <div className="flex text-yellow-400 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-2">{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;