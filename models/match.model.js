import { pool } from "../config/db.js";

export const getAllMatches = async () => {
  const result = await pool.query(
    `SELECT * FROM matches ORDER BY start_time ASC`
  );
  return result.rows;
};

export const getMatchesBySport = async (sport) => {
  const result = await pool.query(
    `SELECT * FROM matches WHERE sport = $1 ORDER BY start_time ASC`,
    [sport]
  );
  return result.rows;
};

export const getMatchById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM matches WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};
