import { useSetting, useSiteSettings } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function About() {
  const heroTag = useSetting('aboutHeroTag', 'Our Mission');
  const heroHeadline = useSetting('aboutHeroHeadline', 'Nurturing Beauty Naturally, Since 2018');
  const heroImage = useSetting('aboutHeroImage', '/images/combo-hero.jpg');

  const philosophyHeading = useSetting('aboutPhilosophyHeading', 'Our Philosophy');
  const allSettings = useSiteSettings();
  const philosophyItems = allSettings?.aboutPhilosophyItems || [
    { icon: '🌱', title: 'Nature Powered', desc: 'Every formula starts with real botanical ingredients, sourced responsibly.' },
    { icon: '🛡️', title: 'Safe & Gentle', desc: 'No sulfates, no parabens, no harsh chemicals — just results you can trust.' },
  ];

  const storyEyebrow = useSetting('aboutStoryEyebrow', 'Our Story');
  const storyHeading = useSetting('aboutStoryHeading', 'Born From a Simple Belief');
  const storyText = useSetting('aboutStoryText', 'HairCare started with a simple belief: hair care should be effective without compromising on what goes into the bottle. We spent years researching traditional botanical remedies alongside modern dermatological science to create products that actually work — for every hair type, every day.');
  const storyImage = useSetting('aboutStoryImage', '/images/hair-growth-oil.jpg');

  const sourcingEyebrow = useSetting('aboutSourcingEyebrow', 'Our Sourcing');
  const sourcingHeading = useSetting('aboutSourcingHeading', 'Ingredients We Can Stand Behind');
  const sourcingText = useSetting('aboutSourcingText', 'We partner directly with growers who share our values, choosing cold-pressed oils and sustainably harvested botanicals over synthetic shortcuts. Every ingredient is chosen because it earns its place in the formula.');
  const sourcingImage = useSetting('aboutSourcingImage', '/images/onion-hair-oil.jpg');

  const commitmentEyebrow = useSetting('aboutCommitmentEyebrow', 'Our Commitment');
  const commitmentHeading = useSetting('aboutCommitmentHeading', 'Cruelty-Free, Always');
  const commitmentText = useSetting('aboutCommitmentText', "None of our products are tested on animals, and we're committed to transparent, honest labeling on everything we make.");

  return (
    <div>
      <div style={{
        background: `linear-gradient(rgba(44,53,32,0.55), rgba(44,53,32,0.55)), url(${heroImage}) center/cover`,
        padding: '90px 0', color: 'white',
      }}>
        <div className="container">
          <span className="eyebrow" style={{ color: '#DCE3CC' }}>{heroTag}</span>
          <h1 style={{ color: 'white', fontSize: 38, marginTop: 8 }}>{heroHeadline}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: 28, marginBottom: 36 }}>{philosophyHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${philosophyItems.length}, 1fr)`, gap: 32, maxWidth: 760, margin: '0 auto' }}>
            {philosophyItems.map((item, i) => (
              <div key={i} className="text-center">
                <div style={{ fontSize: 30, marginBottom: 10 }}>{item.icon}</div>
                <strong>{item.title}</strong>
                <p style={{ marginTop: 6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ background: 'var(--cream-deep)' }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">{storyEyebrow}</span>
            <h2 style={{ fontSize: 28, margin: '10px 0 16px' }}>{storyHeading}</h2>
            <p>{storyText}</p>
          </div>
          <div style={{ borderRadius: 8, overflow: 'hidden' }}>
            <img src={storyImage} alt={storyHeading} style={{ width: '100%' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div style={{ borderRadius: 8, overflow: 'hidden' }}>
            <img src={sourcingImage} alt={sourcingHeading} style={{ width: '100%' }} />
          </div>
          <div>
            <span className="eyebrow">{sourcingEyebrow}</span>
            <h2 style={{ fontSize: 28, margin: '10px 0 16px' }}>{sourcingHeading}</h2>
            <p>{sourcingText}</p>
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ background: 'var(--olive-dark)', color: 'white' }}>
        <div className="container text-center">
          <span className="eyebrow" style={{ color: '#DCE3CC' }}>{commitmentEyebrow}</span>
          <h2 style={{ color: 'white', fontSize: 26, margin: '10px 0 14px' }}>{commitmentHeading}</h2>
          <p style={{ color: '#DCE3CC', maxWidth: 560, margin: '0 auto' }}>{commitmentText}</p>
        </div>
      </section>
    </div>
  );
}


