import PolicyPage from './PolicyPage';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function ReturnsRefunds() {
  const brandName = useSetting('brandName', 'HairCare');
  const returnsSub = useSetting('trustEasyReturnsSub', '30 Days Return Policy');

  return (
    <PolicyPage
      title="Returns & Refunds"
      breadcrumb="Returns & Refunds"
      sections={[
        {
          heading: 'Our Return Policy',
          paragraphs: [
            `We want you to love your ${brandName} products. If you're not satisfied, we offer a ${returnsSub.toLowerCase()} from the date of delivery.`,
          ],
        },
        {
          heading: 'Eligibility for Returns',
          list: [
            'The product must be unused, unopened, and in its original packaging.',
            'The return request must be made within the policy window from the delivery date.',
            'Proof of purchase (order number or receipt) is required.',
          ],
        },
        {
          heading: 'How to Request a Return',
          paragraphs: [
            'Contact our support team through the Contact page or WhatsApp with your order number and reason for return. Our team will guide you through the next steps, including pickup or drop-off arrangements.',
          ],
        },
        {
          heading: 'Refunds',
          paragraphs: [
            'Once your returned item is received and inspected, we will notify you of the approval status. Approved refunds are processed within 5–7 business days to your original payment method, or as store credit if you paid via Cash on Delivery.',
          ],
        },
        {
          heading: 'Damaged or Incorrect Items',
          paragraphs: [
            'If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with photos of the product and packaging so we can resolve it quickly at no extra cost to you.',
          ],
        },
      ]}
    />
  );
}

