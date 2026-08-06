import { useState, useEffect, useRef } from 'react';
import adminClient from '../api/adminClient';
import ImageField from './ImageField';

const emptyForm = {
  title: '',
  tag: '',
  excerpt: '',
  image: '',
  date: '',
  content: [],
  published: true,
};

const TAGS = ['Hair Care Tips', 'Ingredients', 'Hair Care Routine'];

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [contentText, setContentText] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploadingContentImg, setUploadingContentImg] = useState(false);

  const contentFileInputRef = useRef(null);

  function loadBlogs() {
    setLoading(true);
    Promise.all([
      adminClient.get('/blogs'),
      adminClient.get('/images'),
    ]).then(([r, i]) => {
      setBlogs(r.data.blogs);
      setImageList(i.data.images || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }

  useEffect(() => { loadBlogs(); }, []);

  // Convert plain text content to content blocks for easy editing
  function contentToText(content) {
    if (!content || content.length === 0) return '';
    return content.map((b) => {
      if (b.type === 'h') return `## ${b.text}`;
      if (b.type === 'img') return `![${b.caption || 'Blog Image'}](${b.src || b.text})`;
      return b.text;
    }).join('\n\n');
  }

  // Parse text back into content blocks
  function textToContent(text) {
    if (!text.trim()) return [];
    return text.split('\n\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        if (line.startsWith('## ')) {
          return { type: 'h', text: line.replace(/^## /, '') };
        }
        const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          return { type: 'img', src: imgMatch[2], caption: imgMatch[1], text: imgMatch[2] };
        }
        return { type: 'p', text: line };
      });
  }

  function startAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
    setContentText('');
    setError('');
    setShowForm(true);
  }

  function startEdit(b) {
    setEditingId(b.id);
    setForm({
      title: b.title,
      tag: b.tag || '',
      excerpt: b.excerpt || '',
      image: b.image || '',
      date: b.date || '',
      content: b.content || [],
      published: b.published !== false,
    });
    setContentText(contentToText(b.content));
    setError('');
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setContentText('');
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    const payload = {
      ...form,
      content: textToContent(contentText),
    };
    try {
      if (editingId) {
        await adminClient.put(`/blogs/${editingId}`, payload);
      } else {
        await adminClient.post('/blogs', payload);
      }
      cancel();
      loadBlogs();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this blog post permanently?')) return;
    setDeletingId(id);
    try {
      await adminClient.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert('Could not delete blog post.');
    } finally {
      setDeletingId(null);
    }
  }

  async function togglePublished(b) {
    try {
      await adminClient.put(`/blogs/${b.id}`, { published: !b.published });
      setBlogs((prev) => prev.map((x) => x.id === b.id ? { ...x, published: !x.published } : x));
    } catch {
      alert('Could not update blog status.');
    }
  }

  async function handleContentImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingContentImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await adminClient.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imgPath = res.data.path;
      setImageList((prev) => [...new Set([...prev, imgPath])]);
      const markdownTag = `\n\n![Blog Image](${imgPath})\n\n`;
      setContentText((prev) => prev + markdownTag);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to upload content image.');
    } finally {
      setUploadingContentImg(false);
      if (contentFileInputRef.current) contentFileInputRef.current.value = '';
    }
  }

  if (loading) return <p style={{ padding: 24 }}>Loading blogs...</p>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: 22 }}>Blogs Manager</h2>
        {!showForm && (
          <button
            onClick={startAdd}
            style={{
              background: 'var(--olive-dark)', color: 'white',
              border: 'none', borderRadius: 8, padding: '10px 20px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            + New Blog Post
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{
          background: 'white', border: '1px solid var(--line)', borderRadius: 10,
          padding: 28, marginBottom: 28,
        }}>
          <h3 style={{ fontSize: 18, marginBottom: 20 }}>
            {editingId ? 'Edit Blog Post' : 'New Blog Post'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && (
              <div style={{ background: '#FDECEC', color: '#B3261E', padding: '10px 14px', borderRadius: 6, fontSize: 13.5 }}>
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  style={inputStyle}
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <label style={labelStyle}>Tag / Category</label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  style={inputStyle}
                >
                  <option value="">Select tag...</option>
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Date</label>
              <input
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                style={inputStyle}
                placeholder="e.g. August 4, 2026"
              />
            </div>

            <div>
              <label style={labelStyle}>Cover Image (Uploaded via Multer)</label>
              <ImageField
                id="blog-cover-image"
                value={form.image}
                onChange={(val) => setForm((f) => ({ ...f, image: val }))}
                imageList={imageList}
                onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
              />
            </div>

            <div>
              <label style={labelStyle}>Excerpt (short description)</label>
              <input
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                style={inputStyle}
                placeholder="One-line summary shown on blog listing page"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>
                  Content
                  <span style={{ fontWeight: 400, color: 'var(--ink-soft)', marginLeft: 8 }}>
                    (New paragraph = blank line. Start line with <code>## </code> for heading)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => contentFileInputRef.current?.click()}
                  disabled={uploadingContentImg}
                  style={{
                    padding: '4px 10px', borderRadius: 6, border: '1px solid var(--olive)',
                    background: 'white', color: 'var(--olive-dark)', fontSize: 12, fontWeight: 700,
                    cursor: uploadingContentImg ? 'default' : 'pointer',
                  }}
                >
                  {uploadingContentImg ? 'Uploading Image...' : '🖼 Upload Image to Content'}
                </button>
                <input
                  ref={contentFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleContentImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                style={{ ...inputStyle, minHeight: 240, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }}
                placeholder={`Write your blog content here...\n\n## This becomes a heading\n\nThis becomes a paragraph.\n\n![Image Caption](/images/uploads/filename.jpg)`}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
              />
              <label htmlFor="published" style={{ fontSize: 14, cursor: 'pointer' }}>
                Published (visible on website)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: 'var(--olive-dark)', color: 'white', border: 'none',
                  borderRadius: 8, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Blog Post'}
              </button>
              <button
                type="button"
                onClick={cancel}
                style={{
                  background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)',
                  borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-soft)' }}>
          <p style={{ fontSize: 16, marginBottom: 8 }}>No blog posts yet.</p>
          <p style={{ fontSize: 13 }}>Click "New Blog Post" to add your first post.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {blogs.map((b) => (
            <div
              key={b.id}
              style={{
                background: 'white', border: '1px solid var(--line)', borderRadius: 8,
                padding: '16px 20px', display: 'flex', alignItems: 'center',
                gap: 16, flexWrap: 'wrap',
              }}
            >
              {b.image && (
                <img
                  src={b.image}
                  alt={b.title}
                  style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{b.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                  {b.tag && <span style={{ marginRight: 10 }}>🏷 {b.tag}</span>}
                  {b.date && <span style={{ marginRight: 10 }}>📅 {b.date}</span>}
                  <span style={{
                    fontWeight: 700, fontSize: 11,
                    color: b.published ? '#16794B' : '#B26A00',
                  }}>
                    {b.published ? '● Published' : '● Draft'}
                  </span>
                </div>
                {b.excerpt && (
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 500 }}>
                    {b.excerpt}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => togglePublished(b)}
                  style={{
                    padding: '7px 14px', borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid var(--line)', background: 'white', color: 'var(--ink)',
                  }}
                >
                  {b.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => startEdit(b)}
                  style={{
                    padding: '7px 14px', borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid var(--olive-dark)', background: 'transparent', color: 'var(--olive-dark)',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  disabled={deletingId === b.id}
                  style={{
                    padding: '7px 14px', borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    border: '1px solid #B3261E', background: 'transparent', color: '#B3261E',
                    opacity: deletingId === b.id ? 0.5 : 1,
                  }}
                >
                  {deletingId === b.id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
};

const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: 6,
  border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box',
  fontFamily: 'inherit',
};
