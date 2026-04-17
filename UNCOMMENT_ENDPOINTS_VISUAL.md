# Visual Guide: How to Uncomment Endpoints

## The Problem in Pictures

### What You See in Browser:
```
❌ Categories section shows error
❌ Menu page shows error  
❌ Reservations form shows error
```

### What You See in Console:
```
GET http://localhost:5000/api/categories 404 (Not Found)
Error fetching categories: Request failed with status code 404
```

---

## The Solution: Uncomment Your Backend

### Step 1: Open Your Backend File

Open your backend `server.js` file in your code editor.

---

### Step 2: Find the Commented Endpoints

Search for `// app.get` or `// app.post` in your file.

You'll find something like this:

```javascript
// ============================================
// API ENDPOINTS (COMMENTED OUT)
// ============================================

// GET /api/categories
// app.get("/api/categories", async (req, res) => {
//   try {
//     const [categories] = await db.query("SELECT * FROM categories");
//     res.json({ success: true, data: categories });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch categories" });
//   }
// });

// GET /api/menu
// app.get("/api/menu", async (req, res) => {
//   try {
//     const [items] = await db.query("SELECT * FROM menu_items");
//     res.json({ success: true, data: items });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch menu" });
//   }
// });

// POST /api/reservations
// app.post("/api/reservations", async (req, res) => {
//   const { customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests } = req.body;
//   try {
//     const [result] = await db.query(
//       "INSERT INTO reservations (customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests]
//     );
//     res.json({
//       success: true,
//       message: "Reservation request submitted successfully!",
//       reservation_id: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to create reservation" });
//   }
// });
```

---

## Method 1: Manual Uncomment (Line by Line)

### For Categories Endpoint:

**BEFORE:**
```javascript
// GET /api/categories
// app.get("/api/categories", async (req, res) => {
//   try {
//     const [categories] = await db.query("SELECT * FROM categories");
//     res.json({ success: true, data: categories });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch categories" });
//   }
// });
```

**AFTER (Remove the `//` from each line):**
```javascript
// GET /api/categories
app.get("/api/categories", async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
});
```

### For Menu Endpoint:

**BEFORE:**
```javascript
// GET /api/menu
// app.get("/api/menu", async (req, res) => {
//   try {
//     const [items] = await db.query("SELECT * FROM menu_items");
//     res.json({ success: true, data: items });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch menu" });
//   }
// });
```

**AFTER:**
```javascript
// GET /api/menu
app.get("/api/menu", async (req, res) => {
  try {
    const [items] = await db.query("SELECT * FROM menu_items");
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch menu" });
  }
});
```

### For Reservations Endpoint:

**BEFORE:**
```javascript
// POST /api/reservations
// app.post("/api/reservations", async (req, res) => {
//   const { customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests } = req.body;
//   try {
//     const [result] = await db.query(
//       "INSERT INTO reservations (customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [customer_name, customer_email, customer_phone, number_of_guests, reservation_date, reservation_time, special_requests]
//     );
//     res.json({
//       success: true,
//       message: "Reservation request submitted successfully!",
//       reservation_id: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to create reservation" });
//   }
// });
```

**AFTER:**
```javascript
// POST /api/reservations
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
    res.status(500).json({ success: false, message: "Failed to create reservation" });
  }
});
```

---

## Method 2: Quick Find & Replace (Fastest!)

### Step 1: Open Find & Replace
- Press **Ctrl+H** in your editor
- Or go to Edit → Find and Replace

### Step 2: Enter Find Pattern
In the "Find" field, type:
```
// app.
```

### Step 3: Enter Replace Pattern
In the "Replace" field, type:
```
app.
```

### Step 4: Replace All
- Click "Replace All" button
- This will uncomment all endpoints at once!

### Result:
All lines starting with `// app.` will become `app.`

---

## Step 3: Save the File

- Press **Ctrl+S** to save
- Or go to File → Save

---

## Step 4: Restart Your Backend

### In your backend terminal:

1. **Stop the current backend** (if running):
   ```bash
   Ctrl+C
   ```

2. **Start the backend again**:
   ```bash
   node server.js
   ```

3. **You should see**:
   ```
   Server running on port 5000
   Database connected
   ```

---

## Step 5: Test in Browser

### Test 1: Home Page
1. Go to http://localhost:5173
2. Scroll down to "Categories" section
3. Should see category cards ✅
4. No error messages ✅

### Test 2: Menu Page
1. Go to http://localhost:5173/menu
2. Should see menu items ✅
3. No error messages ✅

### Test 3: Reservations Page
1. Go to http://localhost:5173/reservations
2. Fill out the form
3. Click "Request Reservation"
4. Should see success message ✅

---

## Verification Checklist

- [ ] Opened `server.js` file
- [ ] Found commented endpoints (lines with `// app.`)
- [ ] Uncommented all endpoints (removed `//`)
- [ ] Saved the file (Ctrl+S)
- [ ] Stopped backend (Ctrl+C)
- [ ] Restarted backend (`node server.js`)
- [ ] Backend shows "Server running on port 5000"
- [ ] Refreshed browser (F5)
- [ ] Categories load on home page
- [ ] Menu page shows items
- [ ] No 404 errors in console
- [ ] All tests pass ✅

---

## What Each Endpoint Does

| Endpoint | Method | Purpose | Frontend Uses |
|----------|--------|---------|----------------|
| `/api/categories` | GET | Get all food categories | Home page Categories section |
| `/api/menu` | GET | Get all menu items | Menu page |
| `/api/reservations` | POST | Create new reservation | Reservations form |
| `/api/admin/login` | POST | Admin authentication | Admin login page |

---

## Common Issues & Solutions

### Issue: Still Seeing 404 Error

**Solution 1**: Make sure you restarted the backend
- Stop backend: Ctrl+C
- Start backend: `node server.js`
- Wait for "Server running on port 5000" message

**Solution 2**: Make sure endpoints are really uncommented
- Open `server.js` again
- Search for `app.get("/api/categories"`
- Make sure it's NOT preceded by `//`

**Solution 3**: Clear browser cache
- Press Ctrl+Shift+Delete
- Select "Cached images and files"
- Click "Clear"
- Refresh page

### Issue: Backend Won't Start

**Solution**: Check for syntax errors
- Look for missing brackets `{}`
- Look for missing semicolons `;`
- Look for missing quotes `""`
- Check backend console for error messages

### Issue: Database Connection Error

**Solution**: Make sure MySQL is running
- Check MySQL is started
- Check database name is `crave_db`
- Check credentials in backend `.env` file

---

## Before & After Comparison

### BEFORE (Commented Out):
```
❌ Home page: Categories section shows error
❌ Menu page: Shows error
❌ Reservations: Form shows error
❌ Console: Multiple 404 errors
```

### AFTER (Uncommented):
```
✅ Home page: Categories load beautifully
✅ Menu page: All items display
✅ Reservations: Form works perfectly
✅ Console: No errors
```

---

## Summary

1. **Open** `server.js`
2. **Find** commented endpoints (`// app.`)
3. **Uncomment** them (remove `//`)
4. **Save** file (Ctrl+S)
5. **Restart** backend (Ctrl+C, then `node server.js`)
6. **Test** in browser
7. **Verify** no 404 errors

**Time**: 2-5 minutes  
**Difficulty**: Easy  
**Result**: All 404 errors fixed ✅

---

## Need Help?

1. Check `ERRORS_EXPLAINED.md` for detailed explanation
2. Check `FIX_404_ERRORS.md` for troubleshooting
3. Run `node test-backend.js` to verify endpoints
4. Check backend console for error messages
