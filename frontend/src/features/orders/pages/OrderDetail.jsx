import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../../shared/api/client';

const STATUS_STEPS = ['placed', 'processing', 'dispatched', 'delivered'];
const CANCELLABLE_STATUSES = ['placed', 'processing'];

const STEP_LABELS = {
  placed: 'Order Placed',
  processing: 'Processing',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  function load() {
    setLoading(true);
    client.get(`/orders/${id}`)
      .then((r) => { setOrder(r.data.order); setItems(r.data.items); })
      .catch(() => setError('Could not load this order.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [id]);

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    setError('');
    try {
      const res = await client.put(`/orders/${id}/cancel`);
      setOrder(res.data.order);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not cancel this order.');
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <div className="container section"><div className="spinner" /></div>;

  if (error && !order) {
    return (
      <div className="container section empty-state">
        <h3>Order not found</h3>
        <Link to="/account" className="btn btn-primary">Back to My Orders</Link>
      </div>
    );
  }

  const isCancelled = order.status === 'cancelled';
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);
  const canCancel = CANCELLABLE_STATUSES.includes(order.status);

  return (
    <div className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Order #{order.id.slice(-6).toUpperCase()}</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 13.5 }}>Placed on {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        {canCancel && (
          <button onClick={handleCancel} disabled={cancelling} className="btn btn-outline" style={{ borderColor: 'var(--maroon)', color: 'var(--maroon)' }}>
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
      </div>

      {error && <div className="form-error" style={{ marginBottom: 20 }}>{error}</div>}

      {/* Status timeline */}
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 8, padding: '28px 24px', marginBottom: 24 }}>
        {isCancelled ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <span style={{
              display: 'inline-block', padding: '8px 20px', borderRadius: 20,
              background: '#FDECEC', color: 'var(--maroon)', fontWeight: 700, fontSize: 13.5,
            }}>This order has been cancelled</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {STATUS_STEPS.map((step, i) => {
              const done = i <= currentStepIndex;
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: done ? 'var(--olive-dark)' : 'var(--cream-deep)',
                      color: done ? 'white' : 'var(--ink-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, flexShrink: 0,
                    }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: done ? 'var(--ink)' : 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
                      {STEP_LABELS[step]}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: i < currentStepIndex ? 'var(--olive-dark)' : 'var(--cream-deep)', margin: '0 8px 22px' }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Shipping To</div>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            {order.shipping_name}<br />
            {order.shipping_phone}<br />
            {order.shipping_address}, {order.shipping_city}
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Payment</div>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}<br />
            Subtotal: PKR {order.subtotal.toLocaleString()}<br />
            Shipping: {order.shipping === 0 ? 'Free' : `PKR ${order.shipping.toLocaleString()}`}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 12, textTransform: 'uppercase' }}>Items</div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid var(--cream-deep)' : 'none' }}>
            <span>{it.product_name} × {it.quantity}</span>
            <span>PKR {(it.price * it.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--olive-dark)' }}>
          <span>Total</span><span>PKR {order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
