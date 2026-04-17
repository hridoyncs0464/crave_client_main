# Backend Setup Instructions

## Current Issues and Solutions

### Issue 1: Multiple API Endpoints Returning 404
**Errors**: 
- `GET http://localhost:5000/api/categories 404 (Not Found)`
- `POST http://localhost:5000/api/reservations 404 (Not Found)`
- Other endpoints may also be commented out

**Cause**: Multiple endpoints are commented out in your backend server.js file.

**Solution**: You need to uncomment ALL the API endpoints in your backend code.

#### Steps to Fix:

1. Open your backend `server.js` file
2. Look for commented-out code (lines with `//` or `/* */`)
3. Find and uncomment these sections:

**Categories Endpoint:**
```javascript
// GET /api/categories - Get all categories
// app.get("/api/categories", async (req, res) => {
//   try {
//     const [categories] = await db.query("SELECT * FROM categories");
//     res.json({ success: true, data: categories });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch categories" });
//   }
// });
```

**Reservations Endpoint:**
```javascript
// POST /api/reservations - Create new reservation
// app.post("/api/reservations", async (req, res) => {
//   const { customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests } = req.body;
//   ...
// });
```

4. Uncomment these lines by removing the `//` or `/* */`
5. Save the file
6. Restart your backend server

#### Expected Endpoint:
```javascript
app.post("/api/reservations", async (req, res) => {
  const { customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests } = req.body;
  
  try {
    const [result] = await db.query(
      "INSERT INTO reservations (customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests]
    );
    
    res.json({
      success: true,
      message: "Reservation request submitted successfully! We'll confirm via email.",
      reservation_id: result.insertId
    });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ success: false, message: "Failed to create reservation" });
  }
});
```

---

### Issue 2: Admin Login Not Working (Real Backend)
**Current Status**: Mock login works, but real backend login fails because admin user doesn't exist in database.

**Solution**: Create the admin user in your MySQL database.

#### Steps to Fix:

1. **Generate the admin password hash**:
   ```bash
   node generate-admin-hash.js
   ```
   
   This will output a bcrypt hash. Copy it.

2. **Create admin user in database**:
   
   Open MySQL and run:
   ```sql
   USE crave_db;
   
   INSERT INTO admin_users (name, email, password_hash, created_at)
   VALUES ('Admin User', 'admin@crave.com', 'PASTE_HASH_HERE', NOW());
   ```
   
   Replace `PASTE_HASH_HERE` with the hash from step 1.

3. **Verify the admin user was created**:
   ```sql
   SELECT * FROM admin_users WHERE email = 'admin@crave.com';
   ```

4. **Test the login**:
   - Go to http://localhost:5173/admin/login
   - Enter: admin@crave.com / admin123
   - Should redirect to admin dashboard

5. **Remove mock login code** (optional, after backend works):
   
   In `src/Pages/Authentication/AdminLogin.jsx`, remove these lines:
   ```javascript
   // TEMPORARY: Mock admin login for testing (remove when backend is ready)
   if (email === "admin@crave.com" && password === "admin123") {
     localStorage.setItem("adminToken", "mock-token-12345");
     localStorage.setItem("adminName", "Admin User");
     localStorage.setItem("adminEmail", "admin@crave.com");
     console.log("✅ Admin logged in successfully (MOCK MODE)");
     setTimeout(() => {
       navigate("/admin/dashboard");
     }, 500);
     return;
   }
   ```

---

### Issue 3: Footer.jsx 500 Error
**Status**: This appears to be a hot reload issue, not a syntax error.

**Solution**: 
1. The Footer.jsx code is syntactically correct
2. Try restarting your Vite dev server:
   ```bash
   npm run dev
   ```
3. Clear browser cache and reload
4. If error persists, check browser console for specific error details

---

## Quick Checklist

- [ ] Backend server is running on http://localhost:5000
- [ ] MySQL database `crave_db` exists and is accessible
- [ ] Uncomment reservation endpoints in backend server.js
- [ ] Restart backend server after uncommenting
- [ ] Run `node generate-admin-hash.js` to get password hash
- [ ] Insert admin user into `admin_users` table with the hash
- [ ] Test reservations at http://localhost:5173/reservations
- [ ] Test admin login at http://localhost:5173/admin/login
- [ ] Restart Vite dev server if Footer error persists

---

## Database Schema Requirements

### Reservations Table:
```sql
CREATE TABLE IF NOT EXISTS reservations (
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

### Admin Users Table:
```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing After Setup

### Test Reservations:
1. Go to http://localhost:5173/reservations
2. Fill out the form with test data
3. Submit the form
4. Should see success message
5. Check MySQL database to verify reservation was saved

### Test Admin Login:
1. Go to http://localhost:5173/admin/login (or triple-click copyright in footer)
2. Enter: admin@crave.com / admin123
3. Should redirect to /admin/dashboard
4. Check localStorage for adminToken

---

## Need Help?

If you're still experiencing issues:

1. Check backend console for error messages
2. Check browser console for frontend errors
3. Verify MySQL connection in backend
4. Ensure all environment variables are set correctly in `.env` file
5. Check that backend port 5000 is not being used by another process

---

## Admin Access Methods

The footer now has TWO ways to access admin login:

1. **Triple-click** on the copyright text "© 2025 Crave Restaurant. All rights reserved."
2. **Click the lock icon** (🔒) in the footer links section

Both methods will navigate to `/admin/login`.
