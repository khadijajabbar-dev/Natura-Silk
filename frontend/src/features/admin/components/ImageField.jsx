
import { useState, useRef } from 'react';
import adminClient from '../api/adminClient';

// Text input (with autocomplete of existing images) + thumbnail preview +
// a real "Upload from device" button that sends the file to the backend,
// saves it on the server, and fills the field with the returned path.
export default function ImageField({ id, value, onChange, imageList, onUploaded, round = false }) {
  const [broken, setBroken] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const listId = `imgs-${id}`;

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await adminClient.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.path);
      setBroken(false);
      if (onUploaded) onUploaded(res.data.path);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 56, height: 56, borderRadius: round ? '50%' : 6, overflow: 'hidden', flexShrink: 0,
          background: 'var(--cream-deep)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--ink-soft)',
          textAlign: 'center',
        }}>
          {value && !broken ? (
            <img
              src={value}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
              onError={() => setBroken(true)}
              onLoad={() => setBroken(false)}
            />
          ) : 'No image'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              list={listId}
              value={value || ''}
              onChange={(e) => { setBroken(false); onChange(e.target.value); }}
              placeholder="/images/example.jpg or https://..."
              style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 13.5, boxSizing: 'border-box' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                padding: '0 16px', borderRadius: 6, border: '1px solid var(--olive)',
                background: uploading ? 'var(--cream-deep)' : 'white', color: 'var(--olive-dark)',
                fontSize: 12.5, fontWeight: 700, cursor: uploading ? 'default' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {uploading ? 'Uploading...' : '↑ Upload'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <datalist id={listId}>
            {imageList.map((src) => <option key={src} value={src} />)}
          </datalist>
          {error && <div style={{ fontSize: 11.5, color: '#B3261E', marginTop: 4 }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
