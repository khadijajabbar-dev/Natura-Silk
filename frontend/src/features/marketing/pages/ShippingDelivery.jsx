import PolicyPage from './PolicyPage';
import { useSetting } from '../../../shared/hooks/SiteSettingsContext.jsx';

export default function ShippingDelivery() {
  const brandName = useSetting('brandName', 'HairCare');
  const freeShippingSub = useSetting('trustFreeShippingSub', 'On orders over PKR 2000');

  return (
    <PolicyPage
      title="Shipping & Delivery"
      breadcrumb="Shipping & Delivery"
      sections={[
        {
          heading: 'Delivery Areas',
          paragraphs: [
            `${brandName} currently ships nationwide. Delivery times may vary slightly depending on your city or region.`,
          ],
        },
        {
          heading: 'Delivery Timeframes',
          list: [
            'Major cities: 2–4 business days',
            'Other cities and towns: 4–7 business days',
            'Remote areas: 7–10 business days',
          ],
        },
        {
          heading: 'Shipping Charges',
          paragraphs: [
            `We offer free shipping ${freeShippingSub.toLowerCase()}. Orders below this amount are charged a small flat shipping fee at checkout.`,
          ],
        },
        {
          heading: 'Order Tracking',
          paragraphs: [
            'Once your order is placed, you will receive a confirmation email with your complete order details and a direct tracking link. You can check your live delivery status anytime by clicking the tracking link in your email.',
          ],
        },
        {
          heading: 'Delays',
          paragraphs: [
            'Occasionally, deliveries may be delayed due to weather, courier volume, or circumstances beyond our control. We appreciate your patience and will keep you updated if this happens.',
          ],
        },
      ]}
    />
  );
}
