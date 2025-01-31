import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { error } = location.state || {};

    const handleRetry = () => {
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Payment Failed
                </h1>
                <p className="text-gray-600 mb-4">
                    We're sorry, but your payment could not be processed.
                </p>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleRetry}
                        className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                    
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
