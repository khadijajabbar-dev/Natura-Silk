
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from '../features/cart/hooks/CartContext.jsx'
import { WishlistProvider } from '../features/wishlist/hooks/WishlistContext.jsx'
import { SiteSettingsProvider } from '../shared/hooks/SiteSettingsContext.jsx'
import '../shared/styles/theme.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SiteSettingsProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </SiteSettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
