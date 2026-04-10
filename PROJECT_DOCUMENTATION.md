# Crave Restaurant - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Setup](#environment-setup)
5. [Authentication System](#authentication-system)
6. [Routing Configuration](#routing-configuration)
7. [Component Architecture](#component-architecture)
8. [API Integration](#api-integration)
9. [Styling & Theming](#styling--theming)
10. [Features Implemented](#features-implemented)
11. [Database Schema](#database-schema)
12. [How to Continue Development](#how-to-continue-development)

---

## 🎯 Project Overview

**Crave** is a modern restaurant web application built with React and Vite. It provides a complete dining experience platform with features including:
- User authentication (Email/Password & Google OAuth)
- Dynamic menu browsing with category filtering
- Restaurant information and branding
- Responsive design with light/dark theme support

**Project Type:** Single Page Application (SPA)  
**Frontend Framework:** React 19.2.4 with Vite 8.0.1  
**UI Framework:** TailwindCSS 4.2.2 + DaisyUI 5.5.19  
**Backend:** Node.js/Express (separate server at `http://localhost:5000`)  
**Database:** MySQL  
**Authentication:** Firebase Authentication

---

## 🛠 Technology Stack

### Frontend Dependencies
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
  "@tailwindcss/vite": "^4.2.2",
  "daisyui": "^5.5.19"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^6.0.1",
  "eslint": "^9.39.4",
  "vite": "^8.0.1"
}
```

### Build Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind

---

## 📁 Project Structure

```
crave_client/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── Component/
│   │   ├── Categories/
│   │   │   └── Categories.jsx          # Category grid display
│   │   ├── Header/
│   │   │   ├── Banner.jsx              # Hero section
│   │   │   └── Navbar.jsx              # Navigation bar
│   │   └── Footer.jsx                  # Footer component
│   ├── ContextAPI/
│   │   ├── AuthContext.jsx             # Auth context definition
│   │   └── AuthProvider.jsx            # Auth state management
│   ├── Hooks/
│   │   ├── useAuth.jsx                 # Custom auth hook
│   │   └── useAxios.jsx                # Axios instance hook
│   ├── Layout/
│   │   └── Layout.jsx                  # Main layout wrapper
│   ├── Pages/
│   │   ├── Authentication/
│   │   │   ├── Login.jsx               # Login page
│   │   │   └── Register.jsx            # Registration page
│   │   ├── Home/
│   │   │   └── Home.jsx                # Home page
│   │   └── Menu/
│   │       └── Menu.jsx                # Menu page with filters
│   ├── Router/
│   │   └── Router.jsx                  # Route configuration
│   ├── App.css                         # (Empty)
│   ├── App.jsx                         # Root component
│   ├── index.css                       # Global styles + themes
│   └── main.jsx                        # Entry point
├── .env.local                          # Environment variables
├── .gitignore
├── eslint.config.js
├── firebase.init.js                    # Firebase configuration
├── index.html                          # HTML template
├── package.json
├── README.md
└── vite.config.js                      # Vite configuration

```

---

## 🔧 Environment Setup

### Environment Variables (.env.local)
```env
VITE_FIREBASE_API_KEY=AIzaSyChghgl7trwjnOXYacm1al2zyo_5KaMVhA
VITE_FIREBASE_AUTH_DOMAIN=crave-auth-c234f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=crave-auth-c234f
VITE_FIREBASE_STORAGE_BUCKET=crave-auth-c234f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=881299738259
VITE_FIREBASE_APP_ID=1:881299738259:web:133a5a647193a9b9c9076
```

### Installation Steps
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd crave_client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Server
The frontend expects a backend server running at:
```
http://localhost:5000
```

---

## 🔐 Authentication System

### Firebase Configuration (firebase.init.js)
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Auth Context Structure

**AuthContext.jsx** - Creates the context
```javascript
import { createContext } from "react";
export const AuthContext = createContext(null);
```

**AuthProvider.jsx** - Provides auth state and methods
```javascript
// Available methods:
- createUser(email, password)          // Register with email/password
- loginUser(email, password)           // Login with email/password
- signInWithGoogle()                   // Google OAuth login
- signOutUser()                        // Logout
- UpdateUserProfile(profile)           // Update user profile
- user                                 // Current user object
- loading                              // Loading state
```

### useAuth Hook
```javascript
import { use } from 'react';
import { AuthContext } from '../ContextAPI/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};
```

### Authentication Flow

#### Registration Flow:
1. User fills registration form (name, email, password)
2. Form validation via react-hook-form
3. `createUser()` creates Firebase account
4. User data saved to MySQL via `/api/register` endpoint
5. Redirect to home page

#### Login Flow:
1. User enters email and password
2. Form validation
3. `loginUser()` authenticates with Firebase
4. Redirect to home page

#### Google OAuth Flow:
1. User clicks "Continue with Google"
2. `signInWithGoogle()` opens Google popup
3. User data verified/saved via `/api/verify-user` endpoint
4. Redirect to home page

---

## 🗺 Routing Configuration

### Router Setup (src/Router/Router.jsx)
```javascript
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,              // Wrapper with Navbar
    children: [
      {
        index: true,
        Component: Home,            // Home page (/)
      },
      {
        path: "/login",
        Component: Login            // Login page
      },
      {
        path: "/register",
        Component: Register         // Registration page
      },
      {
        path: "/menu",
        element: <Menu/>            // Menu page
      }
    ],
  },
]);
```

### Current Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with banner + categories |
| `/login` | Login | User login page |
| `/register` | Register | User registration page |
| `/menu` | Menu | Menu items with filtering |
| `/menu?category={id}` | Menu | Filtered menu by category |

### Planned Routes (in Navbar but not implemented)
- `/reservations` - Table booking
- `/about` - About page
- `/profile` - User profile
- `/my-reservations` - User's reservations
- `/contact` - Contact page
- `/gallery` - Photo gallery
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/sitemap` - Sitemap

---

## 🧩 Component Architecture

### Layout Component (src/Layout/Layout.jsx)
```javascript
// Wraps all pages with Navbar
<>
  <Navbar />
  <Outlet />  {/* Child routes render here */}
</>
```

### Navbar Component (src/Component/Header/Navbar.jsx)
**Features:**
- Responsive design (mobile hamburger menu)
- Dynamic navigation links with active state
- User authentication state display
- Login/Logout buttons
- User avatar dropdown menu
- "Book a Table" CTA button

**Navigation Links:**
- Home (/)
- Menu (/menu)
- Reservations (/reservations)
- About (/about)

**User Menu (when logged in):**
- Profile
- My Reservations
- Logout

### Banner Component (src/Component/Header/Banner.jsx)
**Features:**
- Full-screen hero section
- Background image with overlay
- CTA buttons (Reserve a Table, View Menu)
- Feature badges (Fine Dining, Premium Selection, Award Winning)
- Parallax effect (background-attachment: fixed)

### Categories Component (src/Component/Categories/Categories.jsx)
**Features:**
- Fetches categories from `/api/categories`
- Grid layout (responsive: 1-4 columns)
- Category cards with images
- Click to navigate to filtered menu
- Loading and error states
- Hover animations

**Category Images Mapping:**
```javascript
const categoryImages = {
  "Starters": "unsplash-photo-url",
  "Soups & Salads": "unsplash-photo-url",
  "Noodles & Rice": "unsplash-photo-url",
  "Curries & Stir-Fries": "unsplash-photo-url",
  // ... etc
}
```

### Footer Component (src/Component/Footer.jsx)
**Sections:**
1. Brand & Social Links (Facebook, Twitter, Instagram, Tripadvisor)
2. Quick Links (navigation)
3. Contact Info (address, phone, email)
4. Opening Hours
5. Payment Methods (Visa, Mastercard, Amex, PayPal)
6. Legal Links (Privacy, Terms, Sitemap)

### Home Page (src/Pages/Home/Home.jsx)
```javascript
<>
  <Banner />
  <Categories />
  <Footer />
</>
```

### Login Page (src/Pages/Authentication/Login.jsx)
**Features:**
- Email/password login form
- Form validation (react-hook-form)
- Password visibility toggle
- Google OAuth button
- Error message display
- Loading states
- Link to registration page
- Animated background elements

**Form Fields:**
- Email (required, email validation)
- Password (required, min 6 characters)

### Register Page (src/Pages/Authentication/Register.jsx)
**Features:**
- Registration form with validation
- Saves user to both Firebase and MySQL
- Google OAuth registration
- Password strength indicator
- Error handling
- Loading states
- Link to login page

**Form Fields:**
- Full Name (required, min 2 characters)
- Email (required, email validation)
- Password (required, min 6 characters)

**API Endpoints Used:**
- `POST /api/register` - Save new user
- `POST /api/verify-user` - Verify/save Google user

### Menu Page (src/Pages/Menu/Menu.jsx)
**Features:**
- Fetches menu items from `/api/menu`
- Category filter dropdown
- Price sorting (low-to-high, high-to-low)
- URL parameter support (`?category={id}`)
- Responsive grid layout
- Loading and error states
- Empty state with reset button
- "Add to Cart" buttons (not functional yet)

**Filter Options:**
- Category: All Categories or specific category
- Sort: Default, Low to High, High to Low

**Menu Item Card Display:**
- Item name
- Category name
- Ingredients
- Price (৳ BDT)
- "Unique" badge for special dishes
- Add to Cart button

---

## 🔌 API Integration

### Axios Configuration (src/Hooks/useAxios.jsx)
```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const useAxios = () => {
  return axiosInstance;
};
```

### API Endpoints

#### Authentication Endpoints
```
POST /api/register
Body: {
  name: string,
  email: string,
  firebase_uid: string
}
Response: { success: boolean, message: string }

POST /api/verify-user
Body: {
  name: string,
  email: string,
  firebase_uid: string
}
Response: { success: boolean, message: string }
```

#### Menu Endpoints
```
GET /api/categories
Response: {
  success: boolean,
  data: [
    {
      id: number,
      category_name: string
    }
  ]
}

GET /api/menu?category={id}&sortPrice={sort}
Query Params:
  - category: number (optional)
  - sortPrice: "low-to-high" | "high-to-low" (optional)
Response: {
  success: boolean,
  data: [
    {
      id: number,
      item_name: string,
      category_name: string,
      ingredients: string,
      price_bdt: number,
      is_unique: boolean
    }
  ]
}
```

---

## 🎨 Styling & Theming

### TailwindCSS + DaisyUI Configuration

**Theme Colors:**

#### Light Theme (Default)
```css
--color-primary: #C0392B        /* deep ember red */
--color-secondary: #E67E22      /* burnt orange */
--color-accent: #F5C518         /* warm gold */
--color-neutral: #2C2C2C        /* charcoal */
--color-base-100: #FFFDF7       /* warm cream white */
--color-base-200: #F2EFE6       /* parchment */
--color-base-300: #E0D9CC       /* warm grey */
```

#### Dark Theme
```css
--color-primary: #E74C3C        /* brighter red */
--color-secondary: #F39C12      /* amber */
--color-accent: #F5C518         /* warm gold */
--color-base-100: #1A1208       /* deep warm black */
--color-base-200: #2A1F10       /* dark charred brown */
--color-base-300: #3B2C18       /* exposed wood tone */
```

### Design System

**Typography:**
- Font: System fonts (default)
- Headings: Bold, large sizes
- Body: Regular weight

**Spacing:**
- Container: `container mx-auto px-4 sm:px-6 lg:px-8`
- Sections: `py-12` or `py-20`

**Components:**
- Buttons: DaisyUI btn classes
- Cards: DaisyUI card classes
- Forms: DaisyUI form-control, input classes
- Badges: DaisyUI badge classes

**Animations:**
- Hover effects: `transition-all duration-300`
- Scale on hover: `hover:scale-105`
- Translate on hover: `group-hover:translate-x-1`
- Pulse: `animate-pulse`

---

## ✨ Features Implemented

### ✅ Completed Features

1. **User Authentication**
   - Email/password registration
   - Email/password login
   - Google OAuth integration
   - User session management
   - Protected routes (partially)

2. **Navigation**
   - Responsive navbar
   - Mobile hamburger menu
   - Active link highlighting
   - User dropdown menu

3. **Home Page**
   - Hero banner with CTA
   - Category grid display
   - Footer with contact info

4. **Menu System**
   - Menu item display
   - Category filtering
   - Price sorting
   - URL parameter filtering
   - Responsive grid layout

5. **UI/UX**
   - Light/dark theme support
   - Responsive design
   - Loading states
   - Error handling
   - Form validation

### 🚧 Partially Implemented

1. **Routing**
   - Links exist but pages not created:
     - /reservations
     - /about
     - /profile
     - /my-reservations
     - /contact
     - /gallery

2. **Cart System**
   - "Add to Cart" buttons present
   - No cart functionality implemented

### ❌ Not Implemented

1. **Reservation System**
2. **User Profile Management**
3. **Order/Cart System**
4. **Payment Integration**
5. **Admin Panel**
6. **Search Functionality**
7. **Reviews/Ratings**
8. **Email Notifications**

---

## 🗄 Database Schema

### Expected MySQL Tables

#### users table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### categories table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL
);
```

#### menu_items table
```sql
CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  item_name VARCHAR(255) NOT NULL,
  category_id INT,
  ingredients TEXT,
  price_bdt DECIMAL(10, 2),
  is_unique BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### Sample Categories
1. Starters
2. Soups & Salads
3. Noodles & Rice
4. Curries & Stir-Fries
5. Main Course
6. Crave's Unique Dishes
7. Sides
8. Drinks
9. Desserts
10. Fun Add-Ons

---

## 🚀 How to Continue Development

### Setting Up on Another Machine

1. **Clone and Install**
```bash
git clone <repository-url>
cd crave_client
npm install
```

2. **Create .env.local**
```env
VITE_FIREBASE_API_KEY=AIzaSyChghgl7trwjnOXYacm1al2zyo_5KaMVhA
VITE_FIREBASE_AUTH_DOMAIN=crave-auth-c234f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=crave-auth-c234f
VITE_FIREBASE_STORAGE_BUCKET=crave-auth-c234f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=881299738259
VITE_FIREBASE_APP_ID=1:881299738259:web:133a5a647193a9b9c9076
```

3. **Start Backend Server**
   - Ensure MySQL database is running
   - Start Node.js backend on port 5000
   - Verify API endpoints are accessible

4. **Start Frontend**
```bash
npm run dev
```

### Next Steps for Development

#### Priority 1: Complete Core Features
1. **Implement Reservations Page**
   - Create reservation form
   - Date/time picker
   - Party size selection
   - API integration

2. **Build Cart System**
   - Cart context/state management
   - Add/remove items
   - Quantity management
   - Cart page/modal

3. **Create About Page**
   - Restaurant story
   - Team information
   - Gallery

#### Priority 2: User Features
1. **User Profile Page**
   - View/edit profile
   - Change password
   - Profile picture upload

2. **My Reservations Page**
   - View upcoming reservations
   - Cancel reservations
   - Reservation history

3. **Order History**
   - Past orders
   - Order details
   - Reorder functionality

#### Priority 3: Advanced Features
1. **Search Functionality**
   - Menu item search
   - Filter by dietary restrictions
   - Advanced filters

2. **Reviews & Ratings**
   - Leave reviews
   - Rate dishes
   - View ratings

3. **Admin Panel**
   - Manage menu items
   - View reservations
   - User management

### Code Patterns to Follow

#### Creating a New Page
```javascript
// 1. Create component in src/Pages/
import React from 'react';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Your content */}
    </div>
  );
};

export default NewPage;

// 2. Add route in src/Router/Router.jsx
{
  path: "/new-page",
  Component: NewPage
}
```

#### Using API with useAxios
```javascript
import { useState, useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';

const MyComponent = () => {
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

#### Using Authentication
```javascript
import useAuth from '../../Hooks/useAuth';

const MyComponent = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return <div>Welcome {user.email}</div>;
};
```

### Testing Checklist
- [ ] All routes load correctly
- [ ] Authentication works (login/register/logout)
- [ ] Menu filtering works
- [ ] Responsive design on mobile
- [ ] Forms validate properly
- [ ] Error messages display
- [ ] Loading states show
- [ ] API calls succeed

### Common Issues & Solutions

**Issue: Firebase auth not working**
- Check .env.local file exists
- Verify Firebase config values
- Check Firebase console for project status

**Issue: API calls failing**
- Verify backend server is running on port 5000
- Check CORS configuration on backend
- Verify API endpoint URLs

**Issue: Styles not applying**
- Run `npm run dev` to restart Vite
- Check Tailwind/DaisyUI configuration
- Clear browser cache

---

## 📝 Additional Notes

### Important Files to Backup
- `.env.local` - Environment variables
- `firebase.init.js` - Firebase configuration
- `src/Router/Router.jsx` - Route definitions
- `src/index.css` - Theme configuration

### Dependencies to Keep Updated
- React Router (currently v7.13.2)
- Firebase (currently v12.11.0)
- Axios (currently v1.14.0)
- TailwindCSS (currently v4.2.2)

### Performance Considerations
- Images use lazy loading
- Components use React.memo where appropriate
- API calls are debounced/throttled
- Large lists use pagination (to be implemented)

---

## 🎓 Learning Resources

### React Router v7
- [Official Docs](https://reactrouter.com/)

### Firebase Authentication
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)

### TailwindCSS
- [Tailwind Docs](https://tailwindcss.com/docs)

### DaisyUI
- [DaisyUI Components](https://daisyui.com/components/)

---

**Last Updated:** April 6, 2026  
**Version:** 1.0.0  
**Maintainer:** Development Team
