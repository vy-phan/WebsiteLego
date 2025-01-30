import React, { useState, useEffect } from 'react';
import { FaUser, FaHistory, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import getLocalUser from '../context/getLocalUser';
import useOrder from '../hooks/useOrder';
import useLogout from '../hooks/useLogout';

const Profile = () => {
    const userLocal = getLocalUser();
    const { orders,  getOrdersByUser } = useOrder();

    const logout = useLogout();
    
    if (!userLocal) {
        return null;
    }

    const handleLogout = () => {
        logout();
    };


    useEffect(() => {
        getOrdersByUser(userLocal._id);
    },[])

    const [activeTab, setActiveTab] = useState('profile');


  

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-blue-600 p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={userLocal?.avatar || "https://64.media.tumblr.com/163c5451347519969b68e105be46277f/5932f04bd21255dc-ac/s500x750/341f31c756e00bd63280add751a2b88545fbfd7d.png"}
                                alt={userLocal?.username}
                                className="w-20 h-20 rounded-full border-4 border-white"
                            />
                            <div className="text-white">
                                <h1 className="text-2xl font-bold">{userLocal?.username}</h1>
                                <p className="text-blue-100">{userLocal?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 ${
                                    activeTab === 'profile'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <FaUser />
                                <span>Profile Information</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 ${
                                    activeTab === 'orders'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <FaHistory />
                                <span>Order History</span>
                            </button>
                        </nav>
                    </div>

                    {/* Content Sections */}
                    <div className="p-6">
                        {/* Profile Information Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">Personal Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Username</label>
                                            <p className="mt-1 text-gray-900">{userLocal?.username || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Email</label>
                                            <p className="mt-1 text-gray-900">{userLocal?.email || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Role</label>
                                            <p className="mt-1 text-gray-900">{userLocal?.role || 'User'}</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleLogout}
                                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                                >
                                    <FaSignOutAlt />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}

                        {/* Order History Section */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                {orders.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">
                                        No orders found
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-gray-50 p-6 rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold">${order.priceOrder.toFixed(2)}</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                                        order.status === 'Delivered'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-gray-200">
                                                {order.products.map((item) => (
                                                    <div key={item._id} className="py-4 flex items-center space-x-4">
                                                        <img
                                                            src={item.productId.image}
                                                            alt={item.productId.name}
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">{item.productId.name}</h4>
                                                            <p className="text-sm text-gray-600">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                            <p className="text-sm font-medium">
                                                                ${item.productId.price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;