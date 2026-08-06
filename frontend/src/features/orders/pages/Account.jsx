import { useLocation, Link } from 'react-router-dom';

export default function Account() {
  const location = useLocation();
  const orderPlacedId = location.state?.orderPlaced;

  return (
    <div className="container section" style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
      <style>{`
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
      <div style={{
        textAlign: 'center',
        background: 'var(--cream)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        padding: '48px 32px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
      }}>
        {orderPlacedId ? (
          <>
            <div style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              background: '#3E8E4F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              animation: 'checkPop 0.5s ease-out',
              boxShadow: '0 6px 20px rgba(62, 142, 79, 0.3)',
            }}>
              <span style={{ color: 'white', fontSize: 36, lineHeight: 1 }}>✓</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>
              Order Placed Successfully!
            </h1>
            <div style={{
              display: 'inline-block',
              background: 'white',
              border: '1px solid var(--line)',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--olive-dark)',
              margin: '12px 0 24px',
            }}>
              Order #{orderPlacedId}
            </div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 28px' }}>
              Thank you for choosing us! We have sent a confirmation email to your inbox containing your complete order details and a secure **Track Order** link. You can check your delivery status anytime directly through your email.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>
              Order Confirmation & Tracking
            </h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 28px' }}>
              When you place an order, all order tracking and status updates are sent directly to your email via our secure automated mailer. Please check your email inbox for your tracking link.
            </p>
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-outline" style={{ padding: '12px 28px', borderRadius: 8 }}>
            Back to Home
          </Link>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '12px 32px', borderRadius: 8 }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}