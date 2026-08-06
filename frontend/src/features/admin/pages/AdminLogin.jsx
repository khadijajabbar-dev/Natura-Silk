// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import adminClient from '../api/adminClient';

// export default function AdminLogin() {
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const res = await adminClient.post('/login', { password });
//       localStorage.setItem('haircare_admin_token', res.data.token);
//       navigate('/admin/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Could not log in. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{
//       minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
//       background: 'var(--cream-deep)', padding: 20,
//     }}>
//       <div style={{
//         width: '100%', maxWidth: 380, background: 'white', borderRadius: 10,
//         padding: '40px 36px', boxShadow: '0 8px 32px rgba(44,53,32,0.12)',
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: 28 }}>
//           <div style={{ fontSize: 28, fontFamily: 'var(--font-display)', color: 'var(--olive-dark)', marginBottom: 4 }}>
//             🌿 HairCare
//           </div>
//           <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Admin Panel</div>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--ink)' }}>
//             Admin Password
//           </label>
//           <div style={{ position: 'relative', marginBottom: 16 }}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoFocus
//               placeholder="Enter admin password"
//               style={{
//                 width: '100%', padding: '11px 40px 11px 14px', borderRadius: 6,
//                 border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box',
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               style={{
//                 position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
//                 background: 'none', border: 'none', cursor: 'pointer', fontSize: 13,
//                 color: 'var(--ink-soft)',
//               }}
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>

//           {error && (
//             <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>
//           )}

//           <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
//             {loading ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>

//         <div style={{ textAlign: 'center', marginTop: 20 }}>
//           <Link to="/" style={{ fontSize: 13, color: 'var(--olive-mid)' }}>← Back to website</Link>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminClient from '../api/adminClient';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminClient.post('/login', { password });
      localStorage.setItem('haircare_admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not log in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--cream-deep)', padding: 20,
    }}>
      <div style={{
        width: '100%', maxWidth: 380, background: 'white', borderRadius: 10,
        padding: '40px 36px', boxShadow: '0 8px 32px rgba(44,53,32,0.12)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src="/images/logo.png" alt="Natura Silk" style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 8, marginBottom: 8 }} />
          <div style={{ fontSize: 28, fontFamily: 'var(--font-display)', color: 'var(--olive-dark)', marginBottom: 4 }}>
            Natura Silk
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Admin Panel</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--ink)' }}>
            Admin Password
          </label>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter admin password"
              style={{
                width: '100%', padding: '11px 40px 11px 14px', borderRadius: 6,
                border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 13,
                color: 'var(--ink-soft)',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <div style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/" style={{ fontSize: 13, color: 'var(--olive-mid)' }}>← Back to website</Link>
        </div>
      </div>
    </div>
  );
}
