# HairCare — Full-Stack E-Commerce Site

A complete hair-care e-commerce site: React (Vite) frontend + Node/Express + MongoDB backend, with real
authentication, cart, and checkout enforced server-side.

## Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt password hashing
- **Frontend:** React 18, Vite, React Router, Axios

## Features
- Product catalog with 6 real seeded products, categories, and reviews
- Signup / Login (JWT-based, passwords hashed with bcrypt)
- Cart — persisted per user in the database
- Checkout — **requires login** (enforced on the backend, not just hidden in the UI)
- Order history on the Account page
- Blog with full post detail pages
- Pages: Home, Shop (with category filter + sort), Product Detail, Cart, Checkout, Login, Signup,
  Account, About, Blog, Blog Post, Contact

## Project Structure
```
haircare/
  backend/
    src/
      db/          # MongoDB connection + seed script
      models/      # Mongoose schemas: User, Category, Product, Review, CartItem, Order
      controllers/ # auth, products, cart, orders
      routes/
      middleware/  # JWT auth guard
      utils/       # jwt helper, response serializers, async error wrapper
      server.js
    public/images/ # product photos
  frontend/
    src/
      app/            # App.jsx (route composition) + main.jsx (entry point)
      shared/         # cross-feature code
        api/          # base axios client
        components/   # Navbar, Footer
        hooks/        # SiteSettingsContext
        assets/
        styles/
      features/       # one folder per feature/module
        auth/         # AuthContext, ProtectedRoute (currently unused — see Notes)
        shop/          api/ | components/ | hooks/ | pages/ | routes/
        cart/
        wishlist/
        orders/
        blog/
        marketing/     # Home, About, Contact, FAQ, policy pages
        admin/
      # each feature folder follows: api/ components/ hooks/ pages/ routes/
      # (only the subfolders a feature actually needs are present)
```

## Before You Start: Install MongoDB

You need a MongoDB server running locally (or a MongoDB Atlas connection string).

1. Download **MongoDB Community Server** from https://www.mongodb.com/try/download/community
   and install it with the default options (it installs as a Windows service, so it starts
   automatically — you don't need to manually start it every time).
2. Download **MongoDB Compass** (usually bundled with the installer, or from
   https://www.mongodb.com/try/download/compass) — this is the GUI where you'll actually see your
   collections and documents.
3. Open Compass and connect to `mongodb://localhost:27017`. Once the backend has been seeded (see
   below), you'll see a `haircare` database there with collections: `users`, `categories`,
   `products`, `reviews`, `cartitems`, `orders`.

If you'd rather not install MongoDB locally, create a free cluster at
https://www.mongodb.com/cloud/atlas and set `MONGODB_URI` (see below) to your Atlas connection
string instead — Compass can connect to that too.

## How to Run

### 1. Backend
```bash
cd backend
npm install
npm start        # runs on http://localhost:4000
```

The database seeds itself automatically the first time it's empty (no products/categories yet) —
so teammates can just run `npm install && npm start` and the site works immediately, without
remembering to run a seed command. You can still run it manually any time:
```bash
npm run seed     # safe to run again — it upserts, never duplicates data
```

By default the backend connects to `mongodb://127.0.0.1:27017/haircare`. To use a different
MongoDB (e.g. Atlas), create a `.env` file in `backend/` with:
```
MONGODB_URI=your-connection-string-here
```

### 2. Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser. The Vite dev server proxies `/api` and `/images`
requests to the backend on port 4000, so both must be running.

### Resetting the database
Either re-run `npm run seed` (it upserts, so it's safe to run again), or open Compass, drop the
`haircare` database, and restart the backend — it will auto-seed itself again.

### Checking for unused collections
```bash
npm run db:list    # lists every collection in your database and flags any not used by the app
npm run db:clean    # asks for confirmation, then drops only the unused ones
```

## Notes
- The site uses guest checkout (a random guest id in `localStorage` tracks each visitor's cart/orders)
  plus a separate password-based admin login — there's no customer signup/login flow in the UI.
  `features/auth/` (`AuthContext`, `ProtectedRoute`) and the backend's `/api/auth` routes are leftover
  from an earlier design and aren't wired into the app; keep or remove them depending on whether
  customer accounts are coming back.
- Cash on Delivery is the only payment method wired up (card payment is shown but disabled, ready for
  a real payment gateway later).
- Free shipping automatically applies over PKR 2,000; otherwise a flat PKR 200 fee is added at checkout.
- JWT secret is a dev default in `backend/src/utils/jwt.js` — set a `JWT_SECRET` environment variable
  before deploying anywhere real.

## Admin Panel
Go to **http://localhost:5173/admin** and log in with the password `haircare2024` (change this by
setting `ADMIN_PASSWORD` in `backend/.env`).

From the dashboard you can:
- **Website Settings** — edit text AND images for every homepage section: Hero, Promo Banner, Why
  Choose, Ingredients, Testimonials, Instagram, plus Contact info, social links, and trust bar text.
  Every image field has three ways to set it: pick from the dropdown of images already on the
  server, paste a URL, or click **Upload** to send a photo straight from your device — uploaded
  photos are saved on the server (`backend/public/images/uploads/`) and their path is stored in
  MongoDB, so they show up in Compass just like any other data. Changes appear on the live site
  immediately (no restart needed).
- **Products Manager** — add, edit, or delete products, including uploading their photo.
- **Categories Manager** — add, edit, or delete shop categories, including uploading their photo.
- **Orders** — view every order placed on the site (customer, items, shipping address, payment
  method) and update its status (placed → processing → dispatched → delivered, or cancelled).
- **Logo** — set in Website Settings → Brand → Logo, shown in both the navbar and the footer next
  to the brand name.

Nothing here touches or deletes the original image files — uploading a new photo just adds a file
and points that section at it; the old files stay in `backend/public/images/` if you want to switch
back.

## WhatsApp
Set your WhatsApp number in Website Settings → Contact → WhatsApp Number (digits only, with country
code, e.g. `923001234567`). Once set:
- A WhatsApp icon appears in the footer's social icons, linking straight to a chat with that number.
- The Contact page shows a "Chat with us on WhatsApp" button.
- When someone submits the Contact form, their message is saved on the site **and** WhatsApp opens
  in a new tab with the same message pre-filled, so they can send it straight to your WhatsApp too.

## Footer Pages
The footer's "Customer Service" links (Shipping & Delivery, Returns & Refunds, Terms & Conditions,
Privacy Policy, FAQ) each go to a real page with actual content, not a placeholder.

## Order Confirmation Emails
Checkout now asks for the buyer's email. When an order is placed, the site tries to send an order
confirmation email with a **Track Order** button that opens the order's live status page
(`/orders/:id`) — no login needed.

There are two ways to turn this on — pick whichever is easier for you.

### Option A — Resend (recommended, simplest)
No App Passwords, no SMTP setup — just one API key.
1. Sign up free at https://resend.com
2. Go to **API Keys** → Create API Key → copy it
3. Add this single line to `backend/.env`:
   ```
   RESEND_API_KEY=re_your_key_here
   FRONTEND_URL=http://localhost:5173
   ```
4. That's it. On Resend's free plan, `MAIL_FROM` can stay as the default
   (`HairCare <onboarding@resend.dev>`) for testing — to send from your own domain/email later,
   verify a domain in Resend and set `MAIL_FROM="HairCare <you@yourdomain.com>"`.

### Option B — SMTP (Gmail, Outlook, etc.)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM="HairCare <youraddress@gmail.com>"
FRONTEND_URL=http://localhost:5173
```
For Gmail, `SMTP_PASS` must be a 16-character [App Password](https://myaccount.google.com/apppasswords)
(requires 2-Step Verification to be turned on first) — your normal Gmail password will not work.

If `RESEND_API_KEY` is set, it's used automatically and SMTP settings are ignored. If neither is
set, the site still works completely normally — it just skips sending the email and logs a warning
in the backend terminal. Placing an order never fails because of email.

## Ingredients Page
Each ingredient card is clickable — it opens a popup with the full benefit description and a
**Shop Now** button linking straight to the specific product that contains it. In Admin →
Website Settings → Ingredients, each ingredient card has a "Linked Product Slug" field — set this
to the `slug` of the product you want its Shop Now button to open (you can see each product's slug
printed under its name in Admin → Products Manager).
