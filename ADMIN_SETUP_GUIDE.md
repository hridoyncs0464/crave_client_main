# Admin User Setup Guide

## 🎯 Problem
The admin login is failing because the admin user doesn't exist in the database or the password hash is incorrect.

## ✅ Solution

### **Option 1: Run the Node.js Script (Recommended)**

This script will automatically create the admin user with the correct password hash.

1. **Make sure your backend server dependencies are installed:**
```bash
npm install bcrypt mysql2
```

2. **Run the script:**
```bash
node generate-admin-hash.js
```

3. **Expected Output:**
```
🔐 Generating password hash for admin user...
✅ Password hash generated successfully!
📋 Hash: $2b$10$...
📡 Connecting to database...
✅ Connected to database
🗑️  Removed existing admin user (if any)
✅ Admin user created successfully!

📝 Admin Credentials:
   Email: admin@crave.com
   Password: admin123
   Role: admin

✅ Verification successful!
   User ID: 1
   Name: Admin User
   Role: admin
   Active: Yes
   Created: 2026-04-06...

🎉 Admin user setup complete!
🔗 You can now login at: http://localhost:5173/admin/login
```

4. **Test the login:**
   - Go to: `http://localhost:5173/admin/login`
   - Email: `admin@crave.com`
   - Password: `admin123`
   - Click "Login to Dashboard"

---

### **Option 2: Manual SQL Method**

If you prefer to do it manually:

1. **Generate password hash in Node.js:**
```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

2. **Copy the generated hash** (it will look like: `$2b$10$...`)

3. **Run this SQL in your MySQL:**
```sql
USE crave_db;

DELETE FROM admin_users WHERE email = 'admin@crave.com';

INSERT INTO admin_users (email, password_hash, name, role, is_active) 
VALUES (
  'admin@crave.com',
  'PASTE_YOUR_GENERATED_HASH_HERE',
  'Admin User',
  'admin',
  TRUE
);

-- Verify
SELECT * FROM admin_users WHERE email = 'admin@crave.com';
```

---

### **Option 3: Use Mock Login (Temporary)**

I've already added a temporary mock login to your frontend that works without the backend:

- Email: `admin@crave.com`
- Password: `admin123`

This will work immediately but won't connect to real data. You'll see a warning banner saying "Mock mode active - Backend not connected".

---

## 🔍 Verify Backend is Running

Make sure your backend server is running:

```bash
# In your backend directory
node server.js
```

You should see:
```
✅ Database connection pool created
✅ Email service ready
✅ Server running on http://localhost:5000
📝 API Documentation: http://localhost:5000/
```

---

## 🧪 Test the Admin Login API

Test if the backend endpoint works:

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crave.com","password":"admin123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@crave.com",
    "role": "admin"
  }
}
```

---

## 🚨 Troubleshooting

### Error: "Login failed. Please try again."
**Cause:** Admin user doesn't exist or password hash is wrong  
**Fix:** Run `node generate-admin-hash.js`

### Error: "Cannot connect to database"
**Cause:** MySQL is not running or credentials are wrong  
**Fix:** Check MySQL is running and credentials in server.js match your setup

### Error: "Module not found: bcrypt"
**Cause:** bcrypt package not installed  
**Fix:** Run `npm install bcrypt`

### Error: "Port 5000 already in use"
**Cause:** Another process is using port 5000  
**Fix:** Kill the process or change PORT in server.js

---

## 📋 Admin Credentials

```
Email: admin@crave.com
Password: admin123
Role: admin
```

**⚠️ IMPORTANT:** Change this password in production!

---

## 🎉 Success Checklist

- [ ] Backend server is running on port 5000
- [ ] MySQL database `crave_db` exists
- [ ] Table `admin_users` exists
- [ ] Admin user created with correct password hash
- [ ] Can login at `/admin/login`
- [ ] Redirects to `/admin/dashboard` after login
- [ ] Can see orders and dashboard stats

---

**Need Help?** Check the console logs in both frontend and backend for error messages.
