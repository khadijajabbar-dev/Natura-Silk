import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/CartContext';

const SHIPPING_FEE = 200;
const FREE_SHIPPING_THRESHOLD = 2000;

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="container section"><div className="spinner" /></div>;

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="container section">
      <h1 style={{ fontSize: 30, marginBottom: 28 }}>Shopping Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((item) => (
            <div key={item.cart_item_id} style={{
              display: 'flex', gap: 16, background: 'white', border: '1px solid var(--line)',
              borderRadius: 6, padding: 14, alignItems: 'center',
            }}>
              <img src={item.image} alt={item.name} style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 4 }} />
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.slug}`} style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</Link>
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 4 }}>PKR {item.price.toLocaleString()} each</div>
                <div className="qty-control" style={{ marginTop: 10 }}>
                  <button onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>PKR {(item.price * item.quantity).toLocaleString()}</div>
                <button
                  onClick={() => removeItem(item.cart_item_id)}
                  style={{ background: 'none', border: 'none', color: 'var(--maroon)', fontSize: 13 }}
                >Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 6, padding: 22 }}>
          <h3 style={{ fontSize: 17, marginBottom: 18 }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
            <span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
            <span>Shipping</span><span>{shipping === 0 ? 'Free' : `PKR ${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: 12.5, marginBottom: 10 }}>Add PKR {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for free shipping.</p>
          )}
          <div style={{
            display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700,
            borderTop: '1px solid var(--line)', paddingTop: 14, marginTop: 8, marginBottom: 18, color: 'var(--olive-dark)',
          }}>
            <span>Total</span><span>PKR {total.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          <Link to="/shop" className="btn btn-outline btn-block" style={{ marginTop: 10 }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
