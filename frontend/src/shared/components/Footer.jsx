import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSetting } from '../hooks/SiteSettingsContext.jsx';
import { getWhatsAppNumber, getWhatsAppUrl } from '../utils/whatsapp.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const brandName = useSetting('brandName', 'HairCare');
  const brandTagline = useSetting('brandTagline', 'Nourish. Grow. Glow.');
  const logoImage = useSetting('logoImage', '/images/logo.png');
  const footerDescription = useSetting('footerDescription', 'Natural hair care products made with love and the finest ingredients from nature. Free from sulfates, parabens & harsh chemicals.');
  const contactPhone = useSetting('contactPhone', '+92 300 1234567');
  const contactEmail = useSetting('contactEmail', 'info@haircare.com');
  const contactAddress = useSetting('contactAddress', 'Lahore, Pakistan');
  function withProtocol(url) {
    if (!url || url === '#') return url;
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }
  const instagramUrl = withProtocol(useSetting('socialInstagram', '#'));
  const facebookUrl = withProtocol(useSetting('socialFacebook', '#'));
  const tiktokUrl = withProtocol(useSetting('socialTiktok', '#'));
  const whatsappNumberRaw = useSetting('whatsappNumber', '');
  const whatsappDigits = getWhatsAppNumber(whatsappNumberRaw);
  const whatsappUrl = whatsappDigits ? getWhatsAppUrl(whatsappDigits) : '';

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <>
      {/* ── NEWSLETTER — floating card ── */}
      <div style={{ background: 'var(--cream)', padding: '48px 0 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Newsletter card */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 18,
            boxShadow: '0 20px 40px rgba(44,53,32,0.12)',
            padding: '36px 40px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 24, position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--cream-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>✉️</div>
                <div>
                  <h3 style={{ color: 'var(--olive-dark)', fontSize: 22, marginBottom: 4, fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    Join Our {brandName} Family
                  </h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 13.5 }}>Get exclusive offers, hair care tips &amp; more straight to your inbox.</p>
                </div>
              </div>
              {subscribed ? (
                <span style={{ color: 'var(--olive-dark)', fontWeight: 600, fontSize: 14 }}>Thanks for subscribing! 🌿</span>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0, maxWidth: 400, width: '100%', borderRadius: 6, border: '1px solid var(--line)' }}>
                  <input
                    type="email" required placeholder="Enter your email address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1, padding: '13px 18px', border: 'none',
                      borderRadius: '6px 0 0 6px', fontSize: 14,
                      background: 'transparent', color: 'var(--ink)',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" style={{
                    padding: '13px 24px', background: 'var(--olive-dark)', color: 'white',
                    border: 'none', borderRadius: '0 6px 6px 0',
                    fontWeight: 700, fontSize: 13, letterSpacing: '0.05em', cursor: 'pointer',
                  }}>
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <footer style={{ background: 'var(--olive-dark)', color: '#C9CFB8', padding: '52px 0 0', borderTop: '3px solid var(--gold)', marginTop: 40 }}>
        <div style={{ textAlign: 'center', marginTop: -1, marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.4)' }} />
            <span style={{ fontSize: 14, color: 'var(--gold)' }}>🌿</span>
            <span style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.4)' }} />
          </div>
        </div>
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40 }}>

            {/* Col 1 — Logo + desc + social */}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 500,
                color: 'white', marginBottom: 4, lineHeight: 1.1,
              }}>
                {logoImage && (
                  <img
                    src={logoImage}
                    alt=""
                    style={{ height: 56, width: 'auto', objectFit: 'contain' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                {brandName}
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>
                {brandTagline}
              </div>
              <p style={{ color: '#A7AE94', fontSize: 13.5, lineHeight: 1.7, marginBottom: 20, maxWidth: 240 }}>
                {footerDescription}
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { 
                    label: 'Facebook', 
                    icon: (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.8l.2-4H14V7a1 1 0 0 1 1-1h3V2z" />
                      </svg>
                    ), 
                    bg: '#1877F2', 
                    href: facebookUrl 
                  },
                  { 
                    label: 'Instagram', 
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    ), 
                    bg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', 
                    href: instagramUrl 
                  },
                  { 
                    label: 'TikTok', 
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    ), 
                    bg: '#000000', 
                    href: tiktokUrl 
                  },
                  { 
                    label: 'WhatsApp', 
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.005 22l4.985-1.393A9.954 9.954 0 0 0 11.999 22c5.522 0 10-4.477 10-10s-4.478-10-10-10zm5.824 14.285c-.244.686-1.42 1.317-1.954 1.397-.504.076-1.164.114-3.328-.782-2.766-1.144-4.57-4.004-4.708-4.188-.138-.184-1.125-1.498-1.125-2.856 0-1.359.709-2.029.96-2.296.251-.267.549-.335.732-.335.183 0 .366.002.526.01.171.008.403-.064.632.485.244.588.835 2.039.907 2.186.073.147.122.318.024.515-.098.197-.146.319-.293.491-.146.172-.305.385-.438.519-.146.147-.3.308-.13.602.17.294.757 1.252 1.628 2.028 1.121.999 2.067 1.309 2.36 1.456.294.147.465.122.636-.074.171-.196.732-.852.927-1.146.195-.294.391-.245.66-.147.268.098 1.708.809 2 .956.292.147.488.22.562.343.073.123.073.71-.171 1.396z" />
                      </svg>
                    ), 
                    bg: '#25D366', 
                    href: whatsappUrl 
                  },
                ].filter(s => s.href).map(({ label, icon, bg, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 13, fontWeight: 700,
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <h4 style={{
                color: 'white', fontFamily: 'var(--font-body)', fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontWeight: 700, marginBottom: 10,
              }}>Quick Links</h4>
              <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: 18, borderRadius: 1 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  ['Home', '/'],
                  ['Shop', '/shop'],
                  ['About Us', '/about'],
                  ['Our Ingredients', '/ingredients'],
                  ['Blog', '/blog'],
                  ['Contact Us', '/contact'],
                ].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{
                      color: '#A7AE94', fontSize: 13.5, textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#A7AE94'; }}
                    >
                      › {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Customer Service */}
            <div>
              <h4 style={{
                color: 'white', fontFamily: 'var(--font-body)', fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontWeight: 700, marginBottom: 10,
              }}>Customer Service</h4>
              <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: 18, borderRadius: 1 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  ['Shipping & Delivery', '/shipping-delivery'],
                  ['Returns & Refunds', '/returns-refunds'],
                  ['Terms & Conditions', '/terms-conditions'],
                  ['Privacy Policy', '/privacy-policy'],
                  ['FAQ', '/faq'],
                ].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{
                      color: '#A7AE94', fontSize: 13.5, textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#A7AE94'; }}
                    >
                      › {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact Us */}
            <div>
              <h4 style={{
                color: 'white', fontFamily: 'var(--font-body)', fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontWeight: 700, marginBottom: 10,
              }}>Contact Us</h4>
              <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: 18, borderRadius: 1 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 15, marginTop: 1 }}>📞</span>
                  <div>
                    <div style={{ color: 'white', fontSize: 13.5, fontWeight: 600 }}>{contactPhone}</div>
                    <div style={{ color: '#A7AE94', fontSize: 12 }}>24/7 Support</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 15, marginTop: 1 }}>✉️</span>
                  <div>
                    <div style={{ color: 'white', fontSize: 13.5, fontWeight: 600 }}>{contactEmail}</div>
                    <div style={{ color: '#A7AE94', fontSize: 12 }}>We reply within 24 hours</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 15, marginTop: 1 }}>📍</span>
                  <div>
                    <div style={{ color: 'white', fontSize: 13.5, fontWeight: 600 }}>{contactAddress}</div>
                  </div>
                </li>
              </ul>

              {/* We Accept */}
              <div style={{ marginTop: 24 }}>
                <div style={{ color: '#A7AE94', fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                  We Accept
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['VISA', 'MC', 'Easypaisa'].map((card) => (
                    <div key={card} style={{
                      background: 'white', borderRadius: 5, padding: '5px 10px',
                      fontSize: 10.5, fontWeight: 800, color: '#333',
                      letterSpacing: '0.02em', boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}>{card}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── FOOTER BOTTOM ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ color: '#A7AE94', fontSize: 12.5 }}>
              © 2026 {brandName}. All rights reserved.
            </span>
            <span style={{ color: '#A7AE94', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Made with <span style={{ color: 'var(--gold)' }}>🌿</span> in Pakistan
              </span>
              <Link to="/admin" style={{ color: '#7E866B', fontSize: 11.5, textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 16 }}>
                Admin
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}