

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../shared/api/client';
import ProductCard from '../../shop/components/ProductCard';
import { useSetting, useSiteSettings } from '../../../shared/hooks/SiteSettingsContext.jsx';
// import { BLOG_POSTS as ALL_POSTS, getPostImage } from '../../blog/data/blogPosts';


const INSTA_IMGS = [
  '/images/herbal-shampoo.jpg',
  '/images/nourishing-conditioner.jpg',
  '/images/hair-growth-oil.jpg',
  '/images/anti-hair-fall-serum.jpg',
  '/images/deep-repair-hair-mask.jpg',
  '/images/onion-hair-oil.jpg',
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [homeBlogs, setHomeBlogs] = useState([]);
  const allSettings = useSiteSettings();
  const heroTag = useSetting('heroTag', 'Natural Care For');
  const brandTagline = useSetting('brandTagline', 'Nourish. Grow. Glow.');
  const heroHeadline = useSetting('heroHeadline', 'Stronger, Healthier,\nBeautiful Hair');
  const heroDescription = useSetting('heroDescription', 'Discover the power of nature with our premium hair care products. Made with love, backed by science.');
  const heroCtaText = useSetting('heroCtaText', 'Shop Now');
  const heroImage = useSetting('heroImage', '/images/combo-hero.jpg');

  const promoHeadline = useSetting('promoHeadline', 'Stronger Roots,\nLonger Hair,\nBetter You.');
  const promoReasonText = useSetting('promoReasonText', '🎉 New Brand Alert! To celebrate our launch, the first 100 customers get 20% off our entire product range.');
  const promoCtaText = useSetting('promoCtaText', 'Shop Hair Oils');
  const promoDiscount = useSetting('promoDiscount', '20%');
  const promoSubtext = useSetting('promoSubtext', 'For our first 100 customers only — on every product');
  const promoImage1 = useSetting('promoImage1', '/images/hair-growth-oil.jpg');
  const promoImage2 = useSetting('promoImage2', '/images/onion-hair-oil.jpg');
  const promoImage3 = useSetting('promoImage3', '/images/anti-hair-fall-serum.jpg');

  const whyChooseEyebrow = useSetting('whyChooseEyebrow', 'Why Choose Naturasilk?');
  const whyChooseHeadline = useSetting('whyChooseHeadline', 'Nature-Powered Care\nYou Can Trust');
  const whyChooseDescription = useSetting('whyChooseDescription', 'We believe the best hair care comes from nature. Every formula is crafted with pure, plant-based ingredients safe for daily use.');
  const whyChooseImage = useSetting('whyChooseImage', '/images/nourishing-conditioner.jpg');
  const whyChooseBadgeImage = useSetting('whyChooseBadgeImage', '/images/hair-growth-oil.jpg');

  const ingredientsHeading = useSetting('ingredientsHeading', 'Powerful Ingredients, Powerful Results');
  const bestsellersHeading = useSetting('bestsellersHeading', 'Best Sellers');
  const testimonialsHeading = useSetting('testimonialsHeading', 'What Our Customers Say');

  const blogImageOverrides = allSettings?.blogPostImages;
  const whyChooseFeatures = allSettings?.whyChooseFeatures || [
    { icon: '🌱', title: 'Nature Powered', desc: 'We use only natural ingredients' },
    { icon: '🛡️', title: 'Safe & Gentle', desc: 'No harsh chemicals, no worries' },
    { icon: '✨', title: 'Effective Results', desc: 'Visible results you can feel' },
    { icon: '💚', title: 'Trusted by Many', desc: 'Loved by thousands of happy customers' },
  ];
  const ingredientsList = allSettings?.ingredients || [
    { name: 'Aloe Vera', desc: 'Hydrates & soothes', img: '/images/aloe-vera.jpg' },
    { name: 'Coconut Oil', desc: 'Nourishes & strengthens', img: '/images/coconut-oil.jpg' },
    { name: 'Argan Oil', desc: 'Repairs & adds shine', img: '/images/argan-oil.jpg' },
    { name: 'Amla Extract', desc: 'Boosts hair growth', img: '/images/amla-extract.jpg' },
    { name: 'Tea Tree Oil', desc: 'Cleanses & protects', img: '/images/tea-tree-oil.jpg' },
    { name: 'Shea Butter', desc: 'Moisturizes & softens', img: '/images/shea-butter.jpg' },
  ];
  const testimonialsList = allSettings?.testimonials || [
    { name: 'Sana Khalid', text: 'HairCare products are amazing! My hair feels so soft, healthy and looks so shiny now.', rating: 4.5, avatar: '/images/avatar-sana.jpg' },
    { name: 'Maryam Ali', text: 'I love that the products are 100% natural and actually deliver results.', rating: 4.5, avatar: '/images/avatar-maryam.jpg' },
    { name: 'Ayesha R.', text: 'The best hair oil I have ever used. Highly recommend!', rating: 5, avatar: '/images/avatar-ayesha.jpg' },
  ];
  const instagramImages = allSettings?.instagramImages?.length
    ? allSettings.instagramImages.map((i) => i.img).filter(Boolean)
    : INSTA_IMGS;
  const instagramUrlRaw = useSetting('socialInstagram', 'https://instagram.com/haircare.official');
  const instagramHandle = useSetting('instagramHandle', '@haircare.official');
  const instagramUrl = instagramUrlRaw && !/^https?:\/\//i.test(instagramUrlRaw)
    ? `https://${instagramUrlRaw}`
    : instagramUrlRaw;

  useEffect(() => {
    client.get('/products/categories').then((r) => setCategories(r.data.categories));
    client.get('/products?bestsellers=true').then((r) => setBestsellers(r.data.products));
    client.get('/blogs').then((r) => setHomeBlogs(r.data.blogs.slice(0, 3)));
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultHeroSlides = [
    {
      img: heroImage || '/images/combo-hero.jpg',
      badge: '🌿 100% Organic & Clean',
      tagline: 'Crafted For Both — Him & Her',
    },
    {
      img: '/images/hero_couple.png',
      badge: '✨ Natural Synergy',
      tagline: 'Shared Luxury For Him & Her',
    },
    {
      img: '/images/hero_woman.png',
      badge: '💧 Deep Shine & Softness',
      tagline: 'Silky Radiance & Strength For Her',
    },
    {
      img: '/images/hero_man.png',
      badge: '💪 Root Fortified Vitality',
      tagline: 'Active Density & Care For Him',
    }
  ];
  const heroSlides = allSettings?.heroSliderImages && allSettings.heroSliderImages.length > 0
    ? allSettings.heroSliderImages
    : defaultHeroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(120deg, #F7F2E8 0%, #EEE6D2 40%, #E8DFCC 100%)',
        position: 'relative', overflow: 'hidden', minHeight: 520,
      }}>
        {/* 100% Natural badge — top right */}
        <div style={{
          position: 'absolute', top: 28, right: 48, zIndex: 5,
          width: 88, height: 88, borderRadius: '50%',
          background: 'white',
          border: '2px solid var(--line)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(44,53,32,0.13)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--olive-dark)', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>100%<br />Natural</span>
        </div>

        {/* Main hero grid */}
        <div className="hero-grid" style={{
          maxWidth: 1240, margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: '380px 1fr',
          alignItems: 'center', minHeight: 520, gap: '20px',
        }}>
          {/* LEFT — text content */}
          <div className="hero-text-col" style={{ padding: '40px 0 40px', zIndex: 2 }}>
            <span style={{
              fontSize: 12.5, letterSpacing: '0.15em', textTransform: 'uppercase',
              fontWeight: 700, color: 'var(--olive-mid)',
            }}>{heroTag}</span>

            <h1 style={{
              fontSize: 46, lineHeight: 1.1, margin: '10px 0 16px',
              color: 'var(--olive-dark)', fontFamily: 'var(--font-display)', fontWeight: 500,
            }}>
              {heroHeadline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
              <span style={{ display: 'inline-block', marginLeft: 8, fontSize: 30, verticalAlign: 'middle' }}></span>
            </h1>

            <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 28, maxWidth: 340 }}>
              {heroDescription}
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 22,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
              {brandTagline}
            </div>

            <Link to="/shop" className="btn btn-primary" style={{
              fontSize: 13, letterSpacing: '0.06em', padding: '13px 36px',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              {heroCtaText.toUpperCase()} &nbsp;→
            </Link>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 28, marginTop: 40 }}>
              {[
                { svg: '🌱', label: 'Natural\nIngredients' },
                { svg: '🧴', label: 'Clean\nFormula' },
                { svg: '🤍', label: 'Cruelty-Free' },
              ].map(({ svg, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%',
                    border: '1.5px solid var(--line)',
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, margin: '0 auto 7px',
                    boxShadow: '0 1px 6px rgba(44,53,32,0.07)',
                  }}>{svg}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--olive-dark)',
                    whiteSpace: 'pre-line', lineHeight: 1.4,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Automated Animated Hero Carousel (Styled Frame & Corners, Banner Below) */}
          <div className="hero-carousel-col" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', padding: '10px 0 15px', zIndex: 3 }}>
            <div className="hero-carousel-frame" style={{
              position: 'relative',
              width: '94%',
              height: 520,
              overflow: 'hidden',
              borderRadius: 36,
              background: 'linear-gradient(135deg, var(--olive-dark) 0%, #303A22 100%)',
              border: '2px solid rgba(201, 162, 75, 0.5)',
              boxShadow: '0 10px 25px -3px rgba(30, 38, 20, 0.45), 0 35px 75px -12px rgba(22, 29, 14, 0.6), 0 0 35px rgba(201, 162, 75, 0.35), inset 0 2px 5px rgba(255, 255, 255, 0.25), inset 0 -6px 15px rgba(0, 0, 0, 0.55)',
              padding: '7px',
              flexShrink: 0
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: 30,
                overflow: 'hidden',
                background: '#FAF6EE'
              }}>
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: currentSlide === index ? 2 : 1,
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'scale(1)' : 'scale(1.04)',
                      transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s ease-out',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={slide.img}
                      alt={slide.tagline}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Green Banner Line - Positioned Directly BELOW the Image Frame */}
            <div className="hero-banner-box" style={{
              width: '94%',
              height: 'auto',
              background: 'linear-gradient(135deg, var(--olive-dark) 0%, #303A22 100%)',
              border: '1px solid rgba(201, 162, 75, 0.5)',
              padding: '12px 24px',
              borderRadius: 30,
              color: 'white',
              boxShadow: '0 8px 24px rgba(44, 53, 32, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 12,
              margin: '16px 0 10px',
              zIndex: 5,
              transition: 'all 0.5s ease',
              flexShrink: 0
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#FAF6EE', letterSpacing: '0.04em' }}>
                {heroSlides[currentSlide]?.badge || '🌿 100% Organic & Clean'}
              </span>
              <span style={{ color: '#C9A24B', fontWeight: 800 }}>•</span>
              <span style={{ fontSize: 12.5, color: '#C9A24B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {heroSlides[currentSlide]?.tagline || 'CRAFTED FOR BOTH — HIM & HER'}
              </span>
            </div>
          </div>
        </div>

        {/* Trust bar — olive/sage green strip at bottom of hero */}
        <div style={{
          background: 'rgba(150,165,120,0.22)',
          borderTop: '1px solid rgba(100,120,70,0.15)',
        }}>
          <div style={{
            maxWidth: 1240, margin: '0 auto', padding: '14px 48px',
            display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 12,
          }}>
            {[
              { icon: '🚚', title: useSetting('trustFreeShippingText', 'Free Shipping'), sub: useSetting('trustFreeShippingSub', 'On Orders Over $30') },
              { icon: '↩️', title: useSetting('trustEasyReturnsText', 'Easy Returns'), sub: useSetting('trustEasyReturnsSub', '30 Days Return Policy') },
              { icon: '🔒', title: useSetting('trustSecurePaymentText', 'Secure Payment'), sub: useSetting('trustSecurePaymentSub', 'Safe & Encrypted Checkout') },
              { icon: '💬', title: useSetting('trustSupportText', '24/7 Support'), sub: useSetting('trustSupportSub', "We're Here to Help") },
            ].map(({ icon, title, sub }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--olive-dark)' }}>{title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR — moved here from the global footer so it only shows on Home, right below the hero ── */}
      <div style={{ background: 'var(--cream)', padding: '40px 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--olive-dark)',
            borderRadius: 18,
            boxShadow: '0 20px 40px rgba(44,53,32,0.22)',
            padding: '36px 0',
          }}>
            <div className="stats-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
              padding: '0 32px',
            }}>
              {[
                { icon: '👥', value: '6.5K+', label: 'Happy Customers' },
                { icon: '🌿', value: '5+', label: 'Natural Products' },
                { icon: '★', value: '4.5★', label: 'Customer Rating' },
                { icon: '✅', value: '98%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  textAlign: 'center',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', margin: '0 auto 12px',
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{stat.icon}</div>
                  <div style={{ color: 'white', fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#A7AE94', fontSize: 13, marginBottom: 10 }}>{stat.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                    <span style={{ fontSize: 12, color: 'var(--gold)' }}>🌿</span>
                    <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ─────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 44 }}>
            SHOP BY CATEGORY
          </h2>
          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?category=${c.slug}`} style={{ textAlign: 'center', textDecoration: 'none' }}> */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?category=${c.slug}`} style={{ width: 110, textAlign: 'center', textDecoration: 'none' }}>
                <div style={{
                  width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
                  margin: '0 auto 14px', border: '2px solid var(--line)',
                  background: 'var(--cream-deep)',
                  boxShadow: '0 2px 10px rgba(44,53,32,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(44,53,32,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(44,53,32,0.08)'; }}
                >
                  <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--olive-mid)', fontWeight: 500 }}>Explore Now →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────────────── */}
      <section style={{ background: 'var(--cream-deep)', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 30,
          }}>
            {bestsellersHeading}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, gap: 10 }}>
            <Link to="/shop" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--olive)', marginRight: 6 }}>View All →</Link>
            {['‹', '›'].map((arrow, i) => (
              <button key={arrow} onClick={() => {
                const el = document.getElementById('bs-scroll');
                el.scrollBy({ left: i === 0 ? -300 : 300, behavior: 'smooth' });
              }} style={{
                width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--line)',
                background: 'var(--white)', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--olive-dark)', lineHeight: 1,
              }} aria-label={i === 0 ? 'Previous' : 'Next'}>{arrow}</button>
            ))}
          </div>
          <div id="bs-scroll" style={{
            display: 'flex', gap: 20, overflowX: 'auto',
            scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: 4,
          }}>
            {bestsellers.map((p) => (
              <div key={p.id} style={{ flex: '0 0 calc(20% - 16px)', minWidth: 210 }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ─────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(120deg, #F0EAD8 0%, #E8DFCC 50%, #EAE0C8 100%)',
        padding: '56px 0', overflow: 'hidden',
      }}>
        <div className="container promo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 40 }}>
          <div>
            <div style={{
              display: 'inline-block', background: '#FF0000', color: 'white',
              fontSize: 12.5, fontWeight: 700, padding: '7px 16px', borderRadius: 20,
              marginBottom: 16, maxWidth: 420, lineHeight: 1.5,
            }}>
              {promoReasonText}
            </div>
            <h2 style={{
              fontSize: 32, fontFamily: 'var(--font-display)', fontWeight: 500,
              color: 'var(--olive-dark)', lineHeight: 1.2, marginBottom: 24,
            }}>
              {promoHeadline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <Link to="/shop?category=hair-oil" className="btn btn-primary" style={{ fontSize: 13, letterSpacing: '0.05em', padding: '13px 30px' }}>
              {promoCtaText.toUpperCase()} →
            </Link>
          </div>
          <div className="promo-images" style={{ display: 'flex', gap: 14, alignItems: 'flex-end', justifyContent: 'center' }}>
            {[
              { src: promoImage1, h: 175 },
              { src: promoImage2, h: 225 },
              { src: promoImage3, h: 175 },
            ].map((item, i) => (
              <div key={i} style={{
                width: 120, height: item.h, borderRadius: 8, overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(44,53,32,0.18)', flexShrink: 0,
              }}>
                <img src={item.src} alt="Hair oil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--olive-dark)', marginBottom: 2 }}>Up to</p>
            <div style={{ fontSize: 58, fontWeight: 800, color: 'var(--olive-dark)', lineHeight: 1, fontFamily: 'var(--font-body)' }}>
              {promoDiscount}
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--olive-dark)', lineHeight: 1, fontFamily: 'var(--font-body)' }}>
              OFF
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 8 }}>{promoSubtext}</p>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ───────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container why-choose-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Left — woman + argan oil image composite */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5',
              background: 'linear-gradient(160deg,#f0e8d8,#ddd0b8)',
            }}>
              <img
                src={whyChooseImage}
                alt="Natural hair care"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Bottom-left badge */}
            <div style={{
              position: 'absolute', bottom: 24, left: -16,
              background: 'var(--white)', border: '2px solid var(--line)',
              borderRadius: '50%', width: 96, height: 96,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(44,53,32,0.15)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20 }}>🌿</div>
              <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--olive)', lineHeight: 1.4, marginTop: 2 }}>
                Nature<br />Powered<br />Care
              </div>
            </div>
            {/* Right product image */}
            <div style={{
              position: 'absolute', bottom: 24, right: -20,
              width: 110, height: 160, borderRadius: 12,
              overflow: 'hidden', boxShadow: '0 8px 28px rgba(44,53,32,0.18)',
              border: '2px solid white',
            }}>
              <img
                src={whyChooseBadgeImage}
                alt="Hair oil"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span className="eyebrow">{whyChooseEyebrow}</span>
            <h2 style={{ fontSize: 32, margin: '10px 0 12px', lineHeight: 1.2 }}>
              {whyChooseHeadline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 18,
            }}>
              <span style={{ width: 20, height: 1, background: 'var(--gold)' }} />
              {brandTagline}
            </div>
            <p style={{ fontSize: 14.5, marginBottom: 32, maxWidth: 380, lineHeight: 1.7 }}>
              {whyChooseDescription}
            </p>
            <div className="why-choose-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
              {whyChooseFeatures.map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'var(--cream-deep)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <strong style={{ fontSize: 14, color: 'var(--olive-dark)', display: 'block', marginBottom: 2 }}>{title}</strong>
                    <p style={{ fontSize: 12.5, lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn btn-outline" style={{ fontSize: 13, letterSpacing: '0.04em' }}>
              LEARN MORE ABOUT US →
            </Link>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ──────────────────────────────────────── */}
      <section style={{ background: 'var(--cream-deep)', padding: '56px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 44 }}>
            <h2 className="text-center" style={{
              fontSize: 22, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: 'var(--font-body)', margin: 0,
            }}>
              {ingredientsHeading}
            </h2>
            {ingredientsList.length > 6 && (
              <div style={{ position: 'absolute', right: 0, display: 'flex', gap: 10 }}>
                {['‹', '›'].map((arrow, i) => (
                  <button key={arrow} onClick={() => {
                    const el = document.getElementById('ing-scroll');
                    const card = el.querySelector('[data-ing-card]');
                    const step = card ? (card.offsetWidth + 16) * 6 : el.clientWidth;
                    el.scrollBy({ left: i === 0 ? -step : step, behavior: 'smooth' });
                  }} style={{
                    width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--line)',
                    background: 'var(--white)', cursor: 'pointer', fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--olive-dark)', lineHeight: 1,
                  }} aria-label={i === 0 ? 'Previous' : 'Next'}>{arrow}</button>
                ))}
              </div>
            )}
          </div>
          <div id="ing-scroll" style={{
            display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: 4,
          }}>
            {ingredientsList.map((ing) => (
              <div key={ing.name} data-ing-card style={{
                textAlign: 'center', scrollSnapAlign: 'start',
                flex: '0 0 calc((100% - 16px * 5) / 6)', minWidth: 110,
              }}>
                <div style={{
                  width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
                  margin: '0 auto 14px', background: 'var(--white)',
                  border: '2px solid var(--line)',
                  boxShadow: '0 3px 12px rgba(44,53,32,0.09)',
                }}>
                  <img src={ing.img} alt={ing.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <strong style={{ fontSize: 14, color: 'var(--ink)', display: 'block', marginBottom: 4 }}>{ing.name}</strong>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 className="text-center" style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 40,
          }}>
            {testimonialsHeading}
          </h2>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonialsList.map((t) => (
              <div key={t.name} style={{
                background: 'var(--cream)', border: '1px solid var(--line)',
                borderRadius: 12, padding: '24px 22px',
                boxShadow: '0 2px 8px rgba(44,53,32,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', overflow: 'hidden',
                    background: 'var(--cream-deep)', flexShrink: 0, border: '2px solid var(--line)',
                  }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <strong style={{ fontSize: 15, color: 'var(--ink)' }}>{t.name}</strong>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--ink-soft)', fontStyle: 'italic', marginBottom: 14 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ fontSize: 15, color: s <= t.rating ? 'var(--gold)' : '#E3DCC8' }}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: i === 0 ? 22 : 8, height: 8, borderRadius: 4,
                background: i === 0 ? 'var(--olive)' : 'var(--line)',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM OUR BLOG ─────────────────────────────────────── */}
      <section style={{ background: 'var(--cream-deep)', padding: '56px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
            <h2 style={{
              fontSize: 22, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: 'var(--font-body)', margin: 0,
            }}>
              From Our Blog
            </h2>
            <Link to="/blog" style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)', textDecoration: 'none' }}>View All Articles →</Link>
          </div>

          <div className="home-blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
            {homeBlogs.map((post) => (
              <Link key={post.id || post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{
                  background: 'var(--white)', borderRadius: 10,
                  overflow: 'hidden', border: '1px solid var(--line)',
                  boxShadow: '0 2px 8px rgba(44,53,32,0.06)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,53,32,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(44,53,32,0.06)'; }}
                >
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--cream-deep)', flexShrink: 0 }}>
                    <img src={post.image || '/images/default-blog.jpg'} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                      color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6,
                    }}>{post.tag}</span>
                    <h3 style={{
                      fontSize: 15.5, fontFamily: 'var(--font-display)', fontWeight: 500,
                      color: 'var(--ink)', margin: '0 0 16px', lineHeight: 1.4, flex: 1,
                    }}>{post.title}</h3>
                    <span style={{ fontSize: 13, color: 'var(--olive-mid)', fontWeight: 600, marginTop: 'auto' }}>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOLLOW US ON INSTAGRAM ────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, var(--white) 0%, var(--cream) 100%)', padding: '72px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <span style={{
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>Social</span>
            <h2 style={{
              fontSize: 30, fontWeight: 500, fontFamily: 'var(--font-display)',
              color: 'var(--olive-dark)', margin: '8px 0 6px',
            }}>
              Follow Us on Instagram
            </h2>
            <a href={instagramUrl} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>{instagramHandle}</a>
          </div>

          <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {instagramImages.map((src, i) => (
              <a key={i} href={instagramUrl} target="_blank" rel="noreferrer" style={{
                display: 'block', aspectRatio: '1', overflow: 'hidden', borderRadius: 10, position: 'relative',
                boxShadow: '0 4px 16px rgba(44,53,32,0.10)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.insta-overlay').style.opacity = '1';
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.insta-overlay').style.opacity = '0';
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                }}
              >
                <img src={src} alt={`Instagram ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
                <div className="insta-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(63,74,46,0.05) 0%, rgba(44,53,32,0.65) 100%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                  opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <span style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </span>
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>View Post</span>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: 13, letterSpacing: '0.06em', padding: '13px 34px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              FOLLOW US ON INSTAGRAM
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
