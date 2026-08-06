import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import ShippingDelivery from '../pages/ShippingDelivery';
import ReturnsRefunds from '../pages/ReturnsRefunds';
import TermsConditions from '../pages/TermsConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import NotFound from '../pages/NotFound';

export const marketingRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/shipping-delivery" element={<ShippingDelivery />} />
    <Route path="/returns-refunds" element={<ReturnsRefunds />} />
    <Route path="/terms-conditions" element={<TermsConditions />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  </>
);

export const notFoundRoute = <Route path="*" element={<NotFound />} />;
