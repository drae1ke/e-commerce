import React from "react";
import { createContext, useMemo, useState, useCallback } from "react";
import products from '../assets/products';

export const ShopContext = createContext(null);
const ShopProvider = (props ) => {
    const [cartItemsById, setCartItemsById] = useState({});

    const addToCart = useCallback((productId, quantity = 1) => {
        setCartItemsById(prev => {
            const prevQty = prev[productId]?.quantity || 0;
            return { ...prev, [productId]: { productId, quantity: prevQty + quantity } };
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItemsById(prev => {
            if (!prev[productId]) return prev;
            const { [productId]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        setCartItemsById(prev => {
            if (quantity <= 0) {
                const { [productId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [productId]: { productId, quantity } };
        });
    }, []);

    const clearCart = useCallback(() => setCartItemsById({}), []);

    const cartItems = useMemo(() => {
        return Object.values(cartItemsById)
            .map(({ productId, quantity }) => {
                const product = products.find(p => String(p.id) === String(productId));
                return product ? { ...product, quantity } : null;
            })
            .filter(Boolean);
    }, [cartItemsById]);

    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const cartSubtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0), [cartItems]);

    const contextValue = {
        products,
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    ); 
}
export default ShopProvider;