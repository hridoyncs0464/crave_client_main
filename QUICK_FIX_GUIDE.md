# Quick Fix Guide - Current Issues

## 🚨 Current Problems

1. **Reservations 404 Error** - `/api/reservations` endpoint not found
2. **Admin Login Not Working** - Admin user doesn't exist in database
3. **Footer 500 Error** - Hot reload issue (not a code error)

---

## ⚡ Quick Fixes (5 Minutes)

### Step 1: Test Your Backend
```bash
node test-backend.js
```

This will tell you exactly what's working and what's not.

---

### Step 2: Fix Reservations Endpoint

**In your backend `server.js` file:**

1. Find the commented-out reservation code (look for `// app.post("/api/reservations"`)
2. Uncomment it (remove the `//` or `/* */`)
3. Save the file
4. Restart your backend server

**Example of what to uncomment:**
```javascript
// BEFORE (commented out):
// app.post("/api/reservations", async (req, res) => {
//   ...
// });

// AFTER (uncommented):
app.post("/api/reservations", async (req, res) => {
  ...
});
```

---

### Step 3: Create Admin User

**Run these commands in order:**

```bash
# 1. Generate password hash
node generate-admin-hash.js
```

Copy the hash that's printed.

**2. Open MySQL and run:**
```sql
USE crave_db;

INSERT INTO admin_users (name, email, password_hash, created_at)
VALUES ('Admin User', 'admin@crave.com', 'PASTE_YOUR_HASH_HERE', NOW());
```

Replace `PASTE_YOUR_HASH_HERE` with the hash from step 1.

---

### Step 4: Restart Everything

```bash
# Restart backend
# (In your backend directory)
node server.js

# Restart frontend (if needed)
# (In your frontend directory)
npm run dev
```

---

## ✅ Test Everything Works

### Test Reservations:
1. Go to: http://localhost:5173/reservations
2. Fill out the form
3. Click "Request Reservation"
4. Should see success message ✅

### Test Admin Login:
1. Triple-click on "© 2025 Crave Restaurant" in footer
   OR click the lock icon 🔒
2. Enter:
   - Email: `admin@crave.com`
   - Password: `admin123`
3. Should redirect to admin dashboard ✅

---

## 🔍 Still Having Issues?

### Backend Not Starting?
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <process_id> /F
```

### Database Connection Error?
Check your backend `.env` file has:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=2304064
DB_NAME=crave_db
```

### Frontend Not Connecting?
Check `src/Hooks/useAxios.jsx` has:
```javascript
baseURL: "http://localhost:5000"
```

---

## 📁 Files You Need to Edit

1. **Backend server.js** - Uncomment reservation endpoints
2. **MySQL database** - Add admin user with hash
3. That's it! Everything else is already set up.

---

## 🎯 Expected Results

After following these steps:

✅ Reservations form works and saves to database  
✅ Admin login works with real backend authentication  
✅ Admin dashboard is accessible  
✅ No 404 errors in console  
✅ No 500 errors in console  

---

## 📚 Detailed Documentation

For more details, see:
- `BACKEND_SETUP_INSTRUCTIONS.md` - Complete backend setup
- `ADMIN_SETUP_GUIDE.md` - Admin user creation details
- `AUTHENTICATION_GUIDE.md` - How authentication works
- `PROJECT_DOCUMENTATION.md` - Full project overview

---

## 💡 Pro Tips

1. **Admin Access is Hidden**: Triple-click copyright text or click lock icon in footer
2. **Mock Login Works**: Admin login has a fallback mock mode for testing
3. **Two Auth Systems**: Regular users use Firebase, admin uses JWT
4. **Database Tables**: Make sure `reservations` and `admin_users` tables exist

---

## 🆘 Emergency Fallback

If backend is completely broken, the frontend will still work:
- Admin login has mock mode (already working)
- Reservations will show error but won't crash
- Rest of the app works normally

You can develop frontend features while fixing backend issues.
