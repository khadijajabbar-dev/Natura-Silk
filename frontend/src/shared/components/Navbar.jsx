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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const mobileLinkStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--olive-dark)',
    padding: '10px 14px',
    borderRadius: '8px',
    background: 'var(--white)',
    border: '1px solid var(--line)',
    textDecoration: 'none',
    display: 'block',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="navbar">
        <div className="container" style={{ position: 'relative' }}>
          {/* Logo */}
          <Link to="/" className="logo" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {logoImage && (
              <img
                src={logoImage}
                alt=""
                style={{ height: 52, width: 'auto', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--olive-dark)', lineHeight: 1.05, letterSpacing: '0.01em' }}>
                {brandName}
              </span>
              <span style={{ fontSize: 9.5, fontFamily: 'var(--font-body)', letterSpacing: '0.14em', color: 'var(--olive)', fontWeight: 600, marginTop: 4 }}>
                {brandTagline.toUpperCase().replace(/\. /g, ' · ').replace(/\.$/, '')}
              </span>
            </div>
          </Link>

          {/* Nav links (Desktop & Laptop) */}
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <div className="nav-dropdown">
              <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>
                Shop
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
            <Link to="/wishlist" className="icon-btn hide-mobile-tiny" aria-label="Wishlist" title="Wishlist">
              <HeartIcon />
              {wishCount > 0 && <span className="cart-badge">{wishCount}</span>}
            </Link>
            {/* Cart */}
            <Link to="/cart" className="icon-btn" aria-label="Cart" title="Cart">
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
                gap: 6,
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
              <span className="auth-btn-text">{user ? user.name.split(' ')[0] : 'Login'}</span>
            </Link>
            {/* Hamburger Button (Mobile & Tablet) */}
            <button
              className="icon-btn hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{ background: 'var(--cream-deep)', border: '1px solid var(--line)', borderRadius: '8px', padding: '6px 10px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--olive-dark)" strokeWidth="2.2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer" style={{
            background: 'var(--cream)',
            borderBottom: '2px solid var(--olive)',
            padding: '20px 24px',
            boxShadow: '0 15px 35px rgba(44,53,32,0.18)',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeIn 0.2s ease-out',
          }}>
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Shop All</NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>About Us</NavLink>
            <NavLink to="/ingredients" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Our Ingredients</NavLink>
            <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Blog Articles</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Contact Us</NavLink>
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                ❤️ Wishlist ({wishCount})
              </Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm" style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                🛍️ Cart ({count})
              </Link>
            </div>
          </div>
        )}

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