# 404 Error - Quick Summary

## Your Error
```
GET http://localhost:5000/api/categories 404 (Not Found)
Error fetching categories: Request failed with status code 404
```

---

## What It Means
Your backend doesn't have the `/api/categories` endpoint because it's commented out.

---

## The Fix (2 Minutes)

### Step 1: Open Backend
Open your backend `server.js` file

### Step 2: Find & Replace
- Press **Ctrl+H**
- Find: `// app.`
- Replace: `app.`
- Click "Replace All"

### Step 3: Save
- Press **Ctrl+S**

### Step 4: Restart Backend
```bash
Ctrl+C (to stop)
node server.js (to start)
```

### Step 5: Test
- Go to http://localhost:5173
- Categories should load ✅

---

## Why T