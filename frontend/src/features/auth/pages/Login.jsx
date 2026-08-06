import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const brandName = useSetting('brandName', 'HairCare');
  const brandTagline = useSetting('brandTagline', 'Nourish. Grow. Glow.');
  const logoImage = useSetting('logoImage', '/images/logo.png');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Incorrect email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{
        maxWidth: 1100,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 440px',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(44, 53, 32, 0.15)',
        border: '1px solid var(--line)',
        background: 'var(--olive-dark)',
      }}>
        {/* Left Visual Banner */}
        <div style={{ padding: '48px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #2A3622 0%, #3F4A2E 100%)' }}>
          
          {/* Top Brand & Navbar Logo */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
              {logoImage && (
                <img
                  src={logoImage}
                  alt={brandName}
                  style={{ height: 60, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 30, fontFamily: 'var(--font-display)', fontWeight: 600, color: '#FAF6EE', lineHeight: 1.1 }}>
                  {brandName}
                </span>
                <span style={{ fontSize: 11, letterSpacing: '0.16em', color: '#C9A24B', fontWeight: 600, textTransform: 'uppercase', marginTop: 3 }}>
                  {brandTagline.toUpperCase().replace(/\. /g, ' · ').replace(/\.$/, '')}
                </span>
              </div>
            </Link>

            <h1 style={{ fontSize: 38, fontFamily: 'var(--font-display)', color: 'white', marginTop: 36, lineHeight: 1.2 }}>
              Healthy Hair<br />Starts Naturally
            </h1>
            <p style={{ color: '#E2E6D5', fontSize: 15, marginTop: 14, maxWidth: 380, lineHeight: 1.6 }}>
              Experience the power of herbal ingredients for stronger, shinier and healthier hair for both men and women.
            </p>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
              {[
                ['🌿', '100% Natural Ingredients'],
                ['🚫', 'Sulfate & Paraben Free'],
                ['🚚', 'Fast & Reliable Delivery'],
                ['⭐', 'Trusted by Thousands of Happy Customers']
              ].map(([icon, label], idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14.5, fontWeight: 500, color: '#F7F4EB' }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Man & Woman Hero Image Card */}
          <div style={{ marginTop: 32, position: 'relative', borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
            <img
              src="/images/man_woman_haircare.png"
              alt="Man and woman with beautiful healthy hair"
              style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                // fallback in case image isn't loaded yet
                e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 18px', background: 'linear-gradient(to top, rgba(20, 27, 16, 0.9), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FAF6EE' }}>✨ Natural Care For Him & Her</span>
              <span style={{ fontSize: 11, background: '#C9A24B', color: '#1E2516', padding: '3px 8px', borderRadius: 12, fontWeight: 700 }}>VERIFIED ORGANIC</span>
            </div>
          </div>

          {/* Bottom Ingredients Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[
              ['Aloe Vera', '🌱'],
              ['Argan Oil', '🌰'],
              ['Rosemary', '🪴'],
              ['Bhringraj', '🌼'],
            ].map(([name, icon]) => (
              <div key={name} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', padding: '10px 6px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#FAF6EE', marginTop: 6 }}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div style={{ background: 'white', padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--olive-dark)', marginBottom: 6 }}>
              Welcome Back <span style={{ color: '#5A8F53' }}>🌿</span>
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
              Sign in to your account to track orders & rewards
            </p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', background: '#FEE2E2', border: '1px solid #F87171', color: '#991B1B', borderRadius: 8, fontSize: 13.5, marginBottom: 20, fontWeight: 500 }}>
              ⚠️ {error}
            </div>
          )}

          {msg && (
            <div style={{ padding: '12px 16px', background: '#FEF3C7', border: '1px solid #F59E0B', color: '#92400E', borderRadius: 8, fontSize: 13.5, marginBottom: 20, fontWeight: 500 }}>
              ℹ️ {msg}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 13, color: '#8C9283', fontSize: 16 }}>✉️</span>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14.5, outline: 'none', transition: 'border-color 0.2s' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 13, color: '#8C9283', fontSize: 16 }}>🔒</span>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '12px 42px 12px 40px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14.5, outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: 11, background: 'none', border: 'none', color: '#6B6B5E', fontSize: 17, cursor: 'pointer', padding: 0 }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--ink-soft)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--olive)' }}
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setMsg('To reset your password, please contact support or re-register for demo access.')}
                style={{ background: 'none', border: 'none', color: 'var(--olive-dark)', textDecoration: 'underline', fontWeight: 600, padding: 0, fontSize: 13 }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: 'var(--olive)', color: 'white', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: 6, boxShadow: '0 4px 14px rgba(63, 74, 46, 0.25)'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--ink-soft)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--olive-dark)', fontWeight: 700, textDecoration: 'underline', marginLeft: 4 }}>
              Create Account
            </Link>
          </div>

          {/* Guest Buying Notice */}
          <div style={{ marginTop: 32, padding: '12px 16px', background: 'var(--cream)', borderRadius: 12, border: '1px dashed var(--olive-mid)', textAlign: 'center', fontSize: 12.5, color: 'var(--olive-dark)', lineHeight: 1.5 }}>
            <strong>🛍️ Buying without login?</strong> No account required! You can always browse & checkout freely as a guest without signing in.
          </div>
        </div>

      </div>
    </div>
  );
}
