# 404 Error Solution

## Your Error
```
GET http://localhost:5000/api/categories 404 (Not Found)
Error fetching categories: Request failed with status code 404
```

## Root Cause
Your backend `server.js` has all API endpoints commented out.

## Quick Fix (2 Minutes)

### Step 1: Open Backend File
Open your backend `server.js` file

### Step 2: Uncomment Endpoints
Use Find & Replace:
- Press **Ctrl+H**
- Find: `// app.`
- Replace: `app.`
- Click "Replace All"

### Step 3: Save
Press **Ctrl+S**

### Step 4: Restart Backend
```bash
Ctrl+C (stop current)
node server.js (start again)
```

### Step 5: Test
Go to http://localhost:5173 - Categories should load ✅

## Endpoints to Uncomment
- `GET /api/categories` - Home page categories
- `GET /api/menu` - Menu page items
- `POST /api/reservations` - Reservations form
- `POST /api/admin/login` - Admin login

## Detailed Guides
- `UNCOMMENT_ENDPOINTS_VISUAL.md` - Step-by-step visual guide
- `FIX_404_ERRORS.md` - Complete troubleshooting guide
- `ERRORS_EXPLAINED.md` - Detailed explanation of the error
