


import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import client from '../../../shared/api/client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await client.get('/cart');
      setItems(res.data.items);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    const res = await client.post('/cart', { product_id: productId, quantity });
    setItems(res.data.items);
  }, []);

  const removeItem = useCallback(async (cartItemId) => {
    // optimistic removal so the UI + total update instantly
    setItems((prev) => prev.filter((i) => i.cart_item_id !== cartItemId));
    try {
      const res = await client.delete(`/cart/${cartItemId}`);
      setItems(res.data.items);
    } catch {
      refreshCart();
    }
  }, [refreshCart]);

  const updateQuantity = useCallback(async (cartItemId, quantity) => {
    if (quantity <= 0) return removeItem(cartItemId);
    // optimistic update -> line price + total recompute immediately
    setItems((prev) =>
      prev.map((i) => (i.cart_item_id === cartItemId ? { ...i, quantity } : i))
    );
    try {
      const res = await client.put(`/cart/${cartItemId}`, { quantity });
      setItems(res.data.items);
    } catch {
      refreshCart();
    }
  }, [removeItem, refreshCart]);

  // Derived from items -> always in sync with quantity changes (this was the price bug)
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0),
    [items]
  );
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, subtotal, count, loading, addToCart, updateQuantity, removeItem, refreshCart }),
    [items, subtotal, count, loading, addToCart, updateQuantity, removeItem, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);