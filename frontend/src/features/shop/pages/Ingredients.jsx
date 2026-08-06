

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetting, useSiteSettings } from '../../../shared/hooks/SiteSettingsContext.jsx';

const FALLBACK_INGREDIENTS = [
  { name: 'Aloe Vera',    img: '/images/aloe-vera.jpg',    desc: 'Hydrates & soothes',       benefit: 'Soothes the scalp, hydrates deeply and promotes healthy, calm roots.', productSlug: 'herbal-shampoo' },
  { name: 'Coconut Oil',  img: '/images/coconut-oil.jpg',  desc: 'Nourishes & strengthens',  benefit: 'Deeply nourishes, reduces protein loss and adds a natural, lasting shine.', productSlug: 'nourishing-conditioner' },
  { name: 'Argan Oil',    img: '/images/argan-oil.jpg',    desc: 'Repairs & adds shine',     benefit: 'Rich in vitamin E and fatty acids — it moisturizes and repairs damaged hair.', productSlug: 'deep-repair-hair-mask' },
  { name: 'Amla Extract', img: '/images/amla-extract.jpg', desc: 'Boosts hair growth',       benefit: 'Strengthens roots, reduces hair fall and boosts natural growth.', productSlug: 'anti-hair-fall-serum' },
  { name: 'Tea Tree Oil', img: '/images/tea-tree-oil.jpg', desc: 'Cleanses & protects',      benefit: 'Purifies the scalp, fights dandruff and promotes a healthy, clean scalp.', productSlug: 'herbal-shampoo' },
  { name: 'Shea Butter',  img: '/images/shea-butter.jpg',  desc: 'Moisturizes & softens',    benefit: 'Deeply moisturizes, softens hair and helps reduce frizz and dryness.', productSlug: 'nourishing-conditioner' },
];

export default function Ingredients() {
  const eyebrow = useSetting('ingredientsPageEyebrow', 'Powered by Nature');
  const heading = useSetting('ingredientsPageHeading', 'Our Ingredients & Their Benefits');
  const description = useSetting('ingredientsPageDescription', 'Every HairCare formula is built from pure, plant-based ingredients. Here is exactly what each one does for your hair and scalp.');
const bannerImage = useSetting('ingredientsPageBannerImage', '');
  const allSettings = useSiteSettings();
  const ingredientsList = allSettings?.ingredients?.length ? allSettings.ingredients : FALLBACK_INGREDIENTS;

  const [active, setActive] = useState(null);

  return (
    <div>
      {/* Header */}
      {/* <section style={{ background: 'var(--cream-deep)', padding: '56px 0' }}>
        <div className="container text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{ fontSize: 38, margin: '10px 0 12px' }}>{heading}</h1>
          <p style={{ maxWidth: 640, margin: '0 auto', fontSize: 15 }}>{description}</p>
        </div>
      </section> */}
      {/* Header */}
      <section
        style={{
          padding: '56px 0',
          ...(bannerImage
            ? {
                background: `linear-gradient(rgba(44,53,32,0.55), rgba(44,53,32,0.55)), url(${bannerImage}) center/cover`,
                color: 'white',
              }
            : { background: 'var(--cream-deep)' }),
        }}
      >
        <div className="container text-center">
          <span className="eyebrow" style={bannerImage ? { color: '#DCE3CC' } : undefined}>{eyebrow}</span>
          <h1 style={{ fontSize: 38, margin: '10px 0 12px', color: bannerImage ? 'white' : undefined }}>{heading}</h1>
          <p style={{ maxWidth: 640, margin: '0 auto', fontSize: 15, color: bannerImage ? '#DCE3CC' : undefined }}>{description}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }} className="ing-grid">
            {ingredientsList.map((ing) => (
              <div
                key={ing.name}
                onClick={() => setActive(ing)}
                style={{
                  background: 'var(--cream)', border: '1px solid var(--line)',
                  borderRadius: 14, overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(44,53,32,0.06)',
                  display: 'flex', flexDirection: 'column',
                  cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(44,53,32,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(44,53,32,0.06)'; }}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--cream-deep)' }}>
                  <img src={ing.img} alt={ing.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px 22px 24px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: 20, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {ing.name}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 44 }}>
            <Link to="/shop" className="btn btn-primary">Shop Products →</Link>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(44,53,32,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: 14, overflow: 'hidden',
              maxWidth: 460, width: '100%', maxHeight: '85vh',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              position: 'relative', display: 'flex', flexDirection: 'column',
            }}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 12, right: 12, width: 32, height: 32,
                borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none',
                fontSize: 18, cursor: 'pointer', zIndex: 2,
              }}
            >✕</button>

            <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--cream-deep)', flexShrink: 0 }}>
              <img src={active.img} alt={active.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="ingredient-modal-scroll" style={{ padding: '24px 26px 4px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>
                {active.name}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20 }}>
                {active.benefit || active.desc}
              </p>
            </div>

            {active.productSlug && (
              <div style={{ padding: '16px 26px 26px', flexShrink: 0 }}>
                <Link
                  to={`/product/${active.productSlug}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Shop Now →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
