import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'haircare_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  // load once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isWished = useCallback(
    (id) => items.some((i) => i.id === id),
    [items]
  );

  const toggleWishlist = useCallback((product) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [
            {
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              compare_price: product.compare_price,
              image: product.image,
              category_name: product.category_name,
              rating: product.rating,
              review_count: product.review_count,
            },
            ...prev,
          ]
    );
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, count: items.length, isWished, toggleWishlist, removeFromWishlist }),
    [items, isWished, toggleWishlist, removeFromWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);