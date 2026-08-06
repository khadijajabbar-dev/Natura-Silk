// import { Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from '../shared/components/Navbar';
// import Footer from '../shared/components/Footer';
// import { useApplySEO } from '../shared/hooks/SiteSettingsContext.jsx';

// import { marketingRoutes, notFoundRoute } from '../features/marketing/routes';
// import { shopRoutes } from '../features/shop/routes';
// import { cartRoutes } from '../features/cart/routes';
// import { wishlistRoutes } from '../features/wishlist/routes';
// import { ordersRoutes } from '../features/orders/routes';
// import { blogRoutes } from '../features/blog/routes';
// import { adminRoutes } from '../features/admin/routes';

// export default function App() {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   useApplySEO();

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       {!isAdminRoute && <Navbar />}
//       <main style={{ flex: 1 }}>
//         <Routes>
//           {marketingRoutes}
//           {shopRoutes}
//           {cartRoutes}
//           {wishlistRoutes}
//           {ordersRoutes}
//           {blogRoutes}
//           {adminRoutes}
//           {notFoundRoute}
//         </Routes>
//       </main>
//       {!isAdminRoute && <Footer />}
//     </div>
//   );
// }



import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import ScrollToTop from '../shared/components/ScrollToTop';
import { useApplySEO } from '../shared/hooks/SiteSettingsContext.jsx';

import { marketingRoutes, notFoundRoute } from '../features/marketing/routes';
import { shopRoutes } from '../features/shop/routes';
import { cartRoutes } from '../features/cart/routes';
import { wishlistRoutes } from '../features/wishlist/routes';
import { ordersRoutes } from '../features/orders/routes';
import { blogRoutes } from '../features/blog/routes';
import { adminRoutes } from '../features/admin/routes';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  useApplySEO();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          {marketingRoutes}
          {shopRoutes}
          {cartRoutes}
          {wishlistRoutes}
          {ordersRoutes}
          {blogRoutes}
          {adminRoutes}
          {notFoundRoute}
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
