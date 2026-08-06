import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const brandName = useSetting('brandName', 'HairCare');
  const brandTagline = useSetting('brandTagline', 'Nourish. Grow. Glow.');
  const logoImage = useSetting('logoImage', '/images/logo.png');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-type both passwords.');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms & Conditions to create an account.');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, phone, password, 'customer');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create account. Please verify your input and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{
        maxWidth: 1120,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 480px',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(44, 53, 32, 0.15)',
        border: '1px solid var(--line)',
        background: 'var(--olive-dark)',
      }}>
        {/* Left Visual Banner */}
        <div style={{ padding: '48px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #2C3520 0%, #465434 100%)' }}>
          
          <div>
            {/* Navbar Logo match */}
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
              Natural Care<br />For Beautiful Hair
            </h1>
            <p style={{ color: '#E2E6D5', fontSize: 15, marginTop: 14, maxWidth: 390, lineHeight: 1.6 }}>
              Join thousands of happy customers who trust Natura Silk for stronger, silky, and glowing healthy hair.
            </p>

            {/* Man & Woman Hero Image Card */}
            <div style={{ marginTop: 28, position: 'relative', borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 12px 36px rgba(0,0,0,0.3)' }}>
              <img
                src="/images/man_woman_haircare.png"
                alt="Man and woman with healthy herbal hair care"
                style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px', background: 'linear-gradient(to top, rgba(20, 27, 16, 0.92), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: '#FAF6EE' }}>🌿 Crafted for Women & Men</span>
                <span style={{ fontSize: 11, background: '#C9A24B', color: '#1E2516', padding: '4px 10px', borderRadius: 12, fontWeight: 700 }}>HERBAL FORMULA</span>
              </div>
            </div>
          </div>

          {/* Bottom Ingredients Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
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
        <div style={{ background: 'white', padding: '44px 38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--olive-dark)', marginBottom: 6 }}>
              Create Your Account
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
              Join Natura Silk family today
            </p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', background: '#FEE2E2', border: '1px solid #F87171', color: '#991B1B', borderRadius: 8, fontSize: 13.5, marginBottom: 20, fontWeight: 500 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 11, color: '#8C9283', fontSize: 16 }}>👤</span>
                <input
                  required
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 11, color: '#8C9283', fontSize: 16 }}>✉️</span>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 11, color: '#8C9283', fontSize: 16 }}>📞</span>
                <input
                  required
                  type="tel"
                  placeholder="Enter your phone number (e.g., 03XXXXXXXXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '11px 32px 11px 14px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', padding: '11px 36px 11px 14px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: 9, background: 'none', border: 'none', color: '#6B6B5E', fontSize: 16, cursor: 'pointer', padding: 0 }}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ margin: '8px 0 2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-soft)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: 17, height: 17, accentColor: 'var(--olive)' }}
                />
                <span>I agree to the <Link to="/policy" style={{ color: 'var(--olive-dark)', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</Link> and Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: 'var(--olive)', color: 'white', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: 8, boxShadow: '0 4px 14px rgba(63, 74, 46, 0.25)'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--ink-soft)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--olive-dark)', fontWeight: 700, textDecoration: 'underline', marginLeft: 4 }}>
              Login
            </Link>
          </div>

          {/* Guest Checkout Assurance Banner */}
          <div style={{ marginTop: 28, padding: '12px 16px', background: 'var(--cream)', borderRadius: 12, border: '1px dashed var(--olive-mid)', textAlign: 'center', fontSize: 12.5, color: 'var(--olive-dark)', lineHeight: 1.5 }}>
            <strong>✨ Guest Checkout Ready:</strong> You do NOT need an account to purchase! Anyone can buy items without logging in.
          </div>
        </div>

      </div>
    </div>
  );
}
