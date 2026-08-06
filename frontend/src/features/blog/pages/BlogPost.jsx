import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../../shared/api/client';

function renderFormattedText(text) {
  if (!text) return null;
  // Split by ==highlight== or **bold** markers
  const parts = String(text).split(/(==.*?==|\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('==') && part.endsWith('==') && part.length >= 4) {
      return (
        <mark key={idx} style={{
          background: '#FCEEA7',
          color: 'var(--olive-dark)',
          padding: '2px 8px',
          borderRadius: '5px',
          fontWeight: 700,
          boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
          display: 'inline-block',
        }}>
          {part.slice(2, -2)}
        </mark>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={idx} style={{ color: 'var(--olive-dark)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

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
      <h1 style={{ fontSize: 38, margin: '10px 0 12px', lineHeight: 1.2, color: 'var(--olive-dark)', fontFamily: 'var(--font-display)' }}>{post.title}</h1>
      {post.date && <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 26, fontWeight: 600 }}>{post.date}</p>}

      {post.image && (
        <div style={{ aspectRatio: '16/8', overflow: 'hidden', borderRadius: 16, marginBottom: 34, boxShadow: '0 14px 35px rgba(44,53,32,0.14)' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <article className="blog-article-body">
        {(post.content || []).map((block, i) => {
          if (block.type === 'h') {
            return <h2 key={i} style={{ fontSize: 24, margin: '32px 0 14px', color: 'var(--olive-dark)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{renderFormattedText(block.text)}</h2>;
          }
          if (block.type === 'highlight' || block.type === 'callout') {
            return (
              <div key={i} style={{
                margin: '30px 0',
                padding: '22px 28px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(201, 162, 75, 0.18) 0%, rgba(150, 165, 120, 0.28) 100%)',
                borderLeft: '5px solid var(--olive-dark)',
                boxShadow: '0 12px 30px rgba(44, 53, 32, 0.08)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: 26, lineHeight: 1 }}>✨</span>
                <div>
                  <span style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', fontWeight: 800, color: 'var(--olive-dark)', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Key Highlight / Tip
                  </span>
                  <p style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--olive-dark)', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
                    {renderFormattedText(block.text)}
                  </p>
                </div>
              </div>
            );
          }
          if (block.type === 'img' || block.src) {
            const imgSrc = block.src || block.text;
            return (
              <figure key={i} style={{ margin: '28px 0' }}>
                <img
                  src={imgSrc}
                  alt={block.caption || post.title}
                  style={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                {block.caption && (
                  <figcaption style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8, textAlign: 'center', fontStyle: 'italic' }}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          const imgMatch = block.text?.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            return (
              <figure key={i} style={{ margin: '28px 0' }}>
                <img
                  src={imgMatch[2]}
                  alt={imgMatch[1] || post.title}
                  style={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                {imgMatch[1] && (
                  <figcaption style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8, textAlign: 'center', fontStyle: 'italic' }}>
                    {imgMatch[1]}
                  </figcaption>
                )}
              </figure>
            );
          }

          return <p key={i} style={{ fontSize: 16.5, lineHeight: 1.85, marginBottom: 22, color: 'var(--ink)' }}>{renderFormattedText(block.text)}</p>;
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