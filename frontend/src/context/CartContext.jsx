import React, { createContext, useState, useContext, useEffect } from 'react';
import useCart from '../hooks/useCart';
import getLocalUser from './getLocalUser';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const { getCart } = useCart();
    const user = getLocalUser();

    const fetchCartCount = async () => {
        if (user?._id) {
            const result = await getCart(user._id);
            if (result.success) {
                const totalQuantity = result.data.items.reduce((sum, item) => sum + item.quantity, 0);
                setCartItemCount(totalQuantity);
            }
        }
    };

    // Fetch initial cart count
    useEffect(() => {
        fetchCartCount();
    }, [user?._id]);

    return (
        <CartContext.Provider value={{ cartItemCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
