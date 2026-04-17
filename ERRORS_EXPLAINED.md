# Understanding Your 404 Errors

## What You're Seeing

```
GET http://localhost:5000/api/categories:1  Failed to load resource: the server responded with a status of 404 (Not Found)
Categories.jsx:37 Error fetching categories: Request failed with status code 404
```

---

## What This Means

### Breaking It Down:

1. **GET http://localhost:5000/api/categories** 
   - Your frontend is trying to fetch categories from the backend
   - The URL is correct
   - The backend is running (otherwise you'd get "connection refused")

2. **404 (Not Found)**
   - The backend received the request
   - But the endpoint `/api/categories` doesn't exist
   - This happens when the endpoint is commented out

3. **Categories.jsx:37**
   - This is where the error occurred in your code
   - Line 37 is the `fetchCategories` function

---

## Why It's Happening

Your backend `server.js` file has all the API endpoints commented out.

### Example:

**In your backend server.js:**
```javascript
// This endpoint is commented out (notice the //)
// app.get("/api/categories", async (req, res) => {
//   const [categories] = await db.query("SELECT * FROM categories");
//   res.json({ success: true, data: categories });
// });
```

When your frontend tries to call this endpoint, the backend says "I don't have that endpoint" → 404 error.

---

## The Fix (Simple!)

### Option 1: Manual Uncomment

Open `server.js` and remove the `//` from the beginning of each line:

```javascript
// BEFORE:
// app.get("/api/categories", async (req, res) => {
//   const [categories] = await db.query("SELECT * FROM categories");
//   res.json({ success: true, data: categories });
// });

// AFTER:
app.get("/api/categories", async (req, res) => {
  const [categories] = await db.query("SELECT * FROM categories");
  res.json({ success: true, data: categories });
});
```

### Option 2: Quick Find & Replace

In your editor:
1. Press Ctrl+H (Find & Replace)
2. Find: `// app.`
3. Replace: `app.`
4. Click "Replace All"
5. Save file
6. Restart backend

---

## What Endpoints Need Uncommenting

These are the endpoints your frontend is calling:

| Endpoint | Method | Used By | Status |
|----------|--------|---------|--------|
| `/api/categories` | GET | Home page | ❌ 404 |
| `/api/menu` | GET | Menu page | ❌ 404 |
| `/api/reservations` | POST | Reservations form | ❌ 404 |
| `/api/admin/login` | POST | Admin login | ⚠️ Needs admin user |

---

## Step-by-Step Fix

### Step 1: Stop Backend
```bash
# Press Ctrl+C in your backend terminal
```

### Step 2: Open server.js
- Open your backend `server.js` file in your editor

### Step 3: Find Commented Endpoints
- Search for `// app.get` or `// app.post`
- You should find several commented-out endpoints

### Step 4: Uncomment Them
- Remove the `//` from the beginning of each line
- Or use Find & Replace (see above)

### Step 5: Save File
- Save the file (Ctrl+S)

### Step 6: Restart Backend
```bash
node server.js
```

### Step 7: Test
- Go to http://localhost:5173 (home page)
- Categories should now load
- No 404 errors in console

---

## How to Verify It's Fixed

### Check 1: Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Refresh the page
4. Should NOT see "Error fetching categories"

### Check 2: Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for `/api/categories` request
5. Should show status **200** (not 404)

### Check 3: Visual Check
1. Go to http://localhost:5173
2. Scroll down to "Categories" section
3. Should see category cards (Starters, Soups, etc.)
4. Not an error message

---

## Common Mistakes

### ❌ Mistake 1: Only Uncommenting One Endpoint
- You need to uncomment ALL endpoints
- Not just `/api/categories`
- Also uncomment `/api/menu`, `/api/reservations`, etc.

### ❌ Mistake 2: Forgetting to Restart Backend
- After uncommenting, you MUST restart the backend
- The backend reads the file when it starts
- Changes don't take effect until restart

### ❌ Mistake 3: Uncommenting Wrong Lines
- Make sure you're uncommenting the `app.get` or `app.post` lines
- Not just the comments above them
- The entire function needs to be uncommented

### ❌ Mistake 4: Syntax Errors After Uncommenting
- Be careful not to accidentally delete code
- Make sure all brackets `{}` are still there
- Make sure all semicolons `;` are still there

---

## If It Still Doesn't Work

### Check 1: Backend is Running
```bash
# In your backend terminal, you should see:
# Server running on port 5000
# Database connected
```

If you don't see this, start the backend:
```bash
node server.js
```

### Check 2: Database is Connected
- Check backend console for database errors
- Make sure MySQL is running
- Make sure database name is `crave_db`

### Check 3: Endpoints Are Really Uncommented
- Open `server.js` again
- Search for `app.get("/api/categories"`
- Make sure it's NOT preceded by `//`
- Make sure it's NOT inside `/* */`

### Check 4: Frontend is Calling Correct URL
- Check `src/Hooks/useAxios.jsx`
- Should have: `baseURL: "http://localhost:5000"`

### Check 5: Browser Cache
- Press Ctrl+Shift+Delete to clear cache
- Or open DevTools and disable cache
- Refresh the page

---

## Understanding the Error Flow

```
1. Frontend (React) loads
   ↓
2. Categories component mounts
   ↓
3. useEffect hook runs
   ↓
4. Calls: GET http://localhost:5000/api/categories
   ↓
5. Backend receives request
   ↓
6. Backend looks for /api/categories endpoint
   ↓
7. Endpoint is commented out (doesn't exist)
   ↓
8. Backend responds: 404 Not Found
   ↓
9. Frontend catches error
   ↓
10. Console shows: "Error fetching categories: Request failed with status code 404"
```

**Solution**: Uncomment the endpoint so step 6 finds it.

---

## Quick Reference

### What is 404?
- HTTP status code meaning "Not Found"
- The server received your request but couldn't find what you asked for
- Usually means the endpoint doesn't exist or is commented out

### What is GET?
- HTTP method for fetching data
- Used when you want to READ data from the server
- Example: `GET /api/categories` = "Give me all categories"

### What is POST?
- HTTP method for sending data
- Used when you want to CREATE or SEND data to the server
- Example: `POST /api/reservations` = "Create a new reservation"

### What is baseURL?
- The base address for all API calls
- In your case: `http://localhost:5000`
- So `GET /api/categories` becomes `GET http://localhost:5000/api/categories`

---

## Summary

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 Error | Endpoint commented out | Uncomment it in server.js |
| Still 404 | Backend not restarted | Restart backend: `node server.js` |
| Still 404 | Wrong endpoint uncommented | Check you uncommented the right one |
| Still 404 | Database not connected | Check MySQL is running |

---

## Next Steps

1. ✅ Uncomment all endpoints in `server.js`
2. ✅ Restart backend server
3. ✅ Refresh browser
4. ✅ Check console for errors
5. ✅ Verify categories load on home page
6. ✅ Test menu page
7. ✅ Test reservations form

---

**Time to Fix**: 2-5 minutes  
**Difficulty**: Easy  
**Cause**: Commented-out backend endpoints  
**Solution**: Uncomment them and restart backend
