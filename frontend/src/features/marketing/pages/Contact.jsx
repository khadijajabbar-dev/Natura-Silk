import { useState } from 'react';
import client from '../../../shared/api/client';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';
import { getWhatsAppNumber, getWhatsAppUrl } from '../../../shared/utils/whatsapp.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', website_alt: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const pageHeading = useSetting('contactPageHeading', "We'd Love to Hear From You");
  const pageSubheading = useSetting('contactPageSubheading', "Have a question or need help? Fill out the form and our team will get back to you as soon as possible.");
  const contactPhone = useSetting('contactPhone', '+92 300 1234567');
  const contactEmail = useSetting('contactEmail', 'info@haircare.com');
  const contactAddress = useSetting('contactAddress', 'Lahore, Pakistan');
  const contactHours = useSetting('contactHours', '24/7 Support');
  const whatsappNumberRaw = useSetting('whatsappNumber', '');
  const whatsappDigits = getWhatsAppNumber(whatsappNumberRaw);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await client.post('/contact', form);
      setSent(true);

      if (whatsappDigits) {
        const phonePart = form.phone ? `Phone: ${form.phone}\n` : '';
        const subjectPart = form.subject ? `Subject: ${form.subject}\n` : '';
        const text = `Hi, my name is ${form.name}.\n${phonePart}${subjectPart}\n${form.message}\n\n(Sent via website contact form — ${form.email})`;
        const waUrl = getWhatsAppUrl(whatsappDigits, text);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setForm({ name: '', email: '', phone: '', subject: '', message: '', website_alt: '' });
    } catch {
      setError('Could not send your message. Please try again in a moment.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container" style={{ position: 'relative', paddingTop: 24, paddingBottom: 72 }}>
      <style>{`
        .contact-page-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 960px) {
          .contact-page-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr;
          }
          .contact-card-padding {
            padding: 28px 22px !important;
          }
        }
        .input-field-custom {
          width: 100%;
          padding: 13px 18px;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 10px;
          font-size: 14px;
          color: var(--ink);
          transition: all 0.25s ease;
        }
        .input-field-custom::placeholder {
          color: var(--ink-soft);
          opacity: 0.7;
        }
        .input-field-custom:focus {
          outline: none;
          border-color: var(--olive-mid);
          box-shadow: 0 0 0 3px rgba(92, 107, 69, 0.12);
          background: var(--white);
        }
        .btn-send-custom {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-send-custom:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(44, 53, 32, 0.3);
          background: #394529 !important;
        }
        .info-card-custom {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-card-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgba(44, 53, 32, 0.1) !important;
        }
        .whatsapp-card-custom {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .whatsapp-card-custom:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 42px rgba(44, 53, 32, 0.35) !important;
        }
      `}</style>

      {/* ── HEADER TITLE SECTION ── */}
      <div className="text-center" style={{ marginBottom: 46, marginTop: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 24, color: 'var(--gold)', fontWeight: 500, marginBottom: 6
        }}>
          Contact Us
        </div>
        <h1 style={{ fontSize: 42, color: 'var(--olive-dark)', fontWeight: 500, marginBottom: 12, lineHeight: 1.2 }}>
          {pageHeading === 'Contact Us' ? "We'd Love to Hear From You" : pageHeading}
        </h1>
        <div style={{ width: 44, height: 2, background: 'var(--olive-dark)', margin: '0 auto 16px', borderRadius: 1 }} />
        <p style={{ fontSize: 15, maxWidth: 580, margin: '0 auto', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
          {pageSubheading}
        </p>
      </div>

      {/* ── MAIN TWO COLUMN GRID ── */}
      <div className="contact-page-grid">
        
        {/* LEFT COLUMN: FORM CARD */}
        <div className="contact-card-padding" style={{
          background: 'var(--white)',
          border: '1px solid var(--line)',
          borderRadius: 24,
          padding: '44px 42px',
          boxShadow: '0 20px 50px rgba(44, 53, 32, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background botanical leaf */}
          <div style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.04, pointerEvents: 'none', color: 'var(--olive-dark)' }}>
            <LeafOrnament width={220} height={220} />
          </div>

          {sent && (
            <div style={{
              background: '#E9F5E6', border: '1px solid #C2E2B8', color: '#2C4F21',
              padding: '16px 20px', borderRadius: 12, marginBottom: 28, fontSize: 14.5,
              display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500
            }}>
              <span style={{ fontSize: 22 }}>🌿</span>
              <span>Thanks for reaching out! We'll get back to you within 24 hours.{whatsappDigits && ' We\'ve also opened WhatsApp so you can send us your message directly.'}</span>
            </div>
          )}
          {error && (
            <div style={{
              background: '#FDECEC', border: '1px solid #F5C6C6', color: '#8A2525',
              padding: '14px 18px', borderRadius: 12, marginBottom: 28, fontSize: 14
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
            {/* Honeypot */}
            <input
              type="text"
              name="website_alt"
              value={form.website_alt}
              onChange={(e) => setForm({ ...form, website_alt: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            {/* Your Name */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 22 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                background: 'var(--olive-dark)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(44, 53, 32, 0.16)',
                marginTop: 2
              }}>
                <UserIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="input-field-custom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 22 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                background: 'var(--olive-dark)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(44, 53, 32, 0.16)',
                marginTop: 2
              }}>
                <EmailIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="input-field-custom"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone + Subject in Row */}
            <div className="contact-form-row" style={{ marginBottom: 22 }}>
              {/* Phone */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: 'var(--olive-dark)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(44, 53, 32, 0.16)',
                  marginTop: 2
                }}>
                  <PhoneIcon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="input-field-custom"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: 'var(--olive-dark)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(44, 53, 32, 0.16)',
                  marginTop: 2
                }}>
                  <TagIcon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="input-field-custom"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 32 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                background: 'var(--olive-dark)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(44, 53, 32, 0.16)',
                marginTop: 2
              }}>
                <MessageIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="input-field-custom"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={sending}
                className="btn-send-custom"
                style={{
                  background: 'var(--olive-dark)', color: 'white',
                  border: 'none', borderRadius: 14,
                  padding: '16px 52px', fontSize: 15.5, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: '0 8px 22px rgba(44, 53, 32, 0.25)', cursor: 'pointer',
                  letterSpacing: '0.03em', minWidth: 220
                }}
              >
                <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
                {!sending && (
                  <span style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center' }}>
                    <SendIcon size={19} />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: GET IN TOUCH & WHATSAPP */}
        <div>
          {/* Get in Touch Header with divider lines */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24, padding: '0 10px' }}>
            <span style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, var(--gold))', opacity: 0.6 }} />
            <h2 style={{ fontSize: 23, fontFamily: 'var(--font-display)', color: 'var(--olive-dark)', fontWeight: 500, margin: 0, whiteSpace: 'nowrap' }}>
              Get in Touch
            </h2>
            <span style={{ height: 1, flex: 1, background: 'linear-gradient(270deg, transparent, var(--gold))', opacity: 0.6 }} />
          </div>

          {/* Info Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Phone', value: contactPhone, icon: <PhoneIcon size={22} /> },
              { label: 'Email', value: contactEmail, icon: <EmailIcon size={22} /> },
              { label: 'Address', value: contactAddress, icon: <LocationIcon size={22} /> },
              { label: 'Hours', value: contactHours, icon: <ClockIcon size={22} /> },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="info-card-custom"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: '18px 24px',
                  boxShadow: '0 4px 18px rgba(44, 53, 32, 0.05)',
                  display: 'flex', alignItems: 'center', gap: 20
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--olive-dark)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(44, 53, 32, 0.16)'
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Prominent WhatsApp Support Banner Card */}
          <a
            href={whatsappDigits ? getWhatsAppUrl(whatsappDigits) : '#'}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-card-custom"
            style={{
              display: 'block',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, var(--olive-dark) 0%, #1c2415 100%)',
              borderRadius: 22,
              padding: '28px 26px',
              boxShadow: '0 14px 34px rgba(44, 53, 32, 0.25)',
              border: '1px solid rgba(201, 162, 75, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              cursor: whatsappDigits ? 'pointer' : 'default'
            }}
          >
            {/* Background botanical leaf illustration */}
            <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.08, pointerEvents: 'none', color: 'var(--gold)' }}>
              <LeafOrnament width={150} height={150} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 66, height: 66, borderRadius: '50%', flexShrink: 0,
                background: '#25D366', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
                border: '3px solid rgba(255,255,255,0.15)'
              }}>
                <WhatsAppIcon size={38} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4, fontFamily: 'var(--font-body)' }}>
                  Chat with us on WhatsApp
                </div>
                <div style={{ fontSize: 13.5, color: '#C9CFB8', marginBottom: 6 }}>
                  We're here to help you!
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
                  Usually replies within minutes
                </div>
              </div>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}

/* ── SELF-CONTAINED SVG ICON COMPONENTS ── */
function UserIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EmailIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function MessageIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LocationIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SendIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function LeafOrnament({ width = 100, height = 100 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M90 10 C50 10 10 50 10 90 C15 70 30 50 50 45 C45 60 40 75 45 90 C65 85 85 65 90 40 C75 45 60 50 55 35 C70 30 85 20 90 10 Z" />
    </svg>
  );
}

