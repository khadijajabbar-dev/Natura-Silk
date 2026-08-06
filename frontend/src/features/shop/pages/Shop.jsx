import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../../../shared/api/client';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/products/categories').then((r) => setCategories(r.data.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (sort) params.set('sort', sort);
    client.get(`/products?${params.toString()}`)
      .then((r) => setProducts(r.data.products))
      .finally(() => setLoading(false));
  }, [activeCategory, sort]);

  return (
    <div className="container section">
      <h1 style={{ fontSize: 32, marginBottom: 28 }}>Shop All Categories</h1>

      <div style={{ display: 'flex', gap: 32 }}>
        <aside style={{ width: 210, flexShrink: 0 }}>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Categories</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li>
              <button
                onClick={() => setSearchParams({})}
                style={{
                  background: 'none', border: 'none', textAlign: 'left', width: '100%', padding: '8px 10px',
                  borderRadius: 4, fontSize: 14, fontWeight: !activeCategory ? 700 : 500,
                  color: !activeCategory ? 'var(--olive)' : 'var(--ink)',
                  background: !activeCategory ? 'var(--cream-deep)' : 'transparent',
                }}
              >All Products</button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSearchParams({ category: c.slug })}
                  style={{
                    background: activeCategory === c.slug ? 'var(--cream-deep)' : 'transparent',
                    border: 'none', textAlign: 'left', width: '100%', padding: '8px 10px', borderRadius: 4,
                    fontSize: 14, fontWeight: activeCategory === c.slug ? 700 : 500,
                    color: activeCategory === c.slug ? 'var(--olive)' : 'var(--ink)',
                  }}
                >{c.name}</button>
              </li>
            ))}
          </ul>
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{products.length} products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 4, fontSize: 13.5 }}>
              <option value="">Sort: Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {loading ? <div className="spinner" /> : (
            products.length === 0 ? (
              <div className="empty-state"><p>No products found in this category.</p></div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
