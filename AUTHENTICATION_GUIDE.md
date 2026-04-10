# Crave Restaurant - Authentication Guide

## 🔐 Two Separate Authentication Systems

Your application has **TWO DIFFERENT** login systems:

---

## 1️⃣ Regular User Authentication (Firebase)

### **Login Page:** `/login`

### **Technology:** Firebase Authentication

### **How to Access:**
- Navigate to: `http://localhost:5173/login`
- Or click "Login" button in the navbar

### **Credentials:**
- Any user registered through the `/register` page
- Google OAuth accounts
- **Example:**
  - Email: `user@example.com`
  - Password: `password123` (if registered)

### **Features:**
- Email/Password authentication
- Google OAuth login
- User registration
- Password reset (if implemented)

### **What Users Can Do:**
- Browse menu
- Add items to cart
- Place orders
- Make reservations
- View order history
- Update profile

### **Backend:**
- Firebase Authentication handles user auth
- User data stored in MySQL via `/api/register` and `/api/verify-user`

---

## 2️⃣ Admin Authentication (Backend API)

### **Login Page:** `/admin/login`

### **Technology:** Backend API with JWT Tokens

### **How to Access:**
- Navigate to: `http://localhost:5173/admin/login`
- Or click "Admin Login →" link at the bottom of the regular login page

### **Admin Credentials:**
```
Email: admin@crave.com
Password: admin123
```

### **Features:**
- JWT token-based authentication
- Token stored in localStorage
- Protected admin routes
- Auto-redirect if not authenticated

### **What Admins Can Do:**
- View admin dashboard
- Manage all orders
- Update order status
- View order statistics
- View customer information
- Manage reservations (if implemented)

### **Backend:**
- API Endpoint: `POST /api/admin/login`
- Returns JWT token
- Token required for all admin API calls

### **Token Storage:**
```javascript
localStorage.setItem("adminToken", token);
localStorage.setItem("adminName", name);
localStorage.setItem("adminEmail", email);
```

---

## 🚨 Common Mistakes

### ❌ **WRONG:** Using admin credentials on regular login page
```
URL: /login
Email: admin@crave.com
Password: admin123
Result: ❌ ERROR - This account doesn't exist in Firebase
```

### ✅ **CORRECT:** Using admin credentials on admin login page
```
URL: /admin/login
Email: admin@crave.com
Password: admin123
Result: ✅ SUCCESS - Redirects to /admin/dashboard
```

---

## 🔄 Authentication Flow Comparison

### Regular User Flow:
```
1. User visits /login
2. Enters email/password or uses Google
3. Firebase authenticates
4. User data synced with MySQL
5. Redirects to /
6. Can browse, order, make reservations
```

### Admin Flow:
```
1. Admin visits /admin/login
2. Enters admin credentials
3. Backend API validates
4. JWT token returned and stored
5. Redirects to /admin/dashboard
6. Can manage orders and operations
```

---

## 🛠️ How to Create New Admin Account

### Option 1: Direct Database Insert (Recommended)
```sql
INSERT INTO admins (name, email, password_hash, role, created_at)
VALUES (
  'Admin Name',
  'admin@crave.com',
  '$2b$10$hashedPasswordHere',  -- Use bcrypt to hash 'admin123'
  'admin',
  NOW()
);
```

### Option 2: Backend API Endpoint (If Available)
```javascript
POST /api/admin/register
Body: {
  "name": "Admin Name",
  "email": "admin@crave.com",
  "password": "admin123"
}
```

---

## 🔒 Security Notes

### Regular Users:
- ✅ Passwords hashed by Firebase
- ✅ Secure OAuth flow
- ✅ Email verification available
- ✅ Password reset available

### Admin:
- ✅ JWT tokens with expiration
- ✅ Passwords hashed with bcrypt
- ✅ Token validation on every request
- ✅ Protected routes with middleware
- ⚠️ **Important:** Change default admin password in production!

---

## 📋 Quick Reference

| Feature | Regular User | Admin |
|---------|-------------|-------|
| **Login URL** | `/login` | `/admin/login` |
| **Auth Method** | Firebase | JWT Token |
| **Registration** | `/register` | Database/API |
| **Dashboard** | N/A | `/admin/dashboard` |
| **Logout** | Navbar dropdown | Dashboard button |
| **Token Storage** | Firebase SDK | localStorage |
| **Password Reset** | Firebase | Contact manager |

---

## 🐛 Troubleshooting

### Problem: "Can't login with admin@crave.com on /login"
**Solution:** Use `/admin/login` instead

### Problem: "Token expired" on admin dashboard
**Solution:** Login again at `/admin/login`

### Problem: "Unauthorized" error on admin API calls
**Solution:** Check if `adminToken` exists in localStorage

### Problem: Admin dashboard redirects to login
**Solution:** Token might be expired or invalid, login again

---

## 🔗 Navigation Links

### For Users:
- Home: `/`
- Login: `/login`
- Register: `/register`
- Menu: `/menu`
- Cart: `/cart`
- Orders: `/order`

### For Admins:
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`

---

## 💡 Tips

1. **Regular users cannot access admin dashboard** - Different authentication systems
2. **Admins should use admin login page** - Not the regular login
3. **Keep admin credentials secure** - Change default password
4. **Test both systems separately** - They don't interfere with each other
5. **Clear localStorage if switching between admin accounts** - Prevents token conflicts

---

**Last Updated:** April 6, 2026  
**Status:** Active Development
