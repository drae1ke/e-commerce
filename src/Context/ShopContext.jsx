import React from "react";
import { createContext, useMemo, useState, useCallback, useEffect } from "react";
import axiosClient from '../api/axiosClient';

export const ShopContext = createContext(null);
const ShopProvider = (props ) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cartItemsById, setCartItemsById] = useState({});

    const refreshProducts = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axiosClient.get('/products');
            const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
            // Normalize minimal fields we rely on across UI components
            const normalizeCategory = (raw) => {
                const value = (raw || '').toString().trim().toLowerCase();
                if (!value) return 'others';
                // computers
                const computerAliases = ['computer', 'computers', 'pc', 'pcs', 'laptop', 'laptops', 'desktop', 'desktops'];
                if (computerAliases.includes(value)) return 'computer';
                // phones
                const phoneAliases = ['phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'smartphones'];
                if (phoneAliases.includes(value)) return 'phone';
                // accessories (also handle common misspellings)
                const accessoryAliases = ['accessory', 'accessories', 'accesory', 'accesories', 'peripheral', 'peripherals'];
                if (accessoryAliases.includes(value)) return 'accessory';
                return 'others';
            };

            const normalized = list.map((p) => {
                const id = p._id != null ? p._id : p.id;
                const price = typeof p.price === 'string' ? Number(p.price) : p.price;
                const images = Array.isArray(p.images) ? p.images : [];
                const image = p.image || images[0] || '';
                // Support both isNewArrival and isNewProduct flags
                const isNewArrival = p.isNewArrival != null ? p.isNewArrival : !!p.isNewProduct;
                const normalizedCategory = normalizeCategory(p.category);
                return { ...p, id, price, image, images, isNewArrival, normalizedCategory };
            });
            setProducts(normalized);
        } catch (e) {
            setError('Failed to load products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshProducts();
    }, [refreshProducts]);

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
    }, [cartItemsById, products]);

    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const cartSubtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0), [cartItems]);

    const contextValue = {
        products,
        loading,
        error,
        refreshProducts,
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