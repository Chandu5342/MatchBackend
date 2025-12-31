import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully ");
  } catch (error) {
    console.error("Database connection failed ", error.message);
    process.exit(1);
  }
};

export { pool, connectDB };
