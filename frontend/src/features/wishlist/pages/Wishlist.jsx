import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/WishlistContext';
import { useCart } from '../../cart/hooks/CartContext';
import StarRating from '../../shop/components/StarRating';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  async function handleAdd(product) {
    await addToCart(product.id, 1);
  }

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h3>Your wishlist is empty</h3>
        <p>Save your favourite products by tapping the heart icon.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: 30, marginBottom: 28 }}>My Wishlist ({items.length})</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {items.map((p) => (
          <div key={p.id} className="product-card">
            <Link to={`/product/${p.slug}`}>
              <div className="product-card-img">
                <button
                  className="wishlist-btn is-active"
                  onClick={(e) => { e.preventDefault(); removeFromWishlist(p.id); }}
                  aria-label="Remove from wishlist"
                >♥</button>
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
              <div className="product-card-body">
                {p.category_name && <span className="product-card-cat">{p.category_name}</span>}
                <span className="product-card-name">{p.name}</span>
                <StarRating rating={p.rating} count={p.review_count} />
                <div className="product-card-price">
                  <span className="price-now">PKR {p.price.toLocaleString()}</span>
                  {p.compare_price > p.price && (
                    <span className="price-was">PKR {p.compare_price.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </Link>
            <div className="product-card-footer" style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-block btn-sm" onClick={() => handleAdd(p)}>Add to Cart</button>
              <button className="btn btn-outline btn-sm" onClick={() => removeFromWishlist(p.id)} aria-label="Remove">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}