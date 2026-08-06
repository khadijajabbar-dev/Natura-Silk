
import { useState, useEffect } from 'react';
import adminClient from '../api/adminClient';
import ImageField from './ImageField';

const emptyForm = { name: '', image: '' };

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function loadCategories() {
    adminClient.get('/categories').then((r) => setCategories(r.data.categories));
  }

  useEffect(() => {
    Promise.all([
      adminClient.get('/categories'),
      adminClient.get('/images'),
    ]).then(([c, i]) => {
      setCategories(c.data.categories);
      setImageList(i.data.images);
      setLoading(false);
    });
  }, []);

  function startEdit(c) {
    setEditingId(c.id);
    setForm({ name: c.name, image: c.image || '' });
    setShowAddForm(false);
  }

  function startAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowAddForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await adminClient.put(`/categories/${editingId}`, form);
      } else {
        await adminClient.post('/categories', form);
      }
      setEditingId(null);
      setShowAddForm(false);
      setForm(emptyForm);
      loadCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save category.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category?')) return;
    try {
      await adminClient.delete(`/categories/${id}`);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.error || 'Could not delete category.');
    }
  }

  function cancelForm() {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyForm);
    setError('');
  }

  if (loading) return <p style={{ padding: 24 }}>Loading categories...</p>;

  const formOpen = showAddForm || editingId;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22 }}>Categories Manager</h2>
        {!formOpen && <button onClick={startAdd} className="btn btn-primary">+ New Category</button>}
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} style={{
          background: 'white', border: '1px solid var(--line)', borderRadius: 8,
          padding: 24, marginBottom: 24, maxWidth: 480,
        }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>{editingId ? 'Edit Category' : 'New Category'}</h3>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Image</label>
            <ImageField
              id="category-form-image"
              value={form.image}
              onChange={(val) => setForm({ ...form, image: val })}
              imageList={imageList}
              onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
              round
            />
          </div>

          {error && <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Category'}</button>
            <button type="button" onClick={cancelForm} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {categories.map((c) => (
          <div key={c.id} style={{
            background: 'white', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden',
            textAlign: 'center', padding: '18px 12px',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px',
              background: 'var(--cream-deep)',
            }}>
              {c.image && <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{c.name}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => startEdit(c)} style={{
                flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
                border: '1px solid var(--line)', background: 'white', cursor: 'pointer',
              }}>Edit</button>
              <button onClick={() => handleDelete(c.id)} style={{
                flex: 1, padding: '7px 0', borderRadius: 5, fontSize: 12.5, fontWeight: 600,
                border: '1px solid #E8B4AE', background: '#FDF1F0', color: '#B3261E', cursor: 'pointer',
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
