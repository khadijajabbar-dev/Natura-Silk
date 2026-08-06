import { Route } from 'react-router-dom';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Ingredients from '../pages/Ingredients';

export const shopRoutes = (
  <>
    <Route path="/shop" element={<Shop />} />
    <Route path="/product/:slug" element={<ProductDetail />} />
    <Route path="/ingredients" element={<Ingredients />} />
  </>
);
