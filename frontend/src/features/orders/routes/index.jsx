import { Route } from 'react-router-dom';
import Account from '../pages/Account';
import OrderDetail from '../pages/OrderDetail';
import TrackOrder from '../pages/TrackOrder';

export const ordersRoutes = (
  <>
    <Route path="/account" element={<Account />} />
    <Route path="/orders/:id" element={<OrderDetail />} />
    <Route path="/track/:id" element={<TrackOrder />} />
  </>
);
