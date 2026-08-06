import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function FAQ() {
  const brandName = useSetting('brandName', 'HairCare');
  const contactEmail = useSetting('contactEmail', 'info@haircare.com');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Are your products suitable for all hair types?',
      a: `Yes! ${brandName} products are formulated to work for all hair types, including curly, straight, wavy, and color-treated hair.`,
    },
    {
      q: 'Are your products free from harsh chemicals?',
      a: 'Yes, all our products are free from sulfates, parabens, and harsh chemicals. We use natural, plant-based ingredients wherever possible.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Delivery typically takes 2–4 business days for major cities and 4–7 business days for other areas. See our Shipping & Delivery page for full details.',
    },
    {
      q: 'Can I return a product if I don\'t like it?',
      a: 'Yes, unopened products in their original packaging can be returned within our return policy window. See our Returns & Refunds page for details.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery, bank transfer, and Easypaisa/JazzCash, depending on your location.',
    },
    {
      q: 'How do I track my order?',
      a: 'Once you place an order, you will immediately receive an automated confirmation email containing a secure link to track your order status anytime.',
    },
    {
      q: 'Do you test your products on animals?',
      a: 'No, none of our products are tested on animals.',
    },
    {
      q: 'How can I contact customer support?',
      a: `You can reach us anytime through our Contact page, or email us directly at ${contactEmail}.`,
    },
  ];

  return (
    <div className="container section">
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Frequently Asked Questions</h1>
      <p style={{ marginBottom: 36 }}>Everything you need to know before you shop with us.</p>

      <div style={{ maxWidth: 720 }}>
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  padding: '18px 0', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 600,
                  color: 'var(--ink)',
                }}
              >
                {item.q}
                <span style={{ fontSize: 18, color: 'var(--olive)', flexShrink: 0, marginLeft: 16 }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--ink-soft)', paddingBottom: 20 }}>
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

