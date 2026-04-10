// ===== GENERATE ADMIN PASSWORD HASH =====
// This script generates a bcrypt hash for the admin password
// Run: node generate-admin-hash.js

import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const ADMIN_EMAIL = 'admin@crave.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin User';

async function createAdminUser() {
  console.log('🔐 Generating password hash for admin user...\n');

  try {
    // Generate password hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);
    
    console.log('✅ Password hash generated successfully!');
    console.log('📋 Hash:', passwordHash);
    console.log('');

    // Connect to database
    console.log('📡 Connecting to database...');
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2304064',
      database: 'crave_db'
    });

    console.log('✅ Connected to database\n');

    // Delete existing admin user (if exists)
    await connection.query(
      'DELETE FROM admin_users WHERE email = ?',
      [ADMIN_EMAIL]
    );
    console.log('🗑️  Removed existing admin user (if any)');

    // Insert new admin user
    const [result] = await connection.query(
      `INSERT INTO admin_users (email, password_hash, name, role, is_active) 
       VALUES (?, ?, ?, ?, ?)`,
      [ADMIN_EMAIL, passwordHash, ADMIN_NAME, 'admin', true]
    );

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📝 Admin Credentials:');
    console.log('   Email:', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD);
    console.log('   Role: admin');
    console.log('');

    // Verify the user was created
    const [users] = await connection.query(
      'SELECT id, email, name, role, is_active, created_at FROM admin_users WHERE email = ?',
      [ADMIN_EMAIL]
    );

    if (users.length > 0) {
      console.log('✅ Verification successful!');
      console.log('   User ID:', users[0].id);
      console.log('   Name:', users[0].name);
      console.log('   Role:', users[0].role);
      console.log('   Active:', users[0].is_active ? 'Yes' : 'No');
      console.log('   Created:', users[0].created_at);
    }

    await connection.end();
    console.log('\n🎉 Admin user setup complete!');
    console.log('🔗 You can now login at: http://localhost:5173/admin/login');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
createAdminUser();
