import PolicyPage from './PolicyPage';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function PrivacyPolicy() {
  const brandName = useSetting('brandName', 'HairCare');
  const contactEmail = useSetting('contactEmail', 'info@haircare.com');

  return (
    <PolicyPage
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      updated="July 2026"
      sections={[
        {
          heading: 'Information We Collect',
          paragraphs: [
            `When you use the ${brandName} website, we may collect information such as your name, email address, phone number, shipping address, and order history in order to process and deliver your orders.`,
          ],
        },
        {
          heading: 'How We Use Your Information',
          list: [
            'To process and deliver your orders',
            'To communicate with you about your account or orders',
            'To send you updates, offers, or newsletters (only if you opt in)',
            'To improve our products, website, and customer experience',
          ],
        },
        {
          heading: 'How We Protect Your Information',
          paragraphs: [
            'We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure. Payment information is never stored on our servers.',
          ],
        },
        {
          heading: 'Sharing of Information',
          paragraphs: [
            'We do not sell or rent your personal information to third parties. We may share information with trusted delivery and payment partners only as needed to fulfill your order.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'Our website may use cookies to remember your cart and preferences, and to understand how visitors use our site so we can improve it.',
          ],
        },
        {
          heading: 'Your Rights',
          paragraphs: [
            `You may request to view, update, or delete your personal information at any time by contacting us at ${contactEmail}.`,
          ],
        },
      ]}
    />
  );
}
