import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../../shared/api/client';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    client.get(`/blogs/${slug}`)
      .then((r) => {
        setPost(r.data.blog);
        // Also load all blogs to show related posts
        return client.get('/blogs');
      })
      .then((r) => {
        setRelated((r.data.blogs || []).filter((b) => b.slug !== slug).slice(0, 3));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container section"><div className="spinner" /></div>;

  if (notFound || !post) {
    return (
      <div className="container section empty-state">
        <h3>Article not found</h3>
        <p>The post you are looking for doesn&apos;t exist.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 820 }}>
      {post.tag && <span className="product-card-cat">{post.tag}</span>}
      <h1 style={{ fontSize: 36, margin: '10px 0 10px', lineHeight: 1.2 }}>{post.title}</h1>
      {post.date && <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 24 }}>{post.date}</p>}

      {post.image && (
        <div style={{ aspectRatio: '16/8', overflow: 'hidden', borderRadius: 10, marginBottom: 28 }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <article>
        {(post.content || []).map((block, i) => {
          if (block.type === 'h') {
            return <h2 key={i} style={{ fontSize: 22, margin: '26px 0 10px' }}>{block.text}</h2>;
          }
          if (block.type === 'img' || block.src) {
            const imgSrc = block.src || block.text;
            return (
              <figure key={i} style={{ margin: '24px 0' }}>
                <img
                  src={imgSrc}
                  alt={block.caption || post.title}
                  style={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 8 }}
                />
                {block.caption && (
                  <figcaption style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, textAlign: 'center' }}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          const imgMatch = block.text?.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            return (
              <figure key={i} style={{ margin: '24px 0' }}>
                <img
                  src={imgMatch[2]}
                  alt={imgMatch[1] || post.title}
                  style={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 8 }}
                />
                {imgMatch[1] && (
                  <figcaption style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, textAlign: 'center' }}>
                    {imgMatch[1]}
                  </figcaption>
                )}
              </figure>
            );
          }

          return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>{block.text}</p>;
        })}
      </article>

      {related.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '40px 0 28px' }} />
          <h3 style={{ fontSize: 20, marginBottom: 18 }}>More from the blog</h3>
          <div className="blog-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: 8, marginBottom: 8 }}>
                  <img src={p.image || '/images/herbal-shampoo.jpg'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {p.tag && <span className="product-card-cat">{p.tag}</span>}
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>{p.title}</div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: 32 }}>
        <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
      </div>
    </div>
  );
}