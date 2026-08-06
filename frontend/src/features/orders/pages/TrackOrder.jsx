import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../../shared/api/client';

const STATUS_STEPS = ['placed', 'processing', 'dispatched', 'delivered'];

const STEP_LABELS = {
  placed: 'Order Placed',
  processing: 'Processing',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
};

const STEP_ICONS = {
  placed: '📋',
  processing: '⚙️',
  dispatched: '🚚',
  delivered: '✅',
};

const STEP_DESC = {
  placed: 'Your order has been received and is awaiting processing.',
  processing: 'We are preparing your items for dispatch.',
  dispatched: 'Your order is on its way to you!',
  delivered: 'Your order has been delivered. Enjoy your products!',
};

export default function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    client.get(`/orders/${id}`)
      .then((r) => { setOrder(r.data.order); setItems(r.data.items); })
      .catch(() => setError('Order not found. Please check the link in your email.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>Order Not Found</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>{error}</p>
          <Link to="/" className="btn btn-primary">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  const isCancelled = order.status === 'cancelled';
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: 'var(--olive-dark)', color: 'white', padding: '20px 0', marginBottom: 40 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'white' }}>
            <img src="/images/logo.png" alt="Natura Silk" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} onError={(e) => e.target.style.display = 'none'} />
            <span style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 600 }}>Natura Silk</span>
          </Link>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Order Tracking</span>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        {/* Order Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 28, marginBottom: 6 }}>
            Order #{order.id.slice(-6).toUpperCase()}
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {order.shipping_name}
          </p>
        </div>

        {/* Status Card */}
        <div style={{
          background: 'white', borderRadius: 12, border: '1px solid var(--line)',
          padding: '32px 28px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          {isCancelled ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
              <div style={{
                display: 'inline-block', padding: '10px 28px', borderRadius: 24,
                background: '#FDECEC', color: '#B3261E', fontWeight: 700, fontSize: 15,
              }}>
                This order has been cancelled
              </div>
            </div>
          ) : (
            <>
              {/* Current status highlight */}
              {order.status !== 'cancelled' && STATUS_STEPS.includes(order.status) && (
                <div style={{
                  background: 'var(--cream)', borderRadius: 8, padding: '16px 20px',
                  marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 32 }}>{STEP_ICONS[order.status]}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{STEP_LABELS[order.status]}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 2 }}>
                      {STEP_DESC[order.status]}
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {STATUS_STEPS.map((step, i) => {
                  const done = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: done ? 'var(--olive-dark)' : 'var(--cream-deep)',
                          color: done ? 'white' : 'var(--ink-soft)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, fontWeight: 700, flexShrink: 0,
                          boxShadow: isCurrent ? '0 0 0 4px rgba(63,74,46,0.2)' : 'none',
                          transition: 'all 0.3s',
                        }}>
                          {done ? '✓' : i + 1}
                        </div>
                        <span style={{
                          fontSize: 11.5, fontWeight: isCurrent ? 700 : 600,
                          color: done ? 'var(--olive-dark)' : 'var(--ink-soft)',
                          whiteSpace: 'nowrap',
                        }}>
                          {STEP_LABELS[step]}
                        </span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div style={{
                          flex: 1, height: 3, borderRadius: 2,
                          background: i < currentStepIndex ? 'var(--olive-dark)' : 'var(--cream-deep)',
                          margin: '0 6px 24px',
                          transition: 'background 0.4s',
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Order Items */}
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--line)', padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-soft)', marginBottom: 16 }}>
            Items Ordered
          </h3>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', fontSize: 14.5,
              padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--cream-deep)' : 'none',
            }}>
              <span>{it.product_name} <span style={{ color: 'var(--ink-soft)' }}>× {it.quantity}</span></span>
              <span style={{ fontWeight: 600 }}>PKR {(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div style={{
            borderTop: '2px solid var(--line)', marginTop: 14, paddingTop: 14,
            display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16,
            color: 'var(--olive-dark)',
          }}>
            <span>Total</span>
            <span>PKR {order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--line)', padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              Shipping To
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              {order.shipping_name}<br />
              {order.shipping_phone}<br />
              {order.shipping_address}, {order.shipping_city}
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--line)', padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              Payment
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}<br />
              Subtotal: PKR {order.subtotal.toLocaleString()}<br />
              Shipping: {order.shipping === 0 ? 'Free' : `PKR ${order.shipping.toLocaleString()}`}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/shop" className="btn btn-primary">Continue Shopping →</Link>
        </div>
      </div>
    </div>
  );
}
