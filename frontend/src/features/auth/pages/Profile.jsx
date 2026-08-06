import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import client from '../../../shared/api/client';

export default function Profile() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p style={{ fontSize: 18, color: 'var(--ink-soft)' }}>Loading account profile...</p>
      </div>
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setError('');
    try {
      const res = await client.put('/auth/me', { name, phone, address });
      setMsg('Profile updated successfully! Your default checkout details have been refreshed.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="container section" style={{ maxWidth: 840, margin: '40px auto', padding: '0 24px' }}>
      <div style={{
        background: 'white',
        border: '1px solid var(--line)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(44, 53, 32, 0.06)',
      }}>
        {/* Profile Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--olive-dark) 0%, var(--olive) 100%)',
          padding: '36px 40px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', color: '#FAF6EE', padding: '4px 12px', borderRadius: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Customer Account
              </span>
            </div>
            <h1 style={{ fontSize: 32, color: 'white', fontWeight: 600, margin: 0 }}>
              Welcome, {user.name}!
            </h1>
            <p style={{ color: '#DCE4CD', fontSize: 14.5, marginTop: 6 }}>
              {user.email}
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              background: '#C9A24B',
              color: '#1A2114',
              padding: '10px 22px',
              borderRadius: 24,
              border: 'none',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            <span>🚪</span> Logout
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '40px' }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--olive-dark)', marginBottom: 24, borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
            Account & Shipping Details
          </h3>

          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24, lineHeight: 1.6 }}>
            Keep your profile details updated so they are automatically pre-filled whenever you visit the Checkout page.
          </p>

          {msg && (
            <div style={{ padding: '14px 18px', background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', borderRadius: 10, marginBottom: 20, fontWeight: 500, fontSize: 14 }}>
              ✅ {msg}
            </div>
          )}

          {error && (
            <div style={{ padding: '14px 18px', background: '#FEE2E2', border: '1px solid #F87171', color: '#991B1B', borderRadius: 10, marginBottom: 20, fontWeight: 500, fontSize: 14 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Full Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03XXXXXXXXX"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Default Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Street #, Sector/Block, City"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '14px 32px',
                background: 'var(--olive)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                cursor: saving ? 'not-allowed' : 'pointer',
                width: 'fit-content',
                marginTop: 10,
              }}
            >
              {saving ? 'Saving Changes...' : 'Save Profile Details'}
            </button>
          </form>

          {/* Quick Links Footer */}
          <div style={{ marginTop: 42, paddingTop: 26, borderTop: '1px solid var(--line)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: 17, marginBottom: 4 }}>Need help with an existing order?</h4>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>All tracking links are dispatched directly to your inbox upon order placement.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/shop" className="btn btn-outline" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13.5 }}>
                Browse Shop
              </Link>
              <Link to="/account" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13.5 }}>
                View Tracking Guide
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
