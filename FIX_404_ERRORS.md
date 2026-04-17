# Fix All 404 Errors - Complete Guide

## 🚨 The Problem

You're seeing multiple 404 errors in the console:
```
GET http://localhost:5000/api/categories 404 (Not Found)
POST http://localhost:5000/api/reservations 404 (Not Found)
```

This means your backend has these endpoints commented out.

---

## ✅ The Solution

### Step 1: Open Your Backend Server File

Open your backend `server.js` file (wherever your backend code is located).

---

### Step 2: Find All Commented Endpoints

Search for commented-out code. Look for lines that start with `//` or are inside `/* */` blocks.

You should find something like this:

```javascript
// ============================================
// COMMENTED OUT ENDPOINTS - UNCOMMENT THESE
// ============================================

// GET /api/categories
// app.get("/api/categories", async (req, res) => {
//   ...
// });

// POST /api/reservations
// app.post("/api/reservations", async (req, res) => {
//   ...
// });

// GET /api/menu
// app.get("/api/menu", async (req, res) => {
//   ...
// });

// And more...
```

---

### Step 3: Uncomment the Endpoints

Remove the `//` from the beginning of each line to uncomment them.

**BEFORE (commented):**
```javascript
// app.get("/api/categories", async (req, res) => {
//   try {
//     const [categories] = await db.query("SELECT * FROM categories");
//     res.json({ success: true, data: categories });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch categories" });
//   }
// });
```

**AFTER (uncommented):**
```javascript
app.get("/api/categories", async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
});
```

---

### Step 4: Uncomment ALL These Endpoints

Make sure to uncomment these key endpoints:

1. **GET /api/categories** - Fetches all food categories
2. **GET /api/menu** - Fetches all menu items
3. **POST /api/reservations** - Creates a new reservation
4. **POST /api/admin/login** - Admin login (should already be uncommented)
5. **GET /api/orders** - Fetches orders (if exists)
6. **POST /api/orders** - Creates new order (if exists)

---

### Step 5: Save and Restart Backend

1. Save the `server.js` file
2. Stop your backend server (Ctrl+C)
3. Restart it:
   ```bash
   node server.js
   ```
   or
   ```bash
   npm start
   ```

---

## 🧪 Test the Fixes

### Test 1: Check Categories Load
1. Go to http://localhost:5173 (home page)
2. Look for the "Categories" section
3. Should show category cards (Starters, Soups & Salads, etc.)
4. No error in console ✅

### Test 2: Check Menu Loads
1. Go to http://localhost:5173/menu
2. Should show menu items
3. No 404 errors in console ✅

### Test 3: Check Reservations Form
1. Go to http://localhost:5173/reservations
2. Fill out the form
3. Click "Request Reservation"
4. Should see success message ✅

---

## 🔍 Verify with Test Script

Run the test script to verify all endpoints are working:

```bash
node test-backend.js
```

This will show you:
- ✅ Which endpoints are working
- ❌ Which endpoints are still broken
- ⚠️ Which endpoints have issues

---

## 📋 Common Endpoints to Uncomment

Here's what each endpoint should look like when uncommented:

### Categories Endpoint
```javascript
app.get("/api/categories", async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Categories error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
});
```

### Menu Endpoint
```javascript
app.get("/api/menu", async (req, res) => {
  try {
    const [items] = await db.query("SELECT * FROM menu_items");
    res.json({ success: true, data: items });
  } catch (error) {
    console.error("Menu error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch menu" });
  }
});
```

### Reservations Endpoint
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
      message: "Reservation request submitted successfully!",
      reservation_id: result.insertId
    });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ success: false, message: "Failed to create reservation" });
  }
});
```

---

## 🆘 Still Getting 404 Errors?

### Check 1: Backend is Running
```bash
# Check if backend is running on port 5000
netstat -ano | findstr :5000
```

If nothing shows up, your backend isn't running. Start it:
```bash
node server.js
```

### Check 2: Endpoints Are Actually Uncommented
- Open `server.js` again
- Search for `app.get("/api/categories"`
- Make sure it's NOT preceded by `//`
- Make sure it's NOT inside a `/* */` block

### Check 3: Backend Restarted
- Stop backend (Ctrl+C)
- Wait 2 seconds
- Start it again: `node server.js`
- Check console for any errors

### Check 4: Database Connection
- Make sure MySQL is running
- Check backend console for database errors
- Verify database name is `crave_db`
- Verify tables exist: `categories`, `menu_items`, `reservations`

### Check 5: Frontend is Calling Correct URL
- Check `src/Hooks/useAxios.jsx`
- Should have: `baseURL: "http://localhost:5000"`
- If different, update it

---

## 📊 Expected Results After Fixing

✅ Home page loads with categories section  
✅ Menu page shows all menu items  
✅ Reservations form works  
✅ Admin login works  
✅ No 404 errors in console  
✅ No error messages on pages  

---

## 🎯 Quick Checklist

- [ ] Opened backend `server.js` file
- [ ] Found commented-out endpoints
- [ ] Uncommented all endpoints
- [ ] Saved the file
- [ ] Restarted backend server
- [ ] Tested categories section on home page
- [ ] Tested menu page
- [ ] Tested reservations form
- [ ] Ran `node test-backend.js` to verify
- [ ] All 404 errors are gone ✅

---

## 💡 Pro Tips

1. **Use Find & Replace**: In your editor, use Find & Replace to quickly uncomment code
   - Find: `// app.`
   - Replace: `app.`

2. **Check Backend Console**: Always check your backend console for error messages

3. **Restart Everything**: If something doesn't work, restart both backend and frontend

4. **Clear Browser Cache**: Sometimes browser caches old 404 responses
   - Press Ctrl+Shift+Delete to open cache clearing options

5. **Check Network Tab**: In browser DevTools, go to Network tab to see actual API responses

---

## 📞 Need More Help?

1. Run `node test-backend.js` to diagnose issues
2. Check backend console for error messages
3. Check browser console for frontend errors
4. Verify MySQL database is running
5. Check that all tables exist in database

---

**Status**: All 404 errors are caused by commented-out backend endpoints  
**Solution**: Uncomment the endpoints in server.js and restart backend  
**Time to Fix**: 2-5 minutes
