# Crave Restaurant - Complete Project Context

**Last Updated**: Current Session  
**Project Type**: Full-stack Restaurant Web Application  
**Status**: Frontend Complete, Backend Needs Configuration

---

## Project Overview

Crave is a modern restaurant web application with user authentication, menu browsing, cart functionality, reservations, and admin management. The project uses React for frontend and Node.js/Express with MySQL for backend.

---

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + DaisyUI
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Authentication**: Firebase (for regular users)

### Backend (Separate Repository)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: 
  - Firebase (regular users)
  - JWT (admin users)
- **Password Hashing**: bcrypt

### Database
- **System**: MySQL
- **Database Name**: `crave_db`
- **Credentials**: 
  - User: `root`
  - Password: `2304064`
  - Host: `localhost`

---

## Project Structure

```
crave-restaurant/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── Component/
│   │   ├── Categories/
│   │   │   └── Categories.jsx          # Food categories display
│   │   ├── Header/
│   │   │   ├── Banner.jsx              # Hero banner
│   │   │   └── Navbar.jsx              # Navigation bar
│   │   ├── Sections/
│   │   │   ├── Reviews.jsx             # Customer reviews
│   │   │   └── WhyChooseUs.jsx         # Features section
│   │   └── Footer.jsx                  # Footer with hidden admin access
│   │
│   ├── ContextAPI/
│   │   ├── AuthContext.jsx             # Authentication context
│   │   ├── AuthProvider.jsx            # Auth provider wrapper
│   │   └── CartContext.jsx             # Shopping cart context
│   │
│   ├── Hooks/
│   │   ├── useAuth.jsx                 # Auth hook
│   │   ├── useAxios.jsx                # Axios instance (baseURL: http://localhost:5000)
│   │   └── useCart.jsx                 # Cart hook
│   │
│   ├── Layout/
│   │   └── Layout.jsx                  # Main layout wrapper
│   │
│   ├── Pages/
│   │   ├── About/
│   │   │   └── About.jsx               # About Us page (modern design)
│   │   ├── Admin/
│   │   │   └── AdminDashboard.jsx      # Admin dashboard
│   │   ├── Authentication/
│   │   │   ├── AdminLogin.jsx          # Admin login (mock + real)
│   │   │   ├── Login.jsx               # User login (Firebase)
│   │   │   └── Register.jsx            # User registration (Firebase)
│   │   ├── Cart/
│   │   │   └── Cart.jsx                # Shopping cart page
│   │   ├── Home/
│   │   │   └── Home.jsx                # Home page
│   │   ├── Menu/
│   │   │   └── Menu.jsx                # Menu page
│   │   ├── Order/
│   │   │   ├── Order.jsx               # Order page
│   │   │   └── OrderSuccess.jsx        # Order confirmation
│   │   └── Reservations/
│   │       └── Reservations.jsx        # Reservations form
│   │
│   ├── Router/
│   │   └── Router.jsx                  # Route configuration
│   │
│   ├── App.jsx                         # Main app component
│   ├── App.css                         # App styles
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
│
├── .env.local                          # Firebase config
├── .gitignore
├── eslint.config.js
├── firebase.init.js                    # Firebase initialization
├── generate-admin-hash.js              # Script to generate admin password hash
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
│
├── Documentation Files:
├── PROJECT_DOCUMENTATION.md            # Original project docs
├── PROJECT_FILE_STRUCTURE.md           # File structure details
├── AUTHENTICATION_GUIDE.md             # Auth system explanation
├── ADMIN_SETUP_GUIDE.md                # Admin user setup
├── BACKEND_SETUP_INSTRUCTIONS.md       # Backend configuration
├── QUICK_FIX_GUIDE.md                  # Quick fixes
├── CURRENT_STATUS.md                   # Project status
├── FIX_404_ERRORS.md                   # 404 error solutions
├── ERRORS_EXPLAINED.md                 # Error explanations
├── UNCOMMENT_ENDPOINTS_VISUAL.md       # Visual guide for backend
├── ERROR_SOLUTION.md                   # Quick error solution
├── test-backend.js                     # Backend testing script
└── CREATE_ADMIN_USER.sql               # SQL for admin user
```

---

## Routes Configuration

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | Home | Landing page with hero, categories, reviews | No |
| `/menu` | Menu | Browse menu items by category | No |
| `/cart` | Cart | Shopping cart | No |
| `/order` | Order | Checkout page | Yes (User) |
| `/order-success` | OrderSuccess | Order confirmation | Yes (User) |
| `/reservations` | Reservations | Table reservation form | No |
| `/about` | About | About Us page | No |
| `/login` | Login | User login (Firebase) | No |
| `/register` | Register | User registration (Firebase) | No |
| `/admin/login` | AdminLogin | Admin login (JWT) | No |
| `/admin/dashboard` | AdminDashboard | Admin panel | Yes (Admin) |

---

## Authentication System

### Two Separate Auth Systems:

#### 1. Regular Users (Firebase)
- **Login Page**: `/login`
- **Method**: Firebase Authentication
- **Storage**: Firebase handles sessions
- **Used For**: Regular customers
- **Features**: Email/password authentication

#### 2. Admin Users (JWT)
- **Login Page**: `/admin/login`
- **Method**: JWT tokens from backend API
- **Storage**: localStorage (adminToken, adminName, adminEmail)
- **Used For**: Restaurant administrators
- **Features**: Backend authentication with bcrypt
- **Mock Mode**: Currently has fallback mock login for testing

### Admin Access Methods:
1. **Triple-click** on copyright text in footer
2. **Click lock icon** (🔒) in footer
3. **Direct URL**: http://localhost:5173/admin/login

### Admin Credentials:
- Email: `admin@crave.com`
- Password: `admin123`

---

## API Endpoints (Backend)

### Base URL: `http://localhost:5000`

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/categories` | GET | Fetch all food categories | ⚠️ Commented out |
| `/api/menu` | GET | Fetch all menu items | ⚠️ Commented out |
| `/api/reservations` | POST | Create new reservation | ⚠️ Commented out |
| `/api/admin/login` | POST | Admin authentication | ⚠️ Needs admin user in DB |
| `/api/orders` | GET/POST | Order management | ⚠️ May be commented out |

**Current Issue**: All endpoints are commented out in backend `server.js` file and need to be uncommented.

---

## Database Schema

### Tables:

#### 1. categories
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. menu_items
```sql
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### 3. reservations
```sql
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  number_of_guests INT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  special_requests TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. admin_users
```sql
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Current Issues & Status

### ✅ Working Features:
- Frontend UI completely built
- All pages designed and functional
- Firebase authentication for users
- Cart functionality
- Responsive design
- Hidden admin access in footer
- Mock admin login (for testing)

### ⚠️ Issues to Fix:

#### 1. Backend API Endpoints (404 Errors)
**Problem**: All API endpoints are commented out in backend `server.js`

**Errors Seen**:
```
GET http://localhost:5000/api/categories 404 (Not Found)
POST http://localhost:5000/api/reservations 404 (Not Found)
```

**Solution**: 
- Open backend `server.js`
- Uncomment all endpoints (remove `//` from lines starting with `// app.get` or `// app.post`)
- Save and restart backend

**Quick Fix**:
```
Find: // app.
Replace: app.
```

#### 2. Admin User Not in Database
**Problem**: Admin user doesn't exist in MySQL database

**Solution**:
1. Run: `node generate-admin-hash.js`
2. Copy the hash
3. Run SQL:
```sql
INSERT INTO admin_users (name, email, password_hash, created_at)
VALUES ('Admin User', 'admin@crave.com', 'PASTE_HASH_HERE', NOW());
```

---

## Environment Variables

### Frontend (.env.local)
```env
VITE_FIREBASE_API_KEY=AIzaSyChghgl7trwjnOXYacm1al2zyo_5KaMVhA
VITE_FIREBASE_AUTH_DOMAIN=crave-auth-c234f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=crave-auth-c234f
VITE_FIREBASE_STORAGE_BUCKET=crave-auth-c234f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=881299738259
VITE_FIREBASE_APP_ID=1:881299738259:web:133a5a647193a9b9c9076
```

### Backend (.env) - Expected
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=2304064
DB_NAME=crave_db
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

---

## Key Components Explained

### Categories.jsx
- Fetches categories from `/api/categories`
- Displays category cards with images
- Navigates to menu with category filter
- Currently showing 404 error (backend endpoint commented out)

### Reservations.jsx
- Form for table reservations
- Validates input with React Hook Form
- Posts to `/api/reservations`
- Shows success/error messages
- Currently showing 404 error (backend endpoint commented out)

### AdminLogin.jsx
- Has TWO login modes:
  1. **Mock mode**: Bypasses backend for testing
  2. **Real mode**: Calls `/api/admin/login`
- Stores JWT token in localStorage
- Redirects to `/admin/dashboard` on success

### Footer.jsx
- Hidden admin access features:
  - Triple-click on copyright text
  - Click lock icon
- Shows click counter tooltip
- Navigates to `/admin/login`

---

## Development Workflow

### Starting the Project:

#### Frontend:
```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

#### Backend (separate folder):
```bash
npm install
node server.js
# Runs on http://localhost:5000
```

#### Database:
```bash
# Make sure MySQL is running
# Database: crave_db
# User: root
# Password: 2304064
```

---

## Testing & Verification

### Test Backend Connectivity:
```bash
node test-backend.js
```

This script tests:
- Backend health check
- Categories endpoint
- Reservations endpoint
- Admin login endpoint

### Manual Testing:
1. **Home Page**: http://localhost:5173 - Should show categories
2. **Menu Page**: http://localhost:5173/menu - Should show menu items
3. **Reservations**: http://localhost:5173/reservations - Form should work
4. **Admin Login**: Triple-click footer copyright or click lock icon

---

## Common Commands

### Frontend:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend:
```bash
node server.js                    # Start server
node generate-admin-hash.js       # Generate admin password hash
node test-backend.js              # Test API endpoints
```

### Database:
```bash
mysql -u root -p                  # Connect to MySQL
USE crave_db;                     # Select database
SHOW TABLES;                      # List tables
SELECT * FROM categories;         # View categories
```

---

## Important Notes for Claude AI

1. **Backend is Separate**: The backend code is in a different folder/repository. Frontend can only be modified in this workspace.

2. **404 Errors**: All 404 errors are caused by commented-out endpoints in backend `server.js`. Frontend code is correct.

3. **Two Auth Systems**: Don't confuse Firebase auth (users) with JWT auth (admin). They are completely separate.

4. **Mock Login**: AdminLogin.jsx has a mock mode that works without backend. This is intentional for testing.

5. **Hidden Admin Access**: Admin login is intentionally hidden in footer (triple-click or lock icon).

6. **Database Required**: Backend needs MySQL running with `crave_db` database and proper tables.

7. **Admin User**: Must be manually created in database using `generate-admin-hash.js` script.

---

## Quick Reference

### Ports:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MySQL: `localhost:3306`

### Credentials:
- Admin Email: `admin@crave.com`
- Admin Password: `admin123`
- Database User: `root`
- Database Password: `2304064`

### Key Files:
- Axios Config: `src/Hooks/useAxios.jsx`
- Routes: `src/Router/Router.jsx`
- Firebase: `firebase.init.js`
- Admin Hash Generator: `generate-admin-hash.js`

---

## Next Steps for Development

1. ✅ Frontend is complete
2. ⚠️ Uncomment backend endpoints
3. ⚠️ Create admin user in database
4. ⚠️ Test all API endpoints
5. ⚠️ Remove mock login from AdminLogin.jsx (optional)
6. 🔜 Add more admin features (order management, reservation approval)
7. 🔜 Deploy to production

---

## Documentation Files Available

All these files are in the workspace for reference:
- `PROJECT_DOCUMENTATION.md` - Original comprehensive docs
- `PROJECT_FILE_STRUCTURE.md` - Detailed file structure
- `AUTHENTICATION_GUIDE.md` - Auth system explained
- `ADMIN_SETUP_GUIDE.md` - Admin user setup
- `BACKEND_SETUP_INSTRUCTIONS.md` - Backend config
- `FIX_404_ERRORS.md` - How to fix 404 errors
- `ERRORS_EXPLAINED.md` - Error explanations
- `UNCOMMENT_ENDPOINTS_VISUAL.md` - Visual guide
- `QUICK_FIX_GUIDE.md` - Quick solutions
- `CURRENT_STATUS.md` - Project status
- `ERROR_SOLUTION.md` - Quick error fix

---

**Project Status**: Frontend 100% complete, Backend needs endpoint uncommenting and admin user creation  
**Estimated Time to Fix**: 5-10 minutes  
**Main Blocker**: Backend endpoints commented out
