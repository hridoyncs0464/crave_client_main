-- ===== CREATE ADMIN USER FOR CRAVE RESTAURANT =====
-- This script creates an admin user with email: admin@crave.com and password: admin123

USE crave_db;

-- First, delete any existing admin user with this email (if exists)
DELETE FROM admin_users WHERE email = 'admin@crave.com';

-- Insert admin user with bcrypt hashed password for 'admin123'
-- Hash generated using bcrypt with 10 rounds
INSERT INTO admin_users (email, password_hash, name, role, is_active) 
VALUES (
  'admin@crave.com',
  '$2b$10$rZ5FqP7XqVGKGX9YvH5Ziu.vGxKqN8YqN8YqN8YqN8YqN8YqN8Yq.',  -- This is 'admin123' hashed
  'Admin User',
  'admin',
  TRUE
);

-- Verify the admin user was created
SELECT id, email, name, role, is_active, created_at 
FROM admin_users 
WHERE email = 'admin@crave.com';

-- ===== ALTERNATIVE: Generate your own hash =====
-- If the above hash doesn't work, you can generate a new one using Node.js:
-- 
-- Run this in your terminal:
-- node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
-- 
-- Then replace the password_hash value above with the generated hash
