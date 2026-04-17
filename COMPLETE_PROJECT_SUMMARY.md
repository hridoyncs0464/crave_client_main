# Crave Restaurant - Complete Project Summary

## Project Overview
**Crave** is a full-stack restaurant web application with:
- **Frontend**: React + Vite + Tailwind CSS 4 + DaisyUI
- **Backend**: Node.js + Express + MySQL
- **Database**: MySQL (crave_db)
- **Auth**: Firebase (customers) + JWT (staff/admin)

---

## File Structure

```
crave_client-main/
├── server.js                    # Express backend (all API endpoints)
├── complete_schema.sql        # Complete MySQL database schema
├── schema_updates.sql        # Minimal schema updates
├── init-db.js             # Database initialization script
├── generate-admin-hash.js # Admin password hash generator
├── package.json          # Frontend dependencies
├── package.backend.json  # Backend dependencies
├── vite.config.js        # Vite configuration
├── firebase.init.js     # Firebase initialization
│
├── src/
│   ├── App.jsx              # Main React app
│   ├── main.jsx              # React entry point
│   ├── index.css            # Tailwind + DaisyUI styles
│   ├── App.css             # Global styles
│   │
│   ├── Router/
│   │   └── Router.jsx       # Route definitions
│   │
│   ├── ContextAPI/
│   │   ├── AuthContext.jsx  # Auth context
│   │   ├── AuthProvider.jsx # Auth provider
│   │   └── CartContext.jsx   # Cart context
│   │
│   ├── Hooks/
│   │   ├── useAxios.jsx    # Axios instance
│   │   ├── useAuth.jsx    # Auth hook
│   │   └── useCart.jsx    # Cart hook
│   │
│   ├── Component/
│   │   ├── Header/
│   │   │   ├── Navbar.jsx   # Navigation bar
│   │   │   └── Banner.jsx  # Hero banner
│   │   ├── Footer.jsx          # Footer
│   │   ├── Categories/       # Categories component
│   │   └── Sections/         # Home page sections
│   │
│   └── Pages/
│       ├── Home/               # Homepage
│       ├── Menu/               # Menu page
│       ├── Cart/              # Cart page
│       ├── Order/             # Order & order success
│       ├── Reservations/       # Reservations
│       ├── About/             # About page
│       ├── Authentication/
│       │   ├── Login.jsx       # Customer login (Firebase)
│       │   ├── Register.jsx   # Customer register
│       │   └── AdminLogin.jsx # Staff/Admin login
│       └── Admin/
│           └── AdminDashboard.jsx # Admin dashboard
│
└── public/
    ├── favicon.svg
    └── icons.svg
```

---

## Database Schema (MySQL)

### Tables Created:
| Table | Purpose |
|-------|---------|
| `users` | Firebase customers |
| `staff` | Admin, Chef, Waiter (with JWT) |
| `categories` | Menu categories (10) |
| `menu_items` | Menu items (46) |
| `restaurant_tables` | Restaurant tables (8) |
| `orders` | Customer orders |
| `order_items` | Items in each order |
| `order_tracking` | Order status history |
| `reservations` | Table reservations |

### Staff Roles:
- `admin` - Full dashboard access
- `chef` - Kitchen portal access
- `waiter` - Service portal access

---

## API Endpoints (server.js)

### Public Endpoints:
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/` | Health check |
| GET | `/api/categories` | Get all categories |
| GET | `/api/menu` | Get menu items |
| GET | `/api/tables` | Get restaurant tables |
| POST | `/api/reservations` | Create reservation |
| POST | `/api/orders/create` | Create order |
| POST | `/api/staff/login` | Staff login (admin/chef/waiter) |
| POST | `/api/register` | Register Firebase user |

### Protected Endpoints (require JWT):
| Method | Endpoint | Description | Required Role |
|--------|---------|-------------|---------------|
| GET | `/api/staff/me` | Get current staff user | Any staff |
| GET | `/api/orders` | Get all orders | Any staff |
| GET | `/api/orders/:id` | Get order details | Any staff |
| PUT | `/api/orders/:id/status` | Update order status | Chef/Waiter |
| GET | `/api/reservations` | Get reservations | Staff |
| GET | `/api/admin/dashboard` | Dashboard stats | Admin |
| GET | `/api/admin/staff` | Get all staff | Admin |
| POST | `/api/admin/staff` | Add new staff | Admin |
| PUT | `/api/admin/staff/:id/toggle` | Toggle staff status | Admin |
| DELETE | `/api/admin/staff/:id` | Delete staff | Admin |
| PUT | `/api/admin/menu/:id` | Update menu item | Admin |

---

## Authentication Flow

| User Type | Login Via | Credentials | Redirect |
|----------|-----------|-------------|-----------|
| Customer | Navbar login (Firebase) | Google/Email | Homepage |
| Chef | /admin/login | MySQL staff table | /staff/orders |
| Waiter | /admin/login | MySQL staff table | /staff/orders |
| Admin | /admin/login | MySQL staff table | /admin/dashboard |

---

## Login Credentials

### Admin:
- **URL**: `/admin/login`
- **Email**: `admin@crave.com`
- **Password**: `admin123`

### To Add Staff (in Admin Dashboard):
1. Login as admin at `/admin/login`
2. Go to **Staff** tab
3. Click **+ Add Staff**
4. Enter: Name, Email, Password, Role (chef/waiter)

---

## How to Run

### 1. Start MySQL
- Ensure MySQL is running
- Run `complete_schema.sql` in MySQL Workbench

### 2. Start Backend
```bash
node server.js
```
Backend runs on: http://localhost:5000

### 3. Start Frontend
```bash
npm run dev
```
Frontend runs on: http://localhost:5173 (or next available port)

---

## Tasks Completed

### Tailwind CSS Fix:
- Installed `@tailwindcss/vite` and `daisyui`
- Fixed tailwindcss resolution error
- Updated `src/index.css` with proper Tailwind 4 syntax

### Backend Setup:
- Created `server.js` with all required API endpoints
- Integrated MySQL connection pool
- Implemented JWT authentication
- Added bcrypt password hashing

### Database Setup:
- Created `complete_schema.sql` with all tables
- Seeded admin user (admin123)
- Added 10 menu categories
- Added 46 menu items
- Added 8 restaurant tables

### Auth System:
- Staff login endpoint (`POST /api/staff/login`)
- Token verification endpoint (`GET /api/staff/me`)
- Admin can add new staff (chef/waiter)
- Role-based routing in frontend

---

## Dependencies

### Frontend (package.json):
- react
- react-dom
- react-router
- firebase
- axios
- react-hook-form
- react-icons
- @tailwindcss/vite
- tailwindcss
- daisyui

### Backend:
- express
- mysql2
- cors
- jsonwebtoken
- bcrypt

---

## Environment Variables

### MySQL (server.js):
```javascript
host: "localhost",
user: "root",
password: "2304064",
database: "crave_db"
```

### JWT:
```javascript
JWT_SECRET: "crave-secret-key-2026"
Token expiry: "12h"
```

---

## Notes

- Staff table uses bcrypt hashing (saltRounds: 10)
- Admin can only add "chef" or "waiter" roles (not admin)
- Chef can only update order status to "preparing" or "ready"
- Waiter can only update order status to "served"
- Customer login uses Firebase (separate from staff table)
- All protected routes require JWT token in Authorization header

---

## End