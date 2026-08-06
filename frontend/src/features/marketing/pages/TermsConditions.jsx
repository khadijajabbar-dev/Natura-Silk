import PolicyPage from './PolicyPage';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function TermsConditions() {
  const brandName = useSetting('brandName', 'HairCare');

  return (
    <PolicyPage
      title="Terms & Conditions"
      breadcrumb="Terms & Conditions"
      updated="July 2026"
      sections={[
        {
          heading: '1. Acceptance of Terms',
          paragraphs: [
            `By accessing or using the ${brandName} website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.`,
          ],
        },
        {
          heading: '2. Products & Pricing',
          paragraphs: [
            'We make every effort to display our products and their prices accurately. However, we reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice.',
          ],
        },
        {
          heading: '3. Orders',
          paragraphs: [
            'By placing an order, you confirm that all information provided is accurate and complete. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or unauthorized activity.',
          ],
        },
        {
          heading: '4. Use of the Website',
          paragraphs: [
            'You agree to use this website only for lawful purposes. You may not use our website in any way that could damage, disable, or impair its operation, or interfere with any other party\'s use of the site.',
          ],
        },
        {
          heading: '5. Intellectual Property',
          paragraphs: [
            `All content on this website, including text, images, logos, and graphics, is the property of ${brandName} and may not be reproduced or used without written permission.`,
          ],
        },
        {
          heading: '6. Limitation of Liability',
          paragraphs: [
            `${brandName} shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or website.`,
          ],
        },
        {
          heading: '7. Changes to These Terms',
          paragraphs: [
            'We may update these Terms & Conditions from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
          ],
        },
      ]}
    />
  );
}
