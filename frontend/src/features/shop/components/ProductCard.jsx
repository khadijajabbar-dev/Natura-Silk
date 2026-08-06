// import { Link } from 'react-router-dom';
// import { useState, memo } from 'react';
// import StarRating from './StarRating';
// import { useCart } from '../../cart/hooks/CartContext';
// import { useWishlist } from '../../wishlist/hooks/WishlistContext';

// function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const { isWished, toggleWishlist } = useWishlist();
//   const [adding, setAdding] = useState(false);

//   const wished = isWished(product.id);

//   async function handleAdd(e) {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       await addToCart(product.id, 1);
//     } finally {
//       setAdding(false);
//     }
//   }

//   return (
//     <div className="product-card">
//       <Link to={`/product/${product.slug}`}>
//         <div className="product-card-img">
//           <button
//             className={`wishlist-btn${wished ? ' is-active' : ''}`}
//             onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
//             aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             {wished ? '♥' : '♡'}
//           </button>
//           <img src={product.image} alt={product.name} loading="lazy" />
//         </div>
//         <div className="product-card-body">
//           {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
//           <span className="product-card-name">{product.name}</span>
//           <StarRating rating={product.rating} count={product.review_count} />
//           <div className="product-card-price">
//             <span className="price-now">PKR {product.price.toLocaleString()}</span>
//             {product.compare_price > product.price && (
//               <span className="price-was">PKR {product.compare_price.toLocaleString()}</span>
//             )}
//           </div>
//         </div>
//       </Link>
//       <div className="product-card-footer">
//         <button className="btn btn-primary btn-block btn-sm" onClick={handleAdd} disabled={adding}>
//           {adding ? 'Adding...' : 'Add to Cart'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default memo(ProductCard);




import { Link } from 'react-router-dom';
import { useState, memo } from 'react';
import StarRating from './StarRating';
import { useCart } from '../../cart/hooks/CartContext';
import { useWishlist } from '../../wishlist/hooks/WishlistContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWished, toggleWishlist } = useWishlist();
  const [adding, setAdding] = useState(false);

  const wished = isWished(product.id);

  async function handleAdd(e) {
    e.preventDefault();
    setAdding(true);
    try {
      await addToCart(product.id, 1);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="product-card-img">
          <button
            className={`wishlist-btn${wished ? ' is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wished ? '♥' : '♡'}
          </button>
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="product-card-body">
          {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
          <span className="product-card-name">{product.name}</span>
          <StarRating rating={product.rating} count={product.review_count} />
          {product.short_desc && (
            <p
              className="product-card-desc"
              style={{
                fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-soft)',
                margin: '4px 0 8px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.short_desc}
            </p>
          )}
          <div className="product-card-price">
            <span className="price-now">PKR {product.price.toLocaleString()}</span>
            {product.compare_price > product.price && (
              <span className="price-was">PKR {product.compare_price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="product-card-footer">
        <button className="btn btn-primary btn-block btn-sm" onClick={handleAdd} disabled={adding}>
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);