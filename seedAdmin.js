import { pool } from "./config/db.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const existing = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (existing.rows.length) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("123456", 10);
    await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)`,
      ["Admin", email, hashed, "admin"]
    );

    console.log("Admin user created: admin@gmail.com / 123456");
    process.exit();
  } catch (err) {
    console.error("Admin seeding failed", err.message);
    process.exit(1);
  }
};

seedAdmin();
