import { Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

export const cartRoutes = (
  <>
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
  </>
);
