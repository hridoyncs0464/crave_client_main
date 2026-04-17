-- ============================================================
-- CRAVE DATABASE SCHEMA UPDATES
-- Run these queries in MySQL Workbench on crave_db
-- ============================================================

-- ============================================================
-- SECTION 1: Seed Admin Account
-- ============================================================
-- NOTE: The staff table should already exist. This INSERT IGNORE
-- will only insert if the admin doesn't already exist.

INSERT IGNORE INTO staff (name, email, password_hash, role)
VALUES ('Admin', 'admin@crave.com', '$2b$10$HTsw3.ab44vBGkuMhPzeYO.O/mbPo13yBcz3GB266B2FKOlzxXs0q', 'admin');

-- ============================================================
-- SECTION 2: Verification Queries
-- ============================================================

-- Verify staff table has the admin
SELECT id, name, email, role, is_active, created_at FROM staff;

-- Check total staff count
SELECT COUNT(*) AS total_staff FROM staff;

-- ============================================================
-- END OF SCHEMA UPDATES
-- ============================================================