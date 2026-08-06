import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../shared/api/client';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/blogs')
      .then((r) => setBlogs(r.data.blogs))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container section">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 860 }}>
      <div className="text-center" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 36, color: 'var(--olive-dark)', fontWeight: 500, fontFamily: 'var(--font-display)', marginBottom: 10 }}>From Our Blog</h1>
        <div style={{ width: 44, height: 2, background: 'var(--olive-dark)', margin: '0 auto', borderRadius: 1 }} />
      </div>

      <div className="blog-layout">
        <div className="blog-grid">
          {blogs.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>No blog posts yet. Check back soon!</p>
          ) : (
            blogs.map((p) => (
              <article key={p.id} className="blog-card">
                <Link to={`/blog/${p.slug}`} className="blog-card-img">
                  <img src={p.image || '/images/herbal-shampoo.jpg'} alt={p.title} />
                </Link>
                <div className="blog-card-body">
                  {p.tag && <span className="product-card-cat">{p.tag}</span>}
                  {p.date && <span className="blog-card-date">{p.date}</span>}
                  <h3 className="blog-card-title">
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <Link to={`/blog/${p.slug}`} className="blog-card-readmore">Read More →</Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}