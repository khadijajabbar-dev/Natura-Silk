import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminClient from '../api/adminClient';
import SettingsPanel from '../components/SettingsPanel';
import ProductsManager from '../components/ProductsManager';
import CategoriesManager from '../components/CategoriesManager';
import OrdersManager from '../components/OrdersManager';
import BlogsManager from '../components/BlogsManager';

/* ─── tiny icon helper ───────────────────────────────────── */
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
const IC = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  orders: 'M20 6h-2.18c.07-.44.18-.88.18-1.33C18 2.99 16.21 1 14 1c-1.33 0-2.42.67-3.14 1.67L10 4 9.14 2.67C8.42 1.67 7.33 1 6 1 3.79 1 2 2.99 2 4.67c0 .45.11.89.18 1.33H0v14h20V6zM10 18H4v-6h6v6zm0-8H2V8h8v2zm0-4H3.03C3.01 5.95 3 5.82 3 5.67 3 4.2 4.35 3 6 3c1.09 0 1.87.59 2.39 1.31L10 6.18V6zm6 12h-4v-6h4v6zm4 0h-2v-6h2v6zm0-8H12V8h8v2zm0-4h-7V6.18l1.61-1.87C15.13 3.59 15.91 3 17 3c1.65 0 3 1.2 3 2.67 0 .15-.01.28-.03.33H20V6z',
  products: 'M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h8v4H6z',
  categories: 'M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z',
  blog: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41L9.25 5.35c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  bell: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  preview: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  logout: 'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  arrow: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
};

/* ─── settings structure ────────────────────────────────────── */
const SETTINGS_SECTIONS = [
  {
    id: 'brand', label: 'Brand & Identity', icon: '🌿',
    items: [{ group: 'Brand', label: 'Brand Name, Logo & Tagline' }],
  },
  {
    id: 'home', label: 'Home Page', icon: '🏠',
    items: [
      { group: 'Hero', label: 'Hero Banner' },
      { group: 'Promo Banner', label: 'Promo Banner & Offer' },
      { group: 'Best Sellers', label: 'Best Sellers Section' },
      { group: 'Why Choose', label: 'Why Choose Us' },
      { group: 'Testimonials', label: 'Customer Testimonials' },
      { group: 'Instagram', label: 'Instagram Gallery' },
      { group: 'Trust Bar', label: 'Trust Bar Icons' },
    ],
  },
  {
    id: 'pages', label: 'Website Pages', icon: '📄',
    items: [
      { group: 'About Page', label: 'About Page' },
      { group: 'Ingredients', label: 'Ingredient Cards (Home & Page)' },
      { group: 'Ingredients Page', label: 'Ingredients Page Heading' },
      { group: 'Contact Page', label: 'Contact Page' },
    ],
  },
  {
    id: 'general', label: 'Contact & Social', icon: '📞',
    items: [
      { group: 'Contact', label: 'Contact Info (Email, Phone, WhatsApp)' },
      { group: 'Social Media', label: 'Social Media Links' },
      { group: 'Footer', label: 'Footer Description' },
    ],
  },
];

const STATUS_COLORS = {
  placed: '#6B9BD2',
  processing: '#F0A850',
  dispatched: '#9B59B6',
  delivered: '#5A7A3A',
  cancelled: '#E74C3C',
};

const SETTINGS_KEYWORDS = {
  'Brand': 'logo site name identity branding tagline',
  'Hero': 'banner slider main image heading button homepage',
  'Promo Banner': 'promotion offer deal discount coupon sale',
  'Best Sellers': 'popular featured top selling',
  'Why Choose': 'features benefits advantages reasons',
  'Testimonials': 'reviews customer feedback quotes ratings',
  'Instagram': 'social gallery photos feed pictures',
  'Trust Bar': 'badges shipping guarantee secure payment icons',
  'About Page': 'about us story company mission vision',
  'Ingredients': 'ingredient cards photos natural organic',
  'Ingredients Page': 'ingredients heading title subtitle',
  'Contact Page': 'contact form address map location',
  'Contact': 'email phone whatsapp number address call',
  'Social Media': 'facebook instagram twitter tiktok youtube linkedin social links',
  'Footer': 'copyright bottom description text links',
};

const SEARCH_ITEMS = [
  { label: 'Dashboard', desc: 'Overview, stats & charts', tab: 'dashboard', icon: 'dashboard',
    kw: 'dashboard home overview stats revenue orders customers pending' },
  { label: 'Orders Manager', desc: 'View & manage all orders', tab: 'orders', icon: 'orders',
    kw: 'orders order tracking status shipping delivery payment manage' },
  { label: 'Products Manager', desc: 'Add & edit products', tab: 'products', icon: 'products',
    kw: 'products product items inventory price stock add edit manage' },
  { label: 'Categories Manager', desc: 'Organize product categories', tab: 'categories', icon: 'categories',
    kw: 'categories category organize group manage' },
  { label: 'Blog Manager', desc: 'Create & edit blog posts', tab: 'blog', icon: 'blog',
    kw: 'blog blogs posts articles content writing publish manage' },
  ...SETTINGS_SECTIONS.flatMap(sec =>
    sec.items.map(item => ({
      label: item.label,
      desc: sec.label + ' → Settings',
      tab: 'settings',
      group: item.group,
      icon: 'settings',
      kw: `${item.label} ${item.group} ${sec.label} settings ${SETTINGS_KEYWORDS[item.group] || ''}`.toLowerCase(),
    }))
  ),
];

/* ─── mini components ───────────────────────────────────────── */
function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{
      background: 'white', borderRadius: 14, padding: '20px 22px',
      border: '1px solid #E8ECEF', display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 12,
        background: color + '18', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11.5, color: '#8A9099', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#0F1923', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 11.5, color: '#9EA9B5', marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function LineChart({ data }) {
  if (!data || data.length < 2) return <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13 }}>No data yet</div>;
  const W = 500, H = 130, px = 8, py = 12;
  const max = Math.max(...data.map(d => d.count), 1);
  const pts = data.map((d, i) => [
    px + (i / (data.length - 1)) * (W - px * 2),
    H - py - (d.count / max) * (H - py * 2),
  ]);
  const line = pts.map(p => p.join(',')).join(' ');
  const area = `M${pts[0].join(',')} ${pts.slice(1).map(p => 'L' + p.join(',')).join(' ')} L${pts[pts.length - 1][0]},${H - py} L${pts[0][0]},${H - py} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 140, display: 'block' }}>
      <defs>
        <linearGradient id="lgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A7A3A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#5A7A3A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lgrad)" />
      <polyline points={line} fill="none" stroke="#5A7A3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="#5A7A3A" stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return <div style={{ fontSize: 13, color: '#aaa', padding: '20px 0' }}>No orders yet</div>;
  const R = 52, cx = 68, cy = 68;
  let angle = -90;
  const slices = data.filter(d => d.count > 0).map(d => {
    const sweep = (d.count / total) * 360;
    const s = angle; angle += sweep;
    return { ...d, s, e: angle };
  });
  function pt(a) {
    const r = a * Math.PI / 180;
    return [cx + R * Math.cos(r), cy + R * Math.sin(r)];
  }
  function arc({ s, e, color }) {
    const [sx, sy] = pt(s);
    const [ex, ey] = pt(e - 0.3);
    const large = e - s > 180 ? 1 : 0;
    return <path key={color + s} d={`M${sx},${sy} A${R},${R} 0 ${large} 1 ${ex},${ey}`} fill="none" stroke={color} strokeWidth="22" strokeLinecap="butt" />;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <svg width={136} height={136} viewBox={`0 0 136 136`} style={{ flexShrink: 0 }}>
        {slices.map(arc)}
        <circle cx={cx} cy={cy} r={34} fill="white" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="800" fill="#0F1923">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#9EA9B5" fontWeight="600">ORDERS</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: '#555', flex: 1 }}>{d.label}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0F1923' }}>
              {total > 0 ? `${Math.round(d.count / total * 100)}%` : '0%'}
            </span>
            <span style={{ fontSize: 11.5, color: '#aaa', width: 22, textAlign: 'right' }}>({d.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Dashboard Home ─────────────────────────────────────────── */
function DashboardHome({ onSwitchTab }) {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, pending: 0, customers: 0, products: 0 });
  const [byStatus, setByStatus] = useState([]);
  const [overTime, setOverTime] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminClient.get('/orders'), adminClient.get('/products')])
      .then(([or, pr]) => {
        const orders = or.data.orders || [];
        const products = pr.data.products || [];
        const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
        const pending = orders.filter(o => ['placed', 'processing'].includes(o.status)).length;
        const customers = new Set(orders.map(o => o.guest_id).filter(Boolean)).size;

        const sm = ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'].map(st => ({
          label: st.charAt(0).toUpperCase() + st.slice(1),
          count: orders.filter(o => o.status === st).length,
          color: STATUS_COLORS[st],
        }));

        const now = new Date();
        const days = Array.from({ length: 14 }, (_, i) => {
          const d = new Date(now); d.setDate(d.getDate() - (13 - i));
          return { date: d.toISOString().slice(0, 10), count: 0 };
        });
        orders.forEach(o => {
          if (o.created_at) {
            const day = (o.created_at || '').slice(0, 10);
            const f = days.find(d => d.date === day);
            if (f) f.count++;
          }
        });

        setStats({ orders: orders.length, revenue, pending, customers, products: products.length });
        setByStatus(sm);
        setOverTime(days);
        setRecent(orders.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}><div className="spinner" /></div>;

  const pkr = n => `PKR ${(n || 0).toLocaleString()}`;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F1923', margin: 0, lineHeight: 1.2 }}>Welcome back, Admin 👋</h1>
        <p style={{ fontSize: 13.5, color: '#8A9099', marginTop: 4 }}>Here's what's happening with your store today.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Orders" value={stats.orders} icon="🛍️" color="#5A7A3A" />
        <StatCard label="Total Revenue" value={pkr(stats.revenue)} icon="💰" color="#C4972A" />
        <StatCard label="Total Customers" value={stats.customers} icon="👥" color="#6B9BD2" />
        <StatCard label="Pending Orders" value={stats.pending} icon="⏳" color="#E74C3C" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 24 }}>
        <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', border: '1px solid #E8ECEF', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1923' }}>Order Overview</div>
            <div style={{ fontSize: 12, color: '#9EA9B5' }}>Orders placed — last 14 days</div>
          </div>
          <LineChart data={overTime} />
        </div>
        <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', border: '1px solid #E8ECEF', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1923' }}>Order Status</div>
            <div style={{ fontSize: 12, color: '#9EA9B5' }}>Distribution by status</div>
          </div>
          <DonutChart data={byStatus} />
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', border: '1px solid #E8ECEF', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1923' }}>Recent Orders</div>
          <button
            onClick={() => onSwitchTab('orders')}
            style={{ fontSize: 12.5, fontWeight: 700, color: '#5A7A3A', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            View All Orders <Icon d={IC.arrow} size={14} />
          </button>
        </div>
        {recent.length === 0 ? (
          <p style={{ color: '#aaa', fontSize: 13.5, textAlign: 'center', padding: '20px 0' }}>No orders yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0F2F4' }}>
                  {['Order ID', 'Customer', 'Date', 'Amount', 'Payment', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0 14px 12px', textAlign: 'left', fontSize: 11.5, fontWeight: 700, color: '#8A9099', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F8F9FA' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontWeight: 700, color: '#5A7A3A', fontFamily: 'monospace', fontSize: 12 }}>
                        #{(o.id || '').slice(-7).toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#333', fontWeight: 500 }}>{o.shipping_name || '—'}</td>
                    <td style={{ padding: '12px 14px', color: '#9EA9B5', whiteSpace: 'nowrap' }}>
                      {o.created_at ? new Date(o.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F1923' }}>{pkr(o.total)}</td>
                    <td style={{ padding: '12px 14px', color: '#666' }}>{o.payment_method || '—'}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                        background: (STATUS_COLORS[o.status] || '#888') + '1A',
                        color: STATUS_COLORS[o.status] || '#888',
                        textTransform: 'capitalize',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[o.status] || '#888' }} />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Website Settings view ────────────────────────────────── */
function WebsiteSettings({ onSwitchTab, activeGroup, setActiveGroup }) {
  const [open, setOpen] = useState({ brand: true, home: true, pages: false, general: false });

  function navHandler(g) {
    if (g === 'products') { onSwitchTab('products'); }
    else { setActiveGroup(g); }
  }

  if (activeGroup) {
    return (
      <div>
        <button
          onClick={() => setActiveGroup(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, color: '#5A7A3A',
            background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0,
          }}
        >
          <Icon d={IC.back} size={16} /> Back to All Settings
        </button>
        <SettingsPanel group={activeGroup} onNavigate={navHandler} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F1923', margin: 0, marginBottom: 6 }}>Website Settings</h2>
        <p style={{ fontSize: 13.5, color: '#8A9099', margin: 0 }}>
          Edit every section of your website — click any item to open its settings.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
        {SETTINGS_SECTIONS.map(sec => (
          <div key={sec.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #E8ECEF', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <button
              onClick={() => setOpen(o => ({ ...o, [sec.id]: !o[sec.id] }))}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 9, background: '#F0F4EC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                }}>{sec.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: '#0F1923' }}>{sec.label}</span>
                <span style={{ fontSize: 11.5, color: '#9EA9B5', background: '#F5F5F5', padding: '2px 8px', borderRadius: 20 }}>
                  {sec.items.length} {sec.items.length === 1 ? 'section' : 'sections'}
                </span>
              </div>
              <span style={{
                fontSize: 11, color: '#9EA9B5',
                transform: open[sec.id] ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}>▾</span>
            </button>

            {open[sec.id] && (
              <div style={{ borderTop: '1px solid #F0F2F4' }}>
                {sec.items.map((item, idx) => (
                  <button
                    key={item.group}
                    onClick={() => setActiveGroup(item.group)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '11px 20px 11px 68px',
                      borderTop: idx > 0 ? '1px solid #F8F9FA' : 'none',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', fontSize: 13.5, color: '#333',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F8FAF5'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                  >
                    <span>{item.label}</span>
                    <Icon d={IC.arrow} size={15} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar nav item ───────────────────────────────────────── */
function NavBtn({ id, label, icon, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11,
        width: '100%', padding: '10px 14px', borderRadius: 9, border: 'none',
        background: active ? 'rgba(255,255,255,0.13)' : hov ? 'rgba(255,255,255,0.06)' : 'transparent',
        color: active ? 'white' : hov ? 'white' : '#A8B89A',
        fontSize: 13.5, fontWeight: active ? 700 : 500,
        cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
        position: 'relative',
      }}
    >
      <Icon d={IC[icon] || IC.dashboard} size={17} />
      {label}
      {active && (
        <div style={{
          marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
          background: '#8BC34A', boxShadow: '0 0 6px #8BC34A',
        }} />
      )}
    </button>
  );
}

/* ─── Main AdminDashboard ────────────────────────────────────── */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'products', label: 'Products', icon: 'products' },
  { id: 'categories', label: 'Categories', icon: 'categories' },
  { id: 'blog', label: 'Blog', icon: 'blog' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [settingsGroup, setSettingsGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [checking, setChecking] = useState(true);
  const [liveData, setLiveData] = useState({ products: [], categories: [], blogs: [], orders: [] });
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [lastSeenTime, setLastSeenTime] = useState(() =>
    localStorage.getItem('haircare_notif_seen') || new Date().toISOString()
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('haircare_admin_token');
    if (!token) { navigate('/admin'); return; }
    adminClient.get('/settings')
      .then(() => setChecking(false))
      .catch(() => { localStorage.removeItem('haircare_admin_token'); navigate('/admin'); });
  }, [navigate]);

  /* Fetch live data for search once auth passes */
  useEffect(() => {
    if (checking) return;
    Promise.all([
      adminClient.get('/products').catch(() => ({ data: { products: [] } })),
      adminClient.get('/categories').catch(() => ({ data: { categories: [] } })),
      adminClient.get('/orders').catch(() => ({ data: { orders: [] } })),
    ]).then(([pr, cat, or]) => {
      setLiveData(prev => ({
        ...prev,
        products: pr.data.products || pr.data || [],
        categories: cat.data.categories || cat.data || [],
        orders: or.data.orders || or.data || [],
      }));
    });
    fetch('/api/blogs').then(r => r.json()).then(d => {
      const blogs = d?.blogs || (Array.isArray(d) ? d : []);
      setLiveData(prev => ({ ...prev, blogs }));
    }).catch(() => {});
  }, [checking]);

  /* Poll for new order notifications every 30s */
  useEffect(() => {
    if (checking) return;
    function checkOrders() {
      adminClient.get('/orders').then(res => {
        const orders = res.data.orders || res.data || [];
        const seen = new Date(lastSeenTime);
        const newOnes = orders.filter(o => o.created_at && new Date(o.created_at) > seen)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNotifications(newOnes.map(o => ({
          id: o._id || o.id,
          name: o.shipping_name || 'Customer',
          total: o.total || 0,
          status: o.status || 'placed',
          time: o.created_at,
          items: (o.items || []).length,
        })));
        // Also refresh liveData orders for search
        setLiveData(prev => ({ ...prev, orders }));
      }).catch(() => {});
    }
    checkOrders();
    const iv = setInterval(checkOrders, 30000);
    return () => clearInterval(iv);
  }, [checking, lastSeenTime]);

  function markAllRead() {
    const now = new Date().toISOString();
    setLastSeenTime(now);
    localStorage.setItem('haircare_notif_seen', now);
    setNotifications([]);
    setShowNotifs(false);
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function handleLogout() {
    localStorage.removeItem('haircare_admin_token');
    navigate('/admin');
  }

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F8FA' }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6', fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside style={{
        width: 228, flexShrink: 0, background: '#1A2810',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
        scrollbarWidth: 'none',
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/images/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'white', letterSpacing: '-0.01em' }}>Natura Silk</div>
              <div style={{ fontSize: 10.5, color: '#7A9060', marginTop: 1 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {NAV.map(item => (
            <NavBtn
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={tab === item.id}
              onClick={() => { setTab(item.id); setSettingsGroup(null); setSearchQuery(''); }}
            />
          ))}
        </nav>

        {/* Product image banner */}
        <div style={{ padding: '0 10px 12px' }}>
          <div style={{ borderRadius: 11, overflow: 'hidden', position: 'relative' }}>
            <img
              src="/images/combo-hero.jpg"
              alt=""
              style={{ width: '100%', height: 108, objectFit: 'cover', opacity: 0.55, display: 'block' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,5,0.85) 0%, rgba(10,20,5,0.2) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 12px' }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: 'white' }}>Natura Silk</div>
              <div style={{ fontSize: 10, color: '#A8B89A' }}>Natural Care, Beautiful Hair</div>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '8px 0', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.18)', color: '#A8B89A', fontSize: 12.5,
              fontWeight: 600, textDecoration: 'none', marginBottom: 7,
              transition: 'border-color 0.15s, color 0.15s',
            }}
          >
            <Icon d={IC.preview} size={13} /> Preview Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '8px 0', borderRadius: 8, border: 'none',
              background: 'rgba(255,255,255,0.06)', color: '#A8B89A', fontSize: 12.5,
              fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s',
            }}
          >
            <Icon d={IC.logout} size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Right side ─────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          height: 62, background: 'white', borderBottom: '1px solid #E8ECEF',
          display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
          position: 'sticky', top: 0, zIndex: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '0 0 300px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', background: '#F5F6F8', borderRadius: 9,
              padding: '9px 14px', gap: 8,
              border: searchFocused && searchQuery ? '1px solid #5A7A3A' : '1px solid transparent',
              transition: 'border-color 0.15s',
            }}>
              <Icon d={IC.search} size={14} />
              <input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyDown={e => { if (e.key === 'Escape') { setSearchQuery(''); e.target.blur(); } }}
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#333', flex: 1, fontFamily: 'inherit' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 14, color: '#999', lineHeight: 1 }}
                >✕</button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (() => {
              const q = searchQuery.trim().toLowerCase();

              /* ── live data results ── */
              const productHits = (liveData.products || []).filter(p =>
                (p.name || '').toLowerCase().includes(q) ||
                (p.category || '').toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q)
              ).slice(0, 4).map(p => ({
                label: p.name, desc: `PKR ${(p.price || 0).toLocaleString()} — Product`,
                tab: 'products', icon: 'products', type: 'product',
              }));

              const categoryHits = (liveData.categories || []).filter(c =>
                (c.name || '').toLowerCase().includes(q)
              ).slice(0, 3).map(c => ({
                label: c.name, desc: 'Category', tab: 'categories', icon: 'categories', type: 'category',
              }));

              const blogHits = (liveData.blogs || []).filter(b =>
                (b.title || '').toLowerCase().includes(q) ||
                (b.excerpt || b.summary || '').toLowerCase().includes(q)
              ).slice(0, 3).map(b => ({
                label: b.title, desc: 'Blog Post', tab: 'blog', icon: 'blog', type: 'blog',
              }));

              const orderHits = (liveData.orders || []).filter(o =>
                (o.shipping_name || '').toLowerCase().includes(q) ||
                (o._id || o.id || '').toLowerCase().includes(q) ||
                (o.status || '').toLowerCase().includes(q)
              ).slice(0, 3).map(o => ({
                label: o.shipping_name || `Order #${(o._id || o.id || '').slice(-7).toUpperCase()}`,
                desc: `${(o.status || '').charAt(0).toUpperCase() + (o.status || '').slice(1)} — PKR ${(o.total || 0).toLocaleString()}`,
                tab: 'orders', icon: 'orders', type: 'order',
              }));

              /* ── static items (nav + settings) ── */
              const staticHits = SEARCH_ITEMS.filter(item =>
                item.label.toLowerCase().includes(q) ||
                item.desc.toLowerCase().includes(q) ||
                item.kw.includes(q)
              ).slice(0, 5);

              const allResults = [...productHits, ...categoryHits, ...blogHits, ...orderHits, ...staticHits].slice(0, 10);

              /* ── type badge colors ── */
              const TYPE_BADGE = {
                product:  { bg: '#EEF6E8', color: '#3D6B1A', text: 'Product' },
                category: { bg: '#FFF4E5', color: '#B8860B', text: 'Category' },
                blog:     { bg: '#E8F0FE', color: '#1A56DB', text: 'Blog' },
                order:    { bg: '#FDE8E8', color: '#C81E1E', text: 'Order' },
              };

              if (allResults.length === 0) return (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6,
                  background: 'white', borderRadius: 12, border: '1px solid #E8ECEF',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)', padding: '16px 20px',
                  zIndex: 100, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 13, color: '#999' }}>No results for "{searchQuery}"</div>
                </div>
              );

              return (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, marginTop: 6,
                  background: 'white', borderRadius: 12, border: '1px solid #E8ECEF',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 100,
                  overflow: 'hidden', maxHeight: 420, overflowY: 'auto',
                  minWidth: 400,
                }}>
                  <div style={{ padding: '10px 14px 6px', fontSize: 10.5, fontWeight: 700, color: '#9EA9B5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Results ({allResults.length})
                  </div>
                  {allResults.map((item, idx) => {
                    const badge = TYPE_BADGE[item.type];
                    return (
                      <button
                        key={idx}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                          setTab(item.tab);
                          setSettingsGroup(item.group || null);
                          setSearchQuery('');
                          setSearchFocused(false);
                        }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 14px', background: 'none', border: 'none',
                          borderTop: idx > 0 ? '1px solid #F5F6F8' : 'none',
                          cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F8FAF5'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                      >
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: badge ? badge.bg : (item.tab === 'settings' ? '#F0F4EC' : '#EEF2FF'),
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          color: badge ? badge.color : '#555',
                        }}>
                          <Icon d={IC[item.icon]} size={15} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1923', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: 11, color: '#9EA9B5', marginTop: 1 }}>{item.desc}</div>
                        </div>
                        {badge && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                            background: badge.bg, color: badge.color, whiteSpace: 'nowrap',
                          }}>{badge.text}</span>
                        )}
                        <Icon d={IC.arrow} size={13} />
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setShowNotifs(s => !s); setSearchFocused(false); }}
              style={{
                position: 'relative', cursor: 'pointer', padding: '6px',
                background: 'none', border: 'none', color: '#555',
              }}
            >
              <Icon d={IC.bell} size={20} />
              {notifications.length > 0 && (
                <div style={{
                  position: 'absolute', top: 0, right: 0, minWidth: 16, height: 16,
                  background: '#E74C3C', borderRadius: '50%', fontSize: 9, fontWeight: 800,
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white', padding: '0 3px',
                }}>{notifications.length > 9 ? '9+' : notifications.length}</div>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifs && (
              <div style={{
                position: 'absolute', top: '100%', right: -40, marginTop: 10,
                width: 370, background: 'white', borderRadius: 14,
                border: '1px solid #E8ECEF', boxShadow: '0 12px 48px rgba(0,0,0,0.14)',
                zIndex: 100, overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 18px', borderBottom: '1px solid #F0F2F4',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0F1923' }}>Notifications</div>
                    <div style={{ fontSize: 11, color: '#9EA9B5', marginTop: 1 }}>
                      {notifications.length > 0 ? `${notifications.length} new order${notifications.length > 1 ? 's' : ''}` : 'No new orders'}
                    </div>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{
                        fontSize: 11.5, fontWeight: 700, color: '#5A7A3A',
                        background: '#F0F4EC', border: 'none', borderRadius: 6,
                        padding: '5px 10px', cursor: 'pointer',
                      }}
                    >Mark all read</button>
                  )}
                </div>

                {/* Notification List */}
                <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
                      <div style={{ fontSize: 13, color: '#999' }}>All caught up! No new orders.</div>
                    </div>
                  ) : (
                    notifications.slice(0, 8).map((n, idx) => (
                      <button
                        key={n.id}
                        onClick={() => { setTab('orders'); setShowNotifs(false); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '12px 18px', background: 'none', border: 'none',
                          borderTop: idx > 0 ? '1px solid #F8F9FA' : 'none',
                          cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FAFBF8'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: 9,
                          background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, flexShrink: 0, marginTop: 2,
                        }}>📦</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1923', lineHeight: 1.3 }}>
                            New order from <span style={{ color: '#5A7A3A' }}>{n.name}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                            PKR {(n.total).toLocaleString()}
                            {n.items > 0 && <span> · {n.items} item{n.items > 1 ? 's' : ''}</span>}
                          </div>
                          <div style={{ fontSize: 11, color: '#B0B7C0', marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 3,
                              padding: '1px 6px', borderRadius: 10, fontSize: 10, fontWeight: 700,
                              background: (STATUS_COLORS[n.status] || '#888') + '1A',
                              color: STATUS_COLORS[n.status] || '#888', textTransform: 'capitalize',
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_COLORS[n.status] || '#888' }} />
                              {n.status}
                            </span>
                            <span>{timeAgo(n.time)}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div style={{ borderTop: '1px solid #F0F2F4', padding: '10px 18px', textAlign: 'center' }}>
                    <button
                      onClick={() => { setTab('orders'); setShowNotifs(false); }}
                      style={{
                        fontSize: 12.5, fontWeight: 700, color: '#5A7A3A',
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 4, margin: '0 auto',
                      }}
                    >View All Orders <Icon d={IC.arrow} size={13} /></button>
                  </div>
                )}
              </div>
            )}
          </div>

        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minHeight: 0 }}>
          {tab === 'dashboard'  && <DashboardHome onSwitchTab={setTab} />}
          {tab === 'orders'     && <OrdersManager />}
          {tab === 'products'   && <ProductsManager />}
          {tab === 'categories' && <CategoriesManager />}
          {tab === 'blog'       && <BlogsManager />}
          {tab === 'settings'   && <WebsiteSettings onSwitchTab={setTab} activeGroup={settingsGroup} setActiveGroup={setSettingsGroup} />}
        </main>
      </div>
    </div>
  );
}
