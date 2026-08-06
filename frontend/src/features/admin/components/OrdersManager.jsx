import { useState, useEffect } from 'react';
import adminClient from '../api/adminClient';

const STATUS_COLORS = {
  placed: { bg: '#FEF3E2', color: '#B26A00' },
  processing: { bg: '#E8F0FE', color: '#1A56DB' },
  dispatched: { bg: '#EDE9FE', color: '#6D28D9' },
  delivered: { bg: '#E7F6EC', color: '#16794B' },
  cancelled: { bg: '#FDECEC', color: '#B3261E' },
};

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  function loadOrders(status) {
    setLoading(true);
    adminClient.get('/orders', { params: { status } }).then((r) => {
      setOrders(r.data.orders);
      setStatuses(r.data.statuses);
      setLoading(false);
    });
  }

  useEffect(() => { loadOrders(filter); }, [filter]);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    try {
      await adminClient.put(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) return <p style={{ padding: 24 }}>Loading orders...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 20 }}>Orders</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', ...statuses].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
              border: '1px solid var(--line)', cursor: 'pointer', textTransform: 'capitalize',
              background: filter === s ? 'var(--olive-dark)' : 'white',
              color: filter === s ? 'white' : 'var(--ink)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map((o) => {
            const isOpen = expandedId === o.id;
            const badge = STATUS_COLORS[o.status] || STATUS_COLORS.placed;
            return (
              <div key={o.id} style={{
                background: 'white', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden',
              }}>
                <div
                  onClick={() => setExpandedId(isOpen ? null : o.id)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 20px', cursor: 'pointer', flexWrap: 'wrap', gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      Order #{o.id.slice(-6).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                      {o.customer_name} · {new Date(o.created_at).toLocaleDateString()} · {o.items.length} item(s)
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>PKR {o.total.toLocaleString()}</span>
                    <span style={{
                      fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                      padding: '4px 10px', borderRadius: 20,
                      background: badge.bg, color: badge.color,
                    }}>
                      {o.status}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--line)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase' }}>Shipping To</div>
                        <div style={{ fontSize: 13.5, lineHeight: 1.7 }}>
                          {o.shipping_name}<br />
                          {o.shipping_phone}<br />
                          {o.shipping_address}, {o.shipping_city}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase' }}>Payment</div>
                        <div style={{ fontSize: 13.5, lineHeight: 1.7 }}>
                          {o.payment_method === 'cod' ? 'Cash on Delivery' : o.payment_method}<br />
                          Subtotal: PKR {o.subtotal.toLocaleString()}<br />
                          Shipping: {o.shipping === 0 ? 'Free' : `PKR ${o.shipping.toLocaleString()}`}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Items</div>
                      {o.items.map((it, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '6px 0', borderBottom: i < o.items.length - 1 ? '1px solid var(--cream-deep)' : 'none' }}>
                          <span>{it.product_name} × {it.quantity}</span>
                          <span>PKR {(it.price * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Update status:</span>
                      <select
                        value={o.status}
                        disabled={updatingId === o.id}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 13.5, textTransform: 'capitalize' }}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s}</option>
                        ))}
                      </select>
                      {updatingId === o.id && <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Saving...</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
