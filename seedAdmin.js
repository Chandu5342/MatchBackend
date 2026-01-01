import { pool } from "./config/db.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const email = "admin@example.com";
    const existing = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (existing.rows.length) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("admin123", 10);
    await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)`,
      ["Admin", email, hashed, "admin"]
    );

    console.log("Admin user created: admin@example.com / admin123");
    process.exit();
  } catch (err) {
    console.error("Admin seeding failed", err.message);
    process.exit(1);
  }
};

seedAdmin();
