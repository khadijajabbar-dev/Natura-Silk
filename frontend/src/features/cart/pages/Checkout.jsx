import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../../../shared/api/client';
import { useCart } from '../hooks/CartContext';
import { useAuth } from '../../auth/hooks/AuthContext';

const SHIPPING_FEE = 200;
const FREE_SHIPPING_THRESHOLD = 2000;

export default function Checkout() {
  const { user } = useAuth() || { user: null };
  const { items, subtotal, refreshCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shipping_name: user?.name || '',
    shipping_email: user?.email || '',
    shipping_phone: user?.phone || '',
    shipping_address: user?.address || '',
    shipping_city: '',
    payment_method: 'cod',
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        shipping_name: f.shipping_name || user.name || '',
        shipping_email: f.shipping_email || user.email || '',
        shipping_phone: f.shipping_phone || user.phone || '',
        shipping_address: f.shipping_address || user.address || '',
      }));
    }
  }, [user]);
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h3>Nothing to check out</h3>
        <p>Add some products to your cart first.</p>
        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      const res = await client.post('/orders/checkout', form);
      await refreshCart();
      navigate('/account', { state: { orderPlaced: res.data.order.id } });
    } catch (err) {
      setError(err.response?.data?.error || 'Could not place your order. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: 30, marginBottom: 20 }}>Checkout</h1>

      {!user ? (
        <div style={{
          background: 'var(--cream)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          padding: '16px 22px',
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--olive-dark)', fontSize: 15 }}>✨ You are checking out as a guest — no account required!</span>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 4 }}>
              Anyone can complete purchases without signing up. If you already have an account, you can login to autofill your delivery details.
            </p>
          </div>
          <Link to="/login" style={{ padding: '9px 20px', borderRadius: 24, background: 'var(--olive)', color: 'white', fontSize: 13.5, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(44,53,32,0.15)' }}>
            Login / Register →
          </Link>
        </div>
      ) : (
        <div style={{
          background: '#DCFCE7',
          border: '1px solid #86EFAC',
          color: '#166534',
          borderRadius: 12,
          padding: '14px 20px',
          marginBottom: 28,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 500,
        }}>
          <span>👤 Logged in as <strong>{user.name}</strong> ({user.email}). We've automatically pre-filled your saved shipping details!</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'flex-start' }}>
        <form onSubmit={handlePlaceOrder} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 6, padding: 26 }}>
          {error && <div className="form-error">{error}</div>}
          <h3 style={{ fontSize: 16, marginBottom: 18 }}>Shipping Details</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input required value={form.shipping_name} onChange={(e) => update('shipping_name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input required type="email" value={form.shipping_email} onChange={(e) => update('shipping_email', e.target.value)} placeholder="you@example.com" />
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 5 }}>We'll email your order confirmation with a Track Order link.</p>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input required value={form.shipping_phone} onChange={(e) => update('shipping_phone', e.target.value)} placeholder="03XXXXXXXXX" />
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input required value={form.shipping_address} onChange={(e) => update('shipping_address', e.target.value)} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input required value={form.shipping_city} onChange={(e) => update('shipping_city', e.target.value)} />
          </div>

          <h3 style={{ fontSize: 16, margin: '24px 0 14px' }}>Payment Method</h3>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { value: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay in cash when your order arrives.' },
              { value: 'bank', icon: '🏦', label: 'Bank Transfer', desc: 'Transfer to our account, we\'ll confirm by phone.' },
              { value: 'easypaisa', icon: '📱', label: 'Easypaisa / JazzCash', desc: 'Pay instantly from your mobile wallet.' },
            ].map((opt) => (
              <label key={opt.value} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                border: `1.5px solid ${form.payment_method === opt.value ? 'var(--olive)' : 'var(--line)'}`,
                borderRadius: 6, cursor: 'pointer',
                background: form.payment_method === opt.value ? 'var(--cream)' : 'white',
                transition: 'all 0.15s',
              }}>
                <input
                  type="radio" name="pay" checked={form.payment_method === opt.value}
                  onChange={() => update('payment_method', opt.value)}
                  style={{ width: 'auto', marginTop: 3 }}
                />
                <span style={{ fontSize: 20, lineHeight: 1 }}>{opt.icon}</span>
                <span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 14 }}>{opt.label}</span>
                  <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>{opt.desc}</span>
                </span>
              </label>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 22,
            padding: '14px 8px', background: 'var(--cream)', borderRadius: 6,
          }}>
            {[
              ['🔒', 'Secure Checkout'],
              ['🚚', 'Fast Delivery'],
              ['↩️', 'Easy Returns'],
              ['✅', '100% Genuine'],
            ].map(([icon, label]) => (
              <div key={label} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 17 }}>{icon}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-soft)', fontWeight: 600, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={placing} style={{ marginTop: 20 }}>
            {placing ? 'Placing Order...' : `Place Order — PKR ${total.toLocaleString()}`}
          </button>
        </form>

        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 6, padding: 22 }}>
          <h3 style={{ fontSize: 17, marginBottom: 18 }}>Order Summary</h3>
          {items.map((item) => (
            <div key={item.cart_item_id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 10 }}>
              <span>{item.name} × {item.quantity}</span>
              <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)', margin: '12px 0', paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `PKR ${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: 'var(--olive-dark)' }}>
              <span>Total</span><span>PKR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
