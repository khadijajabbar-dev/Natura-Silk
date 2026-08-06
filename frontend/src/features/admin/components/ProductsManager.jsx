

// // import { useState, useEffect } from 'react';
// // import adminClient from '../api/adminClient';
// // import ImageField from './ImageField';

// // const emptyForm = { name: '', price: '', category_slug: '', short_desc: '', image: '', is_bestseller: false };

// // export default function ProductsManager() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [imageList, setImageList] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [editingId, setEditingId] = useState(null);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [form, setForm] = useState(emptyForm);
// //   const [error, setError] = useState('');

// //   function loadProducts() {
// //     adminClient.get('/products').then((r) => setProducts(r.data.products));
// //   }

// //   useEffect(() => {
// //     Promise.all([
// //       adminClient.get('/products'),
// //       adminClient.get('/categories'),
// //       adminClient.get('/images'),
// //     ]).then(([p, c, i]) => {
// //       setProducts(p.data.products);
// //       setCategories(c.data.categories);
// //       setImageList(i.data.images);
// //       setLoading(false);
// //     });
// //   }, []);

// //   function startEdit(p) {
// //     setEditingId(p.id);
// //     setForm({
// //       name: p.name, price: p.price, category_slug: p.category_slug || '',
// //       short_desc: p.short_desc || '', image: p.image || '', is_bestseller: !!p.is_bestseller,
// //     });
// //     setShowAddForm(false);
// //   }

// //   function startAdd() {
// //     setEditingId(null);
// //     setForm(emptyForm);
// //     setShowAddForm(true);
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError('');
// //     try {
// //       if (editingId) {
// //         await adminClient.put(`/products/${editingId}`, form);
// //       } else {
// //         await adminClient.post('/products', form);
// //       }
// //       setEditingId(null);
// //       setShowAddForm(false);
// //       setForm(emptyForm);
// //       loadProducts();
// //     } catch (err) {
// //       setError(err.response?.data?.error || 'Could not save product.');
// //     }
// //   }

// //   async function handleDelete(id) {
// //     if (!confirm('Delete this product? This cannot be undone.')) return;
// //     await adminClient.delete(`/products/${id}`);
// //     loadProducts();
// //   }

// //   function cancelForm() {
// //     setEditingId(null);
// //     setShowAddForm(false);
// //     setForm(emptyForm);
// //     setError('');
// //   }

// //   if (loading) return <p style={{ padding: 24 }}>Loading products...</p>;

// //   const formOpen = showAddForm || editingId;

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
// //         <h2 style={{ fontSize: 22 }}>Products Manager</h2>
// //         {!formOpen && (
// //           <button onClick={startAdd} className="btn btn-primary">+ New Product</button>
// //         )}
// //       </div>

// //       {formOpen && (
// //         <form onSubmit={handleSubmit} style={{
// //           background: 'white', border: '1px solid var(--line)', borderRadius: 8,
// //           padding: 24, marginBottom: 24, maxWidth: 480,
// //         }}>
// //           <h3 style={{ fontSize: 16, marginBottom: 16 }}>{editingId ? 'Edit Product' : 'New Product'}</h3>

// //           <div style={{ marginBottom: 14 }}>
// //             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label>
// //             <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
// //               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
// //           </div>

// //           <div style={{ marginBottom: 14 }}>
// //             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Price (PKR)</label>
// //             <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
// //               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
// //           </div>

// //           <div style={{ marginBottom: 14 }}>
// //             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Category</label>
// //             <select value={form.category_slug} onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
// //               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14 }}>
// //               <option value="">— None —</option>
// //               {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
// //             </select>
// //           </div>

// //           <div style={{ marginBottom: 14 }}>
// //             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Short Description</label>
// //             <input value={form.short_desc} onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
// //               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
// //           </div>

// //           <div style={{ marginBottom: 14 }}>
// //             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Product Photo</label>
// //             <ImageField
// //               id="product-form-image"
// //               value={form.image}
// //               onChange={(val) => setForm({ ...form, image: val })}
// //               imageList={imageList}
// //               onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
// //             />
// //           </div>

// //           <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
// //             <input type="checkbox" checked={form.is_bestseller} onChange={(e) => setForm({ ...form, is_bestseller: e.target.checked })} />
// //             Show in Best Sellers
// //           </label>

// //           {error && <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>}

// //           <div style={{ display: 'flex', gap: 10 }}>
// //             <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Product'}</button>
// //             <button type="button" onClick={cancelForm} className="btn btn-outline">Cancel</button>
// //           </div>
// //         </form>
// //       )}

// //       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
// //         {products.map((p) => (
// //           <div key={p.id} style={{
// //             background: 'white', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden',
// //           }}>
// //             <div style={{ aspectRatio: '4 / 5', background: 'var(--cream-deep)' }}>
// //               {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />}
// //             </div>
// //             <div style={{ padding: 14 }}>
// //               <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
// //               <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 4, fontFamily: 'monospace' }}>{p.slug}</div>
// //               <div style={{ fontSize: 13, color: 'var(--olive-mid)', fontWeight: 700, marginBottom: 10 }}>PKR {p.price}</div>
// //               <div style={{ display: 'flex', gap: 8 }}>
// //                 <button onClick={() => startEdit(p)} style={{
// //                   flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
// //                   border: '1px solid var(--line)', background: 'white', cursor: 'pointer',
// //                 }}>Edit</button>
// //                 <button onClick={() => handleDelete(p.id)} style={{
// //                   flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
// //                   border: '1px solid #E8B4AE', background: '#FDF1F0', color: '#B3261E', cursor: 'pointer',
// //                 }}>Delete</button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import adminClient from '../api/adminClient';
// import ImageField from './ImageField';

// const emptyForm = { name: '', price: '', category_slug: '', short_desc: '', image: '', is_bestseller: false };

// const MAX_DESC_WORDS = 500;

// function countWords(text) {
//   const trimmed = text.trim();
//   if (!trimmed) return 0;
//   return trimmed.split(/\s+/).length;
// }

// // Truncates text down to at most `maxWords` words (used to hard-stop typing/pasting past the limit).
// function limitWords(text, maxWords) {
//   const words = text.split(/\s+/);
//   if (words.length <= maxWords) return text;
//   return words.slice(0, maxWords).join(' ');
// }

// export default function ProductsManager() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [imageList, setImageList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [error, setError] = useState('');

//   function loadProducts() {
//     adminClient.get('/products').then((r) => setProducts(r.data.products));
//   }

//   useEffect(() => {
//     Promise.all([
//       adminClient.get('/products'),
//       adminClient.get('/categories'),
//       adminClient.get('/images'),
//     ]).then(([p, c, i]) => {
//       setProducts(p.data.products);
//       setCategories(c.data.categories);
//       setImageList(i.data.images);
//       setLoading(false);
//     });
//   }, []);

//   function startEdit(p) {
//     setEditingId(p.id);
//     setForm({
//       name: p.name, price: p.price, category_slug: p.category_slug || '',
//       short_desc: p.short_desc || '', image: p.image || '', is_bestseller: !!p.is_bestseller,
//     });
//     setShowAddForm(false);
//   }

//   function startAdd() {
//     setEditingId(null);
//     setForm(emptyForm);
//     setShowAddForm(true);
//   }

//   function handleDescChange(e) {
//     const value = limitWords(e.target.value, MAX_DESC_WORDS);
//     setForm({ ...form, short_desc: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError('');

//     if (countWords(form.short_desc) > MAX_DESC_WORDS) {
//       setError(`Description must be ${MAX_DESC_WORDS} words or fewer.`);
//       return;
//     }

//     try {
//       if (editingId) {
//         await adminClient.put(`/products/${editingId}`, form);
//       } else {
//         await adminClient.post('/products', form);
//       }
//       setEditingId(null);
//       setShowAddForm(false);
//       setForm(emptyForm);
//       loadProducts();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Could not save product.');
//     }
//   }

//   async function handleDelete(id) {
//     if (!confirm('Delete this product? This cannot be undone.')) return;
//     await adminClient.delete(`/products/${id}`);
//     loadProducts();
//   }

//   function cancelForm() {
//     setEditingId(null);
//     setShowAddForm(false);
//     setForm(emptyForm);
//     setError('');
//   }

//   if (loading) return <p style={{ padding: 24 }}>Loading products...</p>;

//   const formOpen = showAddForm || editingId;
//   const descWordCount = countWords(form.short_desc);

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2 style={{ fontSize: 22 }}>Products Manager</h2>
//         {!formOpen && (
//           <button onClick={startAdd} className="btn btn-primary">+ New Product</button>
//         )}
//       </div>

//       {formOpen && (
//         <form onSubmit={handleSubmit} style={{
//           background: 'white', border: '1px solid var(--line)', borderRadius: 8,
//           padding: 24, marginBottom: 24, maxWidth: 480,
//         }}>
//           <h3 style={{ fontSize: 16, marginBottom: 16 }}>{editingId ? 'Edit Product' : 'New Product'}</h3>

//           <div style={{ marginBottom: 14 }}>
//             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label>
//             <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
//               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
//           </div>

//           <div style={{ marginBottom: 14 }}>
//             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Price (PKR)</label>
//             <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
//               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
//           </div>

//           <div style={{ marginBottom: 14 }}>
//             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Category</label>
//             <select value={form.category_slug} onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
//               style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14 }}>
//               <option value="">— None —</option>
//               {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
//             </select>
//           </div>

//           <div style={{ marginBottom: 14 }}>
//             <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
//               <span>Description</span>
//               <span style={{
//                 fontSize: 11.5, fontWeight: 500,
//                 color: descWordCount > MAX_DESC_WORDS ? '#B3261E' : 'var(--ink-soft)',
//               }}>
//                 {descWordCount} / {MAX_DESC_WORDS} words
//               </span>
//             </label>
//             <textarea
//               value={form.short_desc}
//               onChange={handleDescChange}
//               rows={8}
//               placeholder="Describe this product (up to 500 words)..."
//               style={{
//                 width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)',
//                 fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.5,
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: 14 }}>
//             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Product Photo</label>
//             <ImageField
//               id="product-form-image"
//               value={form.image}
//               onChange={(val) => setForm({ ...form, image: val })}
//               imageList={imageList}
//               onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
//             />
//           </div>

//           <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
//             <input type="checkbox" checked={form.is_bestseller} onChange={(e) => setForm({ ...form, is_bestseller: e.target.checked })} />
//             Show in Best Sellers
//           </label>

//           {error && <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>}

//           <div style={{ display: 'flex', gap: 10 }}>
//             <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Product'}</button>
//             <button type="button" onClick={cancelForm} className="btn btn-outline">Cancel</button>
//           </div>
//         </form>
//       )}

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
//         {products.map((p) => (
//           <div key={p.id} style={{
//             background: 'white', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden',
//           }}>
//             <div style={{ aspectRatio: '4 / 5', background: 'var(--cream-deep)' }}>
//               {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />}
//             </div>
//             <div style={{ padding: 14 }}>
//               <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
//               <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 4, fontFamily: 'monospace' }}>{p.slug}</div>
//               <div style={{ fontSize: 13, color: 'var(--olive-mid)', fontWeight: 700, marginBottom: 10 }}>PKR {p.price}</div>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <button onClick={() => startEdit(p)} style={{
//                   flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
//                   border: '1px solid var(--line)', background: 'white', cursor: 'pointer',
//                 }}>Edit</button>
//                 <button onClick={() => handleDelete(p.id)} style={{
//                   flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
//                   border: '1px solid #E8B4AE', background: '#FDF1F0', color: '#B3261E', cursor: 'pointer',
//                 }}>Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import adminClient from '../api/adminClient';
import ImageField from './ImageField';

const emptyForm = { name: '', price: '', category_slug: '', short_desc: '', description: '', image: '', is_bestseller: false };

const MAX_DESC_WORDS = 500;

function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

// Truncates text down to at most `maxWords` words (used to hard-stop typing/pasting past the limit).
function limitWords(text, maxWords) {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ');
}

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function loadProducts() {
    adminClient.get('/products').then((r) => setProducts(r.data.products));
  }

  useEffect(() => {
    Promise.all([
      adminClient.get('/products'),
      adminClient.get('/categories'),
      adminClient.get('/images'),
    ]).then(([p, c, i]) => {
      setProducts(p.data.products);
      setCategories(c.data.categories);
      setImageList(i.data.images);
      setLoading(false);
    });
  }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name, price: p.price, category_slug: p.category_slug || '',
      short_desc: p.short_desc || '', description: p.description || '',
      image: p.image || '', is_bestseller: !!p.is_bestseller,
    });
    setShowAddForm(false);
  }

  function startAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowAddForm(true);
  }

  function handleLongDescChange(e) {
    const value = limitWords(e.target.value, MAX_DESC_WORDS);
    setForm({ ...form, description: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (countWords(form.description) > MAX_DESC_WORDS) {
      setError(`Description must be ${MAX_DESC_WORDS} words or fewer.`);
      return;
    }

    try {
      if (editingId) {
        await adminClient.put(`/products/${editingId}`, form);
      } else {
        await adminClient.post('/products', form);
      }
      setEditingId(null);
      setShowAddForm(false);
      setForm(emptyForm);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save product.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await adminClient.delete(`/products/${id}`);
    loadProducts();
  }

  function cancelForm() {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyForm);
    setError('');
  }

  if (loading) return <p style={{ padding: 24 }}>Loading products...</p>;

  const formOpen = showAddForm || editingId;
  const descWordCount = countWords(form.description);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22 }}>Products Manager</h2>
        {!formOpen && (
          <button onClick={startAdd} className="btn btn-primary">+ New Product</button>
        )}
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} style={{
          background: 'white', border: '1px solid var(--line)', borderRadius: 8,
          padding: 24, marginBottom: 24, maxWidth: 480,
        }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>{editingId ? 'Edit Product' : 'New Product'}</h3>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Price (PKR)</label>
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Category</label>
            <select value={form.category_slug} onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14 }}>
              <option value="">— None —</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Short Description <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(shown right under the price)</span>
            </label>
            <input
              value={form.short_desc}
              onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
              placeholder="e.g. Gently cleanses and nourishes hair with natural herbal extracts."
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              <span>Full Description <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(shown in the "Description" tab)</span></span>
              <span style={{
                fontSize: 11.5, fontWeight: 500,
                color: descWordCount > MAX_DESC_WORDS ? '#B3261E' : 'var(--ink-soft)',
              }}>
                {descWordCount} / {MAX_DESC_WORDS} words
              </span>
            </label>
            <textarea
              value={form.description}
              onChange={handleLongDescChange}
              rows={8}
              placeholder="Write the full product description (up to 500 words)..."
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)',
                fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.5,
              }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Product Photo</label>
            <ImageField
              id="product-form-image"
              value={form.image}
              onChange={(val) => setForm({ ...form, image: val })}
              imageList={imageList}
              onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
            <input type="checkbox" checked={form.is_bestseller} onChange={(e) => setForm({ ...form, is_bestseller: e.target.checked })} />
            Show in Best Sellers
          </label>

          {error && <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Product'}</button>
            <button type="button" onClick={cancelForm} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {products.map((p) => (
          <div key={p.id} style={{
            background: 'white', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden',
          }}>
            <div style={{ aspectRatio: '4 / 5', background: 'var(--cream-deep)' }}>
              {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />}
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 4, fontFamily: 'monospace' }}>{p.slug}</div>
              <div style={{ fontSize: 13, color: 'var(--olive-mid)', fontWeight: 700, marginBottom: 10 }}>PKR {p.price}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(p)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
                  border: '1px solid var(--line)', background: 'white', cursor: 'pointer',
                }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
                  border: '1px solid #E8B4AE', background: '#FDF1F0', color: '#B3261E', cursor: 'pointer',
                }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
