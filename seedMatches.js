import { pool } from "./config/db.js";

const seedMatches = async () => {
  try {
    await pool.query("DELETE FROM matches");

    const query = `
      INSERT INTO matches (sport, league, team_a, team_b, start_time)
      VALUES
      ('Cricket', 'IPL', 'CSK', 'MI', '2026-01-01 18:00:00'),
      ('Football', 'EPL', 'Arsenal', 'Chelsea', '2026-01-02 20:00:00'),
      ('Football', 'La Liga', 'Real Madrid', 'Barcelona', '2026-01-03 21:00:00'),
      ('Tennis', 'ATP', 'Nadal', 'Djokovic', '2026-01-04 17:00:00'),
      ('Cricket', 'BBL', 'Sydney Sixers', 'Melbourne Stars', '2026-01-04 19:30:00');
    `;

    await pool.query(query);
    console.log("Matches seeded successfully ");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ", error.message);
    process.exit(1);
  }
};

seedMatches();
