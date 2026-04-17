import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2304064",
  });

  console.log("✅ Connected to MySQL");

  await connection.query("CREATE DATABASE IF NOT EXISTS crave_db");
  console.log("✅ Database 'crave_db' created/verified");

  await connection.query("USE crave_db");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin','chef','waiter') NOT NULL DEFAULT 'waiter',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Table 'staff' created/verified");

  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  
  try {
    await connection.query(
      "INSERT INTO staff (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      ["Admin User", "admin@crave.com", adminPasswordHash, "admin"]
    );
    console.log("✅ Admin user created");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("ℹ️  Admin user already exists");
    } else {
      throw error;
    }
  }

  await connection.end();
  console.log("\n🎉 Database initialization complete!");
  console.log("📝 Default admin credentials:");
  console.log("   Email: admin@crave.com");
  console.log("   Password: admin123");
  console.log("\n🔗 Start backend: node server.js");
}

initDatabase().catch(console.error);