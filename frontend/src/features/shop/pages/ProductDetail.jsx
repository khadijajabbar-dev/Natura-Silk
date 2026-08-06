
// // // import { useEffect, useState } from 'react';
// // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // import client from '../../../shared/api/client';
// // // import StarRating from '../components/StarRating';
// // // import ProductCard from '../components/ProductCard';
// // // import { useCart } from '../../cart/hooks/CartContext';

// // // const TABS = ['Ingredients', 'How to Use', 'Reviews'];

// // // export default function ProductDetail() {
// // //   const { slug } = useParams();
// // //   const navigate = useNavigate();
// // //   const { addToCart } = useCart();

// // //   const [data, setData] = useState(null);
// // //   const [qty, setQty] = useState(1);
// // //   const [tab, setTab] = useState('Ingredients');
// // //   const [adding, setAdding] = useState(false);
// // //   const [added, setAdded] = useState(false);
// // //   const [buyingNow, setBuyingNow] = useState(false);

// // //   useEffect(() => {
// // //     setData(null);
// // //     setTab('Ingredients');
// // //     setQty(1);
// // //     client.get(`/products/${slug}`).then((r) => setData(r.data));
// // //   }, [slug]);

// // //   if (!data) return <div className="container section"><div className="spinner" /></div>;
// // //   const { product, reviews, related } = data;

// // //   async function handleAdd() {
// // //     setAdding(true);
// // //     try {
// // //       await addToCart(product.id, qty);
// // //       setAdded(true);
// // //       setTimeout(() => setAdded(false), 2000);
// // //     } finally {
// // //       setAdding(false);
// // //     }
// // //   }

// // //   async function handleBuyNow() {
// // //     setBuyingNow(true);
// // //     try {
// // //       await addToCart(product.id, qty);
// // //       navigate('/checkout');
// // //     } finally {
// // //       setBuyingNow(false);
// // //     }
// // //   }

// // //   return (
// // //     <div className="container section">
// // //       <div className="breadcrumbs">
// // //         <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
// // //       </div>

// // //       <div className="grid-2" style={{ marginBottom: 56 }}>
// // //         <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
// // //           <img src={product.image} alt={product.name} style={{ width: '100%' }} />
// // //         </div>
// // //         <div>
// // //           {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
// // //           <h1 style={{ fontSize: 30, margin: '10px 0 8px' }}>{product.name}</h1>
// // //           <StarRating rating={product.rating} count={product.review_count} />
// // //           <div className="product-card-price" style={{ margin: '16px 0' }}>
// // //             <span className="price-now" style={{ fontSize: 24 }}>PKR {product.price.toLocaleString()}</span>
// // //             {product.compare_price > product.price && (
// // //               <span className="price-was" style={{ fontSize: 15 }}>PKR {product.compare_price.toLocaleString()}</span>
// // //             )}
// // //           </div>
// // //           <p style={{ marginBottom: 12 }}>{product.short_desc}</p>
// // //           {product.description && (
// // //             <p style={{ marginBottom: 24, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 480 }}>
// // //               {product.description}
// // //             </p>
// // //           )}

// // //           <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
// // //             <div className="qty-control">
// // //               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
// // //               <span>{qty}</span>
// // //               <button onClick={() => setQty((q) => q + 1)}>+</button>
// // //             </div>
// // //             <button className="btn btn-outline" style={{ flex: 1, minWidth: 140 }} onClick={handleAdd} disabled={adding || buyingNow}>
// // //               {adding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
// // //             </button>
// // //             <button className="btn btn-primary" style={{ flex: 1, minWidth: 140 }} onClick={handleBuyNow} disabled={adding || buyingNow}>
// // //               {buyingNow ? 'Please wait...' : 'Buy Now'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Tabs */}
// // //       <div style={{ marginBottom: 56 }}>
// // //         <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--line)', marginBottom: 24 }}>
// // //           {TABS.map((t) => (
// // //             <button
// // //               key={t}
// // //               onClick={() => setTab(t)}
// // //               style={{
// // //                 background: 'none', border: 'none', padding: '12px 18px', fontSize: 14, fontWeight: 600,
// // //                 color: tab === t ? 'var(--olive)' : 'var(--ink-soft)',
// // //                 borderBottom: tab === t ? '2px solid var(--olive)' : '2px solid transparent',
// // //               }}
// // //             >{t}{t === 'Reviews' ? ` (${reviews.length})` : ''}</button>
// // //           ))}
// // //         </div>

// // //         {tab === 'Ingredients' && <p style={{ maxWidth: 700 }}>{product.ingredients}</p>}
// // //         {tab === 'How to Use' && <p style={{ maxWidth: 700 }}>{product.how_to_use}</p>}
// // //         {tab === 'Reviews' && (
// // //           <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700 }}>
// // //             {reviews.length === 0 && <p>No reviews yet. Be the first to review this product.</p>}
// // //             {reviews.map((r) => (
// // //               <div key={r.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 14 }}>
// // //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
// // //                   <strong style={{ fontSize: 14 }}>{r.author_name}</strong>
// // //                   <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
// // //                 </div>
// // //                 <p style={{ fontSize: 14 }}>{r.comment}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {related.length > 0 && (
// // //         <div>
// // //           <h2 style={{ fontSize: 24, marginBottom: 24 }}>Related Products</h2>
// // //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
// // //             {related.map((p) => <ProductCard key={p.id} product={p} />)}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }



// // import { useEffect, useState } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import client from '../../../shared/api/client';
// // import StarRating from '../components/StarRating';
// // import ProductCard from '../components/ProductCard';
// // import { useCart } from '../../cart/hooks/CartContext';

// // export default function ProductDetail() {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();
// //   const { addToCart } = useCart();

// //   const [data, setData] = useState(null);
// //   const [qty, setQty] = useState(1);
// //   const [adding, setAdding] = useState(false);
// //   const [added, setAdded] = useState(false);
// //   const [buyingNow, setBuyingNow] = useState(false);

// //   useEffect(() => {
// //     setData(null);
// //     setQty(1);
// //     client.get(`/products/${slug}`).then((r) => setData(r.data));
// //   }, [slug]);

// //   if (!data) return <div className="container section"><div className="spinner" /></div>;
// //   const { product, reviews, related } = data;

// //   async function handleAdd() {
// //     setAdding(true);
// //     try {
// //       await addToCart(product.id, qty);
// //       setAdded(true);
// //       setTimeout(() => setAdded(false), 2000);
// //     } finally {
// //       setAdding(false);
// //     }
// //   }

// //   async function handleBuyNow() {
// //     setBuyingNow(true);
// //     try {
// //       await addToCart(product.id, qty);
// //       navigate('/checkout');
// //     } finally {
// //       setBuyingNow(false);
// //     }
// //   }

// //   return (
// //     <div className="container section">
// //       <div className="breadcrumbs">
// //         <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
// //       </div>

// //       <div className="grid-2" style={{ marginBottom: 56 }}>
// //         <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
// //           <img src={product.image} alt={product.name} style={{ width: '100%' }} />
// //         </div>
// //         <div>
// //           {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
// //           <h1 style={{ fontSize: 30, margin: '10px 0 8px' }}>{product.name}</h1>
// //           <StarRating rating={product.rating} count={product.review_count} />
// //           <div className="product-card-price" style={{ margin: '16px 0' }}>
// //             <span className="price-now" style={{ fontSize: 24 }}>PKR {product.price.toLocaleString()}</span>
// //             {product.compare_price > product.price && (
// //               <span className="price-was" style={{ fontSize: 15 }}>PKR {product.compare_price.toLocaleString()}</span>
// //             )}
// //           </div>
// //           <p style={{ marginBottom: 12 }}>{product.short_desc}</p>
// //           {product.description && (
// //             <p style={{ marginBottom: 24, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 480 }}>
// //               {product.description}
// //             </p>
// //           )}

// //           {/* Details — no tabs, everything shown directly */}
// //           {product.ingredients && (
// //             <div style={{ marginBottom: 20 }}>
// //               <h3 style={{ fontSize: 15, marginBottom: 6 }}>Ingredients</h3>
// //               <p style={{ maxWidth: 480 }}>{product.ingredients}</p>
// //             </div>
// //           )}

// //           {product.how_to_use && (
// //             <div style={{ marginBottom: 20 }}>
// //               <h3 style={{ fontSize: 15, marginBottom: 6 }}>How to Use</h3>
// //               <p style={{ maxWidth: 480 }}>{product.how_to_use}</p>
// //             </div>
// //           )}

// //           <div style={{ marginBottom: 24 }}>
// //             <h3 style={{ fontSize: 15, marginBottom: 10 }}>Reviews ({reviews.length})</h3>
// //             <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
// //               {reviews.length === 0 && <p>No reviews yet. Be the first to review this product.</p>}
// //               {reviews.map((r) => (
// //                 <div key={r.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
// //                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
// //                     <strong style={{ fontSize: 14 }}>{r.author_name}</strong>
// //                     <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
// //                   </div>
// //                   <p style={{ fontSize: 14 }}>{r.comment}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
// //             <div className="qty-control">
// //               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
// //               <span>{qty}</span>
// //               <button onClick={() => setQty((q) => q + 1)}>+</button>
// //             </div>
// //             <button className="btn btn-outline" style={{ flex: 1, minWidth: 140 }} onClick={handleAdd} disabled={adding || buyingNow}>
// //               {adding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
// //             </button>
// //             <button className="btn btn-primary" style={{ flex: 1, minWidth: 140 }} onClick={handleBuyNow} disabled={adding || buyingNow}>
// //               {buyingNow ? 'Please wait...' : 'Buy Now'}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {related.length > 0 && (
// //         <div>
// //           <h2 style={{ fontSize: 24, marginBottom: 24 }}>Related Products</h2>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
// //             {related.map((p) => <ProductCard key={p.id} product={p} />)}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import client from '../../../shared/api/client';
// import StarRating from '../components/StarRating';
// import ProductCard from '../components/ProductCard';
// import { useCart } from '../../cart/hooks/CartContext';

// export default function ProductDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [data, setData] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [adding, setAdding] = useState(false);
//   const [added, setAdded] = useState(false);
//   const [buyingNow, setBuyingNow] = useState(false);

//   useEffect(() => {
//     setData(null);
//     setQty(1);
//     client.get(`/products/${slug}`).then((r) => setData(r.data));
//   }, [slug]);

//   if (!data) return <div className="container section"><div className="spinner" /></div>;
//   const { product, reviews, related } = data;

//   async function handleAdd() {
//     setAdding(true);
//     try {
//       await addToCart(product.id, qty);
//       setAdded(true);
//       setTimeout(() => setAdded(false), 2000);
//     } finally {
//       setAdding(false);
//     }
//   }

//   async function handleBuyNow() {
//     setBuyingNow(true);
//     try {
//       await addToCart(product.id, qty);
//       navigate('/checkout');
//     } finally {
//       setBuyingNow(false);
//     }
//   }

//   return (
//     <div className="container section">
//       <div className="breadcrumbs">
//         <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
//       </div>

//       <div className="grid-2" style={{ marginBottom: 56 }}>
//         <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
//           <img src={product.image} alt={product.name} style={{ width: '100%' }} />
//         </div>
//         <div>
//           {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
//           <h1 style={{ fontSize: 30, margin: '10px 0 8px' }}>{product.name}</h1>
//           <StarRating rating={product.rating} count={product.review_count} />
//           <div className="product-card-price" style={{ margin: '16px 0' }}>
//             <span className="price-now" style={{ fontSize: 24 }}>PKR {product.price.toLocaleString()}</span>
//             {product.compare_price > product.price && (
//               <span className="price-was" style={{ fontSize: 15 }}>PKR {product.compare_price.toLocaleString()}</span>
//             )}
//           </div>
//           <p style={{ marginBottom: 12 }}>{product.short_desc}</p>
//           {product.description && (
//             <p style={{ marginBottom: 24, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 480 }}>
//               {product.description}
//             </p>
//           )}

//           {/* Scrollable details panel — reading long content scrolls inside this
//               box instead of moving the whole page / pushing the buttons down. */}
//           <div style={{
//             maxHeight: 320, overflowY: 'auto', paddingRight: 10, marginBottom: 20,
//             borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
//             paddingTop: 16, paddingBottom: 4,
//           }}>
//             {product.ingredients && (
//               <div style={{ marginBottom: 20 }}>
//                 <h3 style={{ fontSize: 15, marginBottom: 6 }}>Ingredients</h3>
//                 <p style={{ maxWidth: 480 }}>{product.ingredients}</p>
//               </div>
//             )}

//             {product.how_to_use && (
//               <div style={{ marginBottom: 20 }}>
//                 <h3 style={{ fontSize: 15, marginBottom: 6 }}>How to Use</h3>
//                 <p style={{ maxWidth: 480 }}>{product.how_to_use}</p>
//               </div>
//             )}

//             <div>
//               <h3 style={{ fontSize: 15, marginBottom: 10 }}>Reviews ({reviews.length})</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
//                 {reviews.length === 0 && <p>No reviews yet. Be the first to review this product.</p>}
//                 {reviews.map((r) => (
//                   <div key={r.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//                       <strong style={{ fontSize: 14 }}>{r.author_name}</strong>
//                       <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
//                     </div>
//                     <p style={{ fontSize: 14 }}>{r.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
//             <div className="qty-control">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
//               <span>{qty}</span>
//               <button onClick={() => setQty((q) => q + 1)}>+</button>
//             </div>
//             <button className="btn btn-outline" style={{ flex: 1, minWidth: 140 }} onClick={handleAdd} disabled={adding || buyingNow}>
//               {adding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
//             </button>
//             <button className="btn btn-primary" style={{ flex: 1, minWidth: 140 }} onClick={handleBuyNow} disabled={adding || buyingNow}>
//               {buyingNow ? 'Please wait...' : 'Buy Now'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {related.length > 0 && (
//         <div>
//           <h2 style={{ fontSize: 24, marginBottom: 24 }}>Related Products</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
//             {related.map((p) => <ProductCard key={p.id} product={p} />)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client from '../../../shared/api/client';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { useCart } from '../../cart/hooks/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  // Live reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ author_name: '', rating: 5, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    setData(null);
    setQty(1);
    client.get(`/products/${slug}`).then((r) => {
      setData(r.data);
      // Fetch live reviews for this product
      if (r.data?.product?.id) {
        client.get(`/reviews?product_id=${r.data.product.id}`)
          .then((rv) => setReviews(rv.data.reviews || []))
          .catch(() => setReviews(r.data.reviews || []));
      } else {
        setReviews(r.data.reviews || []);
      }
    });
  }, [slug]);

  async function handleSubmitReview(e) {
    e.preventDefault();
    setReviewError('');
    if (!reviewForm.author_name.trim()) { setReviewError('Please enter your name.'); return; }
    setSubmittingReview(true);
    try {
      const res = await client.post('/reviews', {
        product_id: data.product.id,
        author_name: reviewForm.author_name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviews((prev) => [res.data.review, ...prev]);
      setReviewForm({ author_name: '', rating: 5, comment: '' });
      setReviewSuccess(true);
      setShowReviewForm(false);
      setTimeout(() => setReviewSuccess(false), 4000);
    } catch (err) {
      setReviewError(err.response?.data?.error || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  }

  if (!data) return <div className="container section"><div className="spinner" /></div>;
  const { product, related } = data;

  async function handleAdd() {
    setAdding(true);
    try {
      await addToCart(product.id, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  }

  async function handleBuyNow() {
    setBuyingNow(true);
    try {
      await addToCart(product.id, qty);
      navigate('/checkout');
    } finally {
      setBuyingNow(false);
    }
  }

  return (
    <div className="container section">
      <div className="grid-2" style={{ marginBottom: 56 }}>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%' }} />
        </div>
        <div>
          {product.category_name && <span className="product-card-cat">{product.category_name}</span>}
          <h1 style={{ fontSize: 30, margin: '10px 0 8px' }}>{product.name}</h1>
          <StarRating rating={product.rating} count={product.review_count} />
          <div className="product-card-price" style={{ margin: '16px 0' }}>
            <span className="price-now" style={{ fontSize: 24 }}>PKR {product.price.toLocaleString()}</span>
            {product.compare_price > product.price && (
              <span className="price-was" style={{ fontSize: 15 }}>PKR {product.compare_price.toLocaleString()}</span>
            )}
          </div>
          <p style={{ marginBottom: 12 }}>{product.short_desc}</p>

          {/* Scrollable details panel — reading long content scrolls inside this
              box instead of moving the whole page / pushing the buttons down. */}
          <div style={{
            maxHeight: 320, overflowY: 'auto', paddingRight: 10, marginBottom: 20,
            borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
            paddingTop: 16, paddingBottom: 4,
          }}>
            {product.description && (
              <p style={{ marginBottom: 20, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 480 }}>
                {product.description}
              </p>
            )}

            {product.ingredients && (
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, marginBottom: 6 }}>Ingredients</h3>
                <p style={{ maxWidth: 480 }}>{product.ingredients}</p>
              </div>
            )}

            {product.how_to_use && (
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, marginBottom: 6 }}>How to Use</h3>
                <p style={{ maxWidth: 480 }}>{product.how_to_use}</p>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ fontSize: 15 }}>Reviews ({reviews.length})</h3>
                <button
                  onClick={() => setShowReviewForm((s) => !s)}
                  style={{
                    fontSize: 12.5, fontWeight: 700, padding: '6px 14px', borderRadius: 20,
                    border: '1px solid var(--olive-dark)', background: 'transparent',
                    color: 'var(--olive-dark)', cursor: 'pointer',
                  }}
                >
                  {showReviewForm ? 'Cancel' : '+ Write a Review'}
                </button>
              </div>

              {reviewSuccess && (
                <div style={{ background: '#E7F6EC', color: '#16794B', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 12 }}>
                  ✅ Your review has been submitted. Thank you!
                </div>
              )}

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} style={{ background: 'var(--cream)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  {reviewError && (
                    <div style={{ background: '#FDECEC', color: '#B3261E', padding: '8px 12px', borderRadius: 6, fontSize: 12.5, marginBottom: 10 }}>
                      {reviewError}
                    </div>
                  )}
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>Your Name *</label>
                    <input
                      value={reviewForm.author_name}
                      onChange={(e) => setReviewForm((f) => ({ ...f, author_name: e.target.value }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 13.5, boxSizing: 'border-box' }}
                      placeholder="e.g. Sana Khan"
                    />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>Rating *</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[1,2,3,4,5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                          style={{
                            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer',
                            color: star <= reviewForm.rating ? '#F59E0B' : '#D1D5DB',
                            padding: '0 2px',
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>Comment (optional)</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 13.5, minHeight: 80, resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                      placeholder="Share your experience with this product..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    style={{
                      background: 'var(--olive-dark)', color: 'white', border: 'none',
                      borderRadius: 6, padding: '9px 22px', fontSize: 13.5, fontWeight: 600,
                      cursor: 'pointer', opacity: submittingReview ? 0.6 : 1,
                    }}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
                {reviews.length === 0 && !showReviewForm && <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>No reviews yet. Be the first to review this product!</p>}
                {reviews.map((r) => (
                  <div key={r.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong style={{ fontSize: 14 }}>{r.author_name}</strong>
                      <span style={{ color: '#F59E0B', fontSize: 15 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    </div>
                    {r.comment && <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>{r.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-outline" style={{ flex: 1, minWidth: 140 }} onClick={handleAdd} disabled={adding || buyingNow}>
              {adding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button className="btn btn-primary" style={{ flex: 1, minWidth: 140 }} onClick={handleBuyNow} disabled={adding || buyingNow}>
              {buyingNow ? 'Please wait...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
