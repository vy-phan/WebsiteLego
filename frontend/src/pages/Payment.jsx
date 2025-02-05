import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import useOrder from '../hooks/useOrder';
import useCart from '../hooks/useCart';
import getLocalUser from '../context/getLocalUser';
import { useCartContext } from '../context/CartContext';

// Replace with your own publishable key
const stripePromise = loadStripe('pk_test_51QnHGwHgCI1uEHCpq3Q5vPFW3M9jUDhE3wiX1GZphWstZl3Bd4VBEGIqgxNiKgDYsbyLEoauBghf8yftCfpChIVk00QaKLno2d');

const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
};

const CheckoutForm = ({ totalPrice, orderData, onSuccess, values, navigate }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        try {
            // 1. Create Payment Intent
            const response = await fetch('/api/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    amount: totalPrice
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment failed');
            }

            const data = await response.json();
            console.log('Payment Intent Response:', data);

            if (!data.clientSecret) {
                throw new Error('No client secret returned from the server');
            }

            // 2. Confirm payment
            console.log('Confirming payment with secret:', data.clientSecret);
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name || 'Anonymous',
                            email: values.email || '',
                            phone: values.phone || '',
                            address: {
                                line1: values.address || ''
                            }
                        }
                    }
                }
            );

            if (stripeError) {
                console.error('Stripe Error:', stripeError);
                setError(stripeError.message);
                navigate('/payment-failed', {
                    state: { error: stripeError.message }
                });
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded:', paymentIntent);
                setError(null);
                await onSuccess();
            } else {
                throw new Error('Payment was not successful');
            }
        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.message);
            navigate('/payment-failed', {
                state: { error: err.message }
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                padding: '10px 12px',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                        hidePostalCode: true
                    }}
                />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay ${formatPrice(totalPrice)}`}
            </button>
        </form>
    );
};

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getLocalUser();
    const { createOrder } = useOrder();
    const { deleteCart } = useCart();
    const { fetchCartCount } = useCartContext();
    const [loading, setLoading] = useState(false);

    // Get cart data from location state
    const cartData = location.state?.cartData;
    const discountCode = location.state?.discountCode;
    const totalPrice = location.state?.totalPrice;

    if (!cartData || !location.state) {
        navigate('/cart');
        return null;
    }

    const [values, setValues] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: ''
    });

    const handlePaymentSuccess = async () => {
        try {
            setLoading(true);
            const orderData = {
                userId: user?._id,
                cartId: cartData?._id,
                shippingAddress: values.address,
                phoneNumber: values.phone,
                discountCode: discountCode,
                priceOrder: totalPrice
            };

            const result = await createOrder(orderData);
            
            if (!result.success) {
                throw new Error('Failed to create order');
            }

            // Redirect to payment success page first
            navigate('/payment-success', {
                state: {
                    orderId: result.data._id,
                    orderAmount: totalPrice
                }
            });

            // Then handle cart deletion and state updates
            try {
                if (cartData?._id) {
                    await deleteCart(cartData._id);
                    // Update cart count
                    fetchCartCount();
                }
            } catch (error) {
                console.error('Error cleaning up cart:', error);
                // Don't redirect to failed page since payment and order were successful
                // Just log the error for debugging
            }
        } catch (error) {
            console.error('Error handling payment success:', error);
            navigate('/payment-failed', {
                state: { error: error.message || 'Failed to process order' }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Payment</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Information</h2>
                <p>Total price: {formatPrice(totalPrice)}</p>
                {discountCode && <p>Discount code: {discountCode}</p>}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        required
                        pattern="(84|0[3|5|7|8|9])+([0-9]{8})"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter phone number (e.g. 0912345678)"
                        title="Please enter a valid phone number (e.g. 0912345678 or 84912345678)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        * Phone number must start with 03, 05, 07, 08, 09 or 84, and have 10 digits
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Shipping address
                    </label>
                    <textarea
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter shipping address"
                    />
                </div>

                <Elements stripe={stripePromise} options={{
                    locale: 'en',
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#0570de',
                            colorBackground: '#ffffff',
                            colorText: '#30313d',
                            colorDanger: '#df1b41',
                            fontFamily: 'system-ui, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '4px',
                        }
                    }
                }}>
                    <CheckoutForm
                        totalPrice={totalPrice}
                        orderData={cartData}
                        onSuccess={handlePaymentSuccess}
                        values={values}
                        navigate={navigate}
                    />
                </Elements>
            </div>
            
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-800">Processing your order...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;