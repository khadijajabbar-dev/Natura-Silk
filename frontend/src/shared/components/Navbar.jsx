import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../features/cart/hooks/CartContext';
import { useWishlist } from '../../features/wishlist/hooks/WishlistContext';
import { useSetting } from '../hooks/SiteSettingsContext.jsx';
import { useAuth } from '../../features/auth/hooks/AuthContext.jsx';

export default function Navbar() {
  const { user } = useAuth() || { user: null };
  const { count } = useCart();
  const brandName = useSetting('brandName', 'HairCare');
  const brandTagline = useSetting('brandTagline', 'Nourish. Grow. Glow.');
  const logoImage = useSetting('logoImage', '/images/logo.png');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const { count: wishCount } = useWishlist();

  function handleSearch(e) {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <header className="navbar">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {logoImage && (
              <img
                src={logoImage}
                alt=""
                style={{ height: 64, width: 'auto', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: 32, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--olive-dark)', lineHeight: 1.05, letterSpacing: '0.01em' }}>
                {brandName}
              </span>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-body)', letterSpacing: '0.16em', color: 'var(--olive)', fontWeight: 600, marginTop: 4 }}>
                {brandTagline.toUpperCase().replace(/\. /g, ' · ').replace(/\.$/, '')}
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <div className="nav-dropdown">
              <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>
                Shop <span style={{ fontSize: 10 }}></span>
              </NavLink>
            </div>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink>
            <NavLink to="/ingredients" className={({ isActive }) => isActive ? 'active' : ''}>Our Ingredients</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
          </nav>

          {/* Icons */}
          <div className="nav-icons">
            {/* Wishlist */}
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <HeartIcon />
              {wishCount > 0 && <span className="cart-badge">{wishCount}</span>}
            </Link>
            {/* Cart */}
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <CartIcon />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
            {/* User Auth Link */}
            <Link
              to={user ? "/profile" : "/login"}
              className="icon-btn"
              aria-label="Account"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 12px',
                borderRadius: 20,
                textDecoration: 'none',
                background: user ? 'var(--cream-deep)' : 'rgba(46, 75, 52, 0.08)',
                border: '1px solid var(--line)',
                color: 'var(--olive-dark)',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s ease',
              }}
            >
              <UserIcon />
              <span>{user ? user.name.split(' ')[0] : 'Login'}</span>
            </Link>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div style={{
            background: 'var(--cream-deep)', borderTop: '1px solid var(--line)',
            padding: '14px 0',
          }}>
            <div className="container">
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: 0, maxWidth: 560 }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  style={{
                    flex: 1, padding: '11px 16px', border: '1px solid var(--line)',
                    borderRight: 'none', borderRadius: '4px 0 0 4px',
                    fontSize: 14, background: 'var(--white)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '11px 20px', background: 'var(--olive)', color: 'white',
                    border: 'none', borderRadius: '0 4px 4px 0', fontWeight: 600, fontSize: 14,
                  }}
                >Search</button>
              </form>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}