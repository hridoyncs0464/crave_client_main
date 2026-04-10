# Crave Restaurant - Complete File Structure

**Last Updated:** April 6, 2026  
**Project Type:** React + Vite SPA  
**Status:** Active Development

---

## 📁 Root Directory

```
crave_client/
├── .vscode/                          # VS Code settings
│   └── settings.json
├── node_modules/                     # Dependencies (auto-generated)
├── public/                           # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/                              # Source code (detailed below)
├── .env.local                        # Environment variables (Firebase config)
├── .gitignore                        # Git ignore rules
├── eslint.config.js                  # ESLint configuration
├── firebase.init.js                  # Firebase initialization
├── index.html                        # HTML entry point
├── package-lock.json                 # Locked dependencies
├── package.json                      # Project dependencies & scripts
├── PROJECT_DOCUMENTATION.md          # Complete project documentation
├── PROJECT_FILE_STRUCTURE.md         # This file
├── README.md                         # Project readme
└── vite.config.js                    # Vite configuration
```

---

## 📂 Source Directory (`src/`)

### Complete Structure

```
src/
├── assets/                           # Images and static files
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── Component/                        # Reusable components
│   ├── Categories/
│   │   └── Categories.jsx           # Category grid display
│   ├── Header/
│   │   ├── Banner.jsx               # Hero section
│   │   └── Navbar.jsx               # Navigation bar
│   ├── Sections/
│   │   └── WhyChooseUs.jsx          # Why Choose Us section
│   └── Footer.jsx                   # Footer component
│
├── ContextAPI/                       # Context providers
│   ├── AuthContext.jsx              # Auth context definition
│   ├── AuthProvider.jsx             # Auth state management
│   └── CartContext.jsx              # Cart context & provider
│
├── Hooks/                            # Custom React hooks
│   ├── useAuth.jsx                  # Authentication hook
│   ├── useAxios.jsx                 # Axios instance hook
│   └── useCart.jsx                  # Cart management hook
│
├── Layout/                           # Layout components
│   └── Layout.jsx                   # Main layout wrapper (Navbar + Outlet)
│
├── Pages/                            # Page components
│   ├── About/
│   │   └── About.jsx                # About Us page
│   ├── Authentication/
│   │   ├── Login.jsx                # Login page
│   │   └── Register.jsx             # Registration page
│   ├── Cart/
│   │   └── Cart.jsx                 # Shopping cart page
│   ├── Home/
│   │   └── Home.jsx                 # Home page
│   ├── Menu/
│   │   └── Menu.jsx                 # Menu page with filters
│   └── Order/
│       ├── Order.jsx                # Order checkout page
│       └── OrderSuccess.jsx         # Order confirmation page
│
├── Router/                           # Routing configuration
│   └── Router.jsx                   # React Router setup
│
├── App.css                           # App-specific styles (empty)
├── App.jsx                           # Root App component
├── index.css                         # Global styles + Tailwind + DaisyUI themes
└── main.jsx                          # Application entry point
```

---

## 📄 File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build tool configuration with React and Tailwind plugins |
| `eslint.config.js` | ESLint rules for code quality |
| `firebase.init.js` | Firebase app initialization and auth setup |
| `.env.local` | Environment variables (Firebase credentials) |
| `package.json` | Dependencies, scripts, and project metadata |
| `index.html` | HTML template with root div |

### Entry Points

| File | Purpose |
|------|---------|
| `src/main.jsx` | React app entry point, wraps app with AuthProvider and RouterProvider |
| `src/App.jsx` | Root component (currently minimal) |
| `src/index.css` | Global styles, Tailwind imports, DaisyUI themes (light/dark) |

### Context & State Management

| File | Purpose |
|------|---------|
| `src/ContextAPI/AuthContext.jsx` | Creates authentication context |
| `src/ContextAPI/AuthProvider.jsx` | Provides auth state (user, login, logout, Google OAuth) |
| `src/ContextAPI/CartContext.jsx` | Cart state management (add, remove, update quantities) |

### Custom Hooks

| File | Purpose |
|------|---------|
| `src/Hooks/useAuth.jsx` | Access authentication context |
| `src/Hooks/useAxios.jsx` | Configured Axios instance (baseURL: http://localhost:5000) |
| `src/Hooks/useCart.jsx` | Access cart context |

### Layout & Navigation

| File | Purpose |
|------|---------|
| `src/Layout/Layout.jsx` | Main layout with Navbar and Outlet for child routes |
| `src/Component/Header/Navbar.jsx` | Responsive navbar with auth state, user menu, mobile menu |
| `src/Component/Footer.jsx` | Footer with links, contact info, social media, opening hours |

### Components

| File | Purpose |
|------|---------|
| `src/Component/Header/Banner.jsx` | Hero section with background image, CTA buttons |
| `src/Component/Categories/Categories.jsx` | Category grid, fetches from API, navigates to filtered menu |
| `src/Component/Sections/WhyChooseUs.jsx` | Features section (Master Chefs, Fresh Ingredients, etc.) |

### Pages

| File | Purpose |
|------|---------|
| `src/Pages/Home/Home.jsx` | Home page (Banner + Categories + Footer) |
| `src/Pages/About/About.jsx` | About Us page (story, team, values, awards) |
| `src/Pages/Authentication/Login.jsx` | Login form with email/password and Google OAuth |
| `src/Pages/Authentication/Register.jsx` | Registration form with validation |
| `src/Pages/Menu/Menu.jsx` | Menu items with category filter and price sorting |
| `src/Pages/Cart/Cart.jsx` | Shopping cart with item management |
| `src/Pages/Order/Order.jsx` | Checkout page |
| `src/Pages/Order/OrderSuccess.jsx` | Order confirmation page |

### Routing

| File | Purpose |
|------|---------|
| `src/Router/Router.jsx` | React Router configuration with all routes |

---

## 🗺️ Current Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with banner and categories |
| `/about` | About | About Us page with team and story |
| `/login` | Login | User login page |
| `/register` | Register | User registration page |
| `/menu` | Menu | Menu items with filtering |
| `/menu?category={id}` | Menu | Filtered menu by category |
| `/cart` | Cart | Shopping cart |
| `/order` | Order | Checkout page |
| `/order-success` | OrderSuccess | Order confirmation |

### Planned Routes (Links exist but not implemented)

- `/reservations` - Table booking
- `/profile` - User profile
- `/my-reservations` - User's reservations
- `/contact` - Contact page
- `/gallery` - Photo gallery
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/sitemap` - Sitemap

---

## 🎨 Styling Structure

### Theme Configuration (`src/index.css`)

```css
@import "tailwindcss";
@plugin "daisyui";

/* Light Theme (Default) */
- Primary: #C0392B (deep ember red)
- Secondary: #E67E22 (burnt orange)
- Accent: #F5C518 (warm gold)
- Base-100: #FFFDF7 (warm cream white)

/* Dark Theme */
- Primary: #E74C3C (brighter red)
- Secondary: #F39C12 (amber)
- Accent: #F5C518 (warm gold)
- Base-100: #1A1208 (deep warm black)
```

---

## 🔌 API Integration

### Backend Server
- **Base URL:** `http://localhost:5000`
- **Configured in:** `src/Hooks/useAxios.jsx`

### API Endpoints Used

```
Authentication:
POST /api/register          - Register new user
POST /api/verify-user       - Verify/save Google user

Menu:
GET  /api/categories        - Fetch all categories
GET  /api/menu              - Fetch menu items
GET  /api/menu?category={id}&sortPrice={sort}
```

---

## 📦 Key Dependencies

### Production Dependencies
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router": "^7.13.2",
  "react-hook-form": "^7.72.0",
  "react-icons": "^5.6.0",
  "axios": "^1.14.0",
  "firebase": "^12.11.0",
  "tailwindcss": "^4.2.2",
  "daisyui": "^5.5.19"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^6.0.1",
  "vite": "^8.0.1",
  "eslint": "^9.39.4"
}
```

---

## 🚀 NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔥 Firebase Configuration

**Location:** `.env.local`

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

**Initialized in:** `firebase.init.js`

---

## 📊 Component Hierarchy

```
App (main.jsx)
└── AuthProvider
    └── RouterProvider
        └── Layout
            ├── Navbar
            └── Outlet (renders child routes)
                ├── Home
                │   ├── Banner
                │   ├── Categories
                │   └── Footer
                ├── About
                │   └── Footer
                ├── Menu
                ├── Cart
                ├── Order
                ├── OrderSuccess
                ├── Login
                └── Register
```

---

## 🗃️ State Management

### Global State (Context API)

1. **AuthContext** (`src/ContextAPI/AuthProvider.jsx`)
   - `user` - Current user object
   - `loading` - Auth loading state
   - `createUser()` - Register with email/password
   - `loginUser()` - Login with email/password
   - `signInWithGoogle()` - Google OAuth
   - `signOutUser()` - Logout
   - `UpdateUserProfile()` - Update profile

2. **CartContext** (`src/ContextAPI/CartContext.jsx`)
   - `cartItems` - Array of cart items
   - `addToCart()` - Add item to cart
   - `removeFromCart()` - Remove item
   - `updateQuantity()` - Update item quantity
   - `clearCart()` - Clear all items
   - `getCartTotal()` - Calculate total

---

## 🎯 Features Implemented

### ✅ Completed
- User authentication (email/password + Google OAuth)
- Responsive navigation with mobile menu
- Home page with hero and categories
- About Us page with team and story
- Menu browsing with category filtering
- Shopping cart functionality
- Order checkout flow
- Firebase integration
- MySQL database integration
- Light/dark theme support

### 🚧 In Progress
- Reservation system
- User profile management
- Order history

### ❌ Not Started
- Payment integration
- Admin panel
- Reviews/ratings
- Email notifications
- Search functionality

---

## 📝 Code Patterns

### Component Structure
```jsx
import React from 'react';
import { Link } from 'react-router';

const ComponentName = () => {
  return (
    <div className="container mx-auto">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### API Call Pattern
```jsx
import { useState, useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';

const Component = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/endpoint');
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosInstance]);

  // Render logic
};
```

---

## 🔍 Important Notes

1. **Case Sensitivity:** Component imports are case-sensitive
2. **Hooks Path:** Some files use `../../hooks/useAxios` (lowercase) vs `../../Hooks/useAxios` (uppercase)
3. **Router:** Using React Router v7 with new API
4. **Icons:** Using `react-icons` - ensure correct icon names
5. **Backend:** Expects Node.js/Express server on port 5000
6. **Database:** MySQL database required for user and menu data

---

## 🛠️ Development Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env.local` with Firebase credentials
4. Start backend server on port 5000
5. Run development server: `npm run dev`
6. Access at `http://localhost:5173`

---

**End of File Structure Documentation**
