# Import Path Casing Issues - Fixed

## Problem

Windows file systems are case-insensitive, but JavaScript imports are case-sensitive. The project had inconsistent casing in import paths for `useAxios`:

- Some files: `import useAxios from "../../hooks/useAxios"`  (lowercase `hooks`)
- Actual folder: `src/Hooks/useAxios.jsx` (uppercase `Hooks`)

This caused build errors and module resolution failures.

---

## Files Fixed

### 1. AdminLogin.jsx
**Location**: `src/Pages/Authentication/AdminLogin.jsx`

**Before**:
```javascript
import useAxios from "../hooks/useAxios";  // ❌ Wrong path depth AND casing
```

**After**:
```javascript
import useAxios from "../../Hooks/useAxios";  // ✅ Correct
```

**Issues Fixed**:
- Wrong path depth (needed `../../` not `../`)
- Wrong casing (`Hooks` not `hooks`)

---

### 2. AdminDashboard.jsx
**Location**: `src/Pages/Admin/AdminDashboard.jsx`

**Before**:
```javascript
import useAxios from "../../hooks/useAxios";  // ❌ Wrong casing
```

**After**:
```javascript
import useAxios from "../../Hooks/useAxios";  // ✅ Correct
```

---

### 3. Reservations.jsx
**Location**: `src/Pages/Reservations/Reservations.jsx`

**Before**:
```javascript
import useAxios from "../../hooks/useAxios";  // ❌ Wrong casing
```

**After**:
```javascript
import useAxios from "../../Hooks/useAxios";  // ✅ Correct
```

---

### 4. Categories.jsx
**Location**: `src/Component/Categories/Categories.jsx`

**Before**:
```javascript
import useAxios from "../../hooks/useAxios";  // ❌ Wrong casing
```

**After**:
```javascript
import useAxios from "../../Hooks/useAxios";  // ✅ Correct
```

---

### 5. Menu.jsx
**Location**: `src/Pages/Menu/Menu.jsx`

**Before**:
```javascript
import useAxios from "../../hooks/useAxios";  // ❌ Wrong casing
```

**After**:
```javascript
import useAxios from "../../Hooks/useAxios";  // ✅ Correct
```

---

## Why This Matters

### On Windows:
- File system is case-insensitive
- `hooks/` and `Hooks/` point to the same folder
- But JavaScript module resolution IS case-sensitive
- This causes build errors and inconsistencies

### On Linux/Mac:
- File system IS case-sensitive
- `hooks/` and `Hooks/` are different folders
- Wrong casing = module not found error

### Best Practice:
- Always match the exact casing of folder names
- Use consistent casing across all imports
- The actual folder is `src/Hooks/` (capital H)

---

## Verification

All files now use the correct import path:
```javascript
import useAxios from "../../Hooks/useAxios";
```

✅ No more casing conflicts  
✅ No more module resolution errors  
✅ Consistent across all files  
✅ Works on all operating systems  

---

## Path Breakdown

For reference, here's how the paths work:

```
src/
├── Hooks/                    ← Capital H (actual folder)
│   └── useAxios.jsx
├── Pages/
│   ├── Admin/
│   │   └── AdminDashboard.jsx    → ../../Hooks/useAxios
│   ├── Authentication/
│   │   └── AdminLogin.jsx        → ../../Hooks/useAxios
│   ├── Reservations/
│   │   └── Reservations.jsx      → ../../Hooks/useAxios
│   └── Menu/
│       └── Menu.jsx              → ../../Hooks/useAxios
└── Component/
    └── Categories/
        └── Categories.jsx        → ../../Hooks/useAxios
```

---

## Summary

- **Issue**: Inconsistent casing in import paths
- **Root Cause**: Folder is `Hooks/` but imports used `hooks/`
- **Impact**: Build errors, module resolution failures
- **Solution**: Updated all imports to use correct casing `Hooks/`
- **Files Fixed**: 5 files
- **Status**: ✅ All fixed and verified
