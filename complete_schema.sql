-- ============================================================
-- CRAVE RESTAURANT DATABASE SCHEMA
-- Complete MySQL Schema - Paste into MySQL Workbench
-- ============================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS crave_db;
USE crave_db;

-- ============================================================
-- SECTION 1: USERS TABLE (Firebase customers)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- SECTION 2: STAFF TABLE (Admin, Chefs, Waiters)
-- ============================================================
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','chef','waiter') NOT NULL DEFAULT 'waiter',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Admin (password: admin123)
INSERT INTO staff (name, email, password_hash, role) 
VALUES ('Admin', 'admin@crave.com', '$2b$10$HTsw3.ab44vBGkuMhPzeYO.O/mbPo13yBcz3GB266B2FKOlzxXs0q', 'admin');

-- ============================================================
-- SECTION 3: CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    display_order INT
);

INSERT INTO categories (category_name, display_order) VALUES
('Starters', 1),
('Soups & Salads', 2),
('Noodles & Rice', 3),
('Curries & Stir-Fries', 4),
('Main Course', 5),
('Crave''s Unique Dishes', 6),
('Sides', 7),
('Drinks', 8),
('Desserts', 9),
('Fun Add-Ons', 10);

-- ============================================================
-- SECTION 4: MENU ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price_bdt DECIMAL(10,2) NOT NULL,
    ingredients TEXT NOT NULL,
    is_unique BOOLEAN DEFAULT FALSE,
    display_order INT,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Starters
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Crispy Shrimp', 1, 320, 'Shrimp, tempura batter, spicy mayo, sriracha, sesame seeds', FALSE, 1),
('Fish Cakes', 1, 290, 'White fish, red curry paste, lime leaves, green beans, cucumber relish', FALSE, 2),
('Pan-Fried Dumplings', 1, 250, 'Dumpling wrappers, chicken/pork/vegetables, soy dipping sauce', FALSE, 3),
('Peanut Chicken Skewers', 1, 310, 'Chicken thigh, peanut sauce, coconut milk, pickled cucumber', FALSE, 4);

-- Soups & Salads
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Spicy Lemongrass Soup', 2, 280, 'Lemongrass, shrimp, mushrooms, chili, lime juice, fish sauce', FALSE, 1),
('Tofu & Seaweed Soup', 2, 240, 'Soft tofu, wakame seaweed, miso paste, scallions', FALSE, 2),
('Green Papaya Salad', 2, 270, 'Shredded green papaya, cherry tomatoes, peanuts, chili, lime, fish sauce', FALSE, 3),
('Crunchy Sesame Salad', 2, 260, 'Mixed greens, edamame, carrot, wonton strips, sesame ginger dressing', FALSE, 4);

-- Noodles & Rice
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Stir-Fried Noodles', 3, 340, 'Rice noodles, egg, bean sprouts, peanuts, choice of chicken/tofu/shrimp', FALSE, 1),
('Crave''s Famous Ramen', 3, 420, 'Tonkotsu broth, chashu pork, soft-boiled egg, nori seaweed, bamboo shoots', FALSE, 2),
('Thick Noodles with Veggies', 3, 330, 'Udon noodles, cabbage, carrot, bell pepper, choice of chicken/beef/shrimp', FALSE, 3),
('Spicy Basil Fried Rice', 3, 350, 'Jasmine rice, holy basil, chili, garlic, bell peppers, choice of protein', FALSE, 4),
('Sushi Roll Set', 3, 450, 'Sushi rice, nori, cucumber, avocado, crab stick, tuna, spicy mayo, wasabi, ginger', FALSE, 5);

-- Curries & Stir-Fries
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Coconut Green Curry', 4, 380, 'Coconut milk, bamboo shoots, eggplant, Thai basil, choice of chicken/tofu/shrimp', FALSE, 1),
('Mild Japanese Curry', 4, 360, 'Japanese curry roux, carrots, potatoes, onion, crispy chicken katsu', FALSE, 2),
('Spicy Peanut Chicken', 4, 370, 'Chicken, peanuts, dried chili, Sichuan peppercorns, bell peppers, soy sauce', FALSE, 3),
('Sweet Soy Beef', 4, 400, 'Beef slices, scallions, garlic, sweet soy glaze, crispy rice noodles', FALSE, 4);

-- Main Course
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Grilled Teriyaki Chicken', 5, 420, 'Chicken thigh, homemade teriyaki sauce, steamed broccoli, sesame seeds, side of jasmine rice', FALSE, 1),
('Crispy Honey Pork Belly', 5, 480, 'Pork belly, honey glaze, five-spice powder, garlic, served with stir-fried vegetables', FALSE, 2),
('Steamed Whole Fish with Ginger & Soy', 5, 590, 'Whole tilapia or seabass, fresh ginger, scallions, soy sauce, cilantro, sesame oil', FALSE, 3),
('Korean BBQ Beef Bowl', 5, 460, 'Thinly sliced beef, bulgogi marinade, onion, garlic, served over steamed rice with kimchi', FALSE, 4),
('Tofu & Vegetable Hot Pot', 5, 390, 'Firm tofu, napa cabbage, mushroom, carrot, bok choy, vegetable broth, served with jasmine rice', FALSE, 5),
('Salt & Pepper Squid', 5, 440, 'Fresh squid, cornstarch, salt, white pepper, chili, garlic, onion, lime wedge', FALSE, 6);

-- Crave's Unique Dishes
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Sushi Burrito', 6, 520, 'Soy paper, sushi rice, spicy tuna, avocado, cucumber, crunch, mango, eel sauce', TRUE, 1),
('Ramen Burger', 6, 490, 'Ramen noodle buns, beef patty, teriyaki glaze, lettuce, caramelized onion', TRUE, 2),
('Thai Tea Pudding', 6, 260, 'Thai tea, cream, sugar, condensed milk caramel topping', TRUE, 3),
('Volcano Rice', 6, 550, 'Fried rice, pineapple bowl, shrimp, sriracha mayo, flambéed chili sauce', TRUE, 4),
('Mango Roll', 6, 280, 'Spring roll wrapper, sweet sticky rice, fresh mango, coconut ice cream', TRUE, 5),
('Sake Chicken Bites', 6, 390, 'Chicken thigh, sake, ginger, potato starch, wasabi mayo, pickled daikon', TRUE, 6);

-- Sides
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Steamed Soybeans', 7, 120, 'Soybeans, sea salt or spicy garlic', FALSE, 1),
('Crispy Wonton Chips', 7, 130, 'Wonton skins, sweet chili dipping sauce', FALSE, 2),
('Spicy Cabbage', 7, 110, 'Napa cabbage, Korean chili flakes, garlic, fish sauce (house-made kimchi)', FALSE, 3),
('Plain or Jasmine Rice', 7, 90, 'Steamed jasmine or brown rice', FALSE, 4);

-- Drinks
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Thai Iced Tea', 8, 150, 'Thai tea mix, condensed milk, evaporated milk, ice', FALSE, 1),
('Green Tea Latte', 8, 170, 'Matcha powder, milk, sugar (hot or iced)', FALSE, 2),
('Lychee Mint Drink', 8, 160, 'Lychee juice, fresh mint leaves, soda water, ice', FALSE, 3),
('Fruity Sake Punch', 8, 280, 'Sake, tropical fruit juice, fresh fruit slices (alcoholic)', FALSE, 4),
('Crave''s Herb Mojito', 8, 180, 'Rum (optional), kaffir lime leaves, lemongrass, mint, soda water, lime', FALSE, 5);

-- Desserts
INSERT INTO menu_items (item_name, category_id, price_bdt, ingredients, is_unique, display_order) VALUES
('Ice Cream Mochi', 9, 220, 'Sweet rice dough, vanilla/matcha/strawberry ice cream (3 pieces)', FALSE, 1),
('Fried Banana', 9, 210, 'Banana, tempura batter, chocolate sauce, vanilla ice cream', FALSE, 2),
('Green Tea Cheesecake', 9, 250, 'Matcha powder, cream cheese, red bean swirl, crushed Oreo base', FALSE, 3),
('Rolled Ice Cream', 9, 240, 'Cream base, mango/coconut/Thai tea flavor, mix-ins (made to order)', FALSE, 4);

-- ============================================================
-- SECTION 5: RESTAURANT TABLES
-- ============================================================
CREATE TABLE IF NOT EXISTS restaurant_tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number VARCHAR(10) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    location VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO restaurant_tables (table_number, capacity, location) VALUES
('A-01', 2, 'Window'),
('A-02', 2, 'Window'),
('A-03', 4, 'Center'),
('A-04', 4, 'Center'),
('A-05', 6, 'Corner'),
('A-06', 6, 'Corner'),
('B-01', 8, 'Private'),
('B-02', 8, 'Private');

-- ============================================================
-- SECTION 6: ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    table_number VARCHAR(10) NOT NULL,
    customer_note TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','preparing','ready','served','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_table ON orders(table_number);
CREATE INDEX idx_order_status ON orders(status);

-- ============================================================
-- SECTION 7: ORDER ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT,
    item_name VARCHAR(100) NOT NULL,
    category_name VARCHAR(100),
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    special_notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- ============================================================
-- SECTION 8: ORDER TRACKING TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS order_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    message TEXT,
    changed_by VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ============================================================
-- SECTION 9: RESERVATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20) NOT NULL,
    number_of_guests INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    special_requests TEXT,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    assigned_table_number VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
SELECT '=== USERS TABLE ===' AS '';
SELECT * FROM users;

SELECT '=== STAFF TABLE ===' AS '';
SELECT id, name, email, role, is_active, created_at FROM staff;

SELECT '=== CATEGORIES TABLE ===' AS '';
SELECT * FROM categories;

SELECT '=== MENU ITEMS COUNT ===' AS '';
SELECT COUNT(*) AS total_menu_items FROM menu_items;

SELECT '=== RESTAURANT TABLES ===' AS '';
SELECT * FROM restaurant_tables;

SELECT '=== ORDERS TABLE ===' AS '';
SELECT COUNT(*) AS total_orders FROM orders;

-- ============================================================
-- END OF SCHEMA
-- ============================================================