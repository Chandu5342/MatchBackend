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
export const searchMatches = async (search) => {
  const result = await pool.query(
    `SELECT * FROM matches
     WHERE team_a ILIKE $1 OR team_b ILIKE $1
     ORDER BY start_time ASC`,
    [`%${search}%`]
  );
  return result.rows;
};

export const getFavoriteMatches = async (userId) => {
  const result = await pool.query(
    `SELECT m.*
     FROM favorites f
     JOIN matches m ON f.match_id = m.id
     WHERE f.user_id = $1
     ORDER BY m.start_time ASC`,
    [userId]
  );
  return result.rows;
};

export const createMatch = async ({ sport, league, team_a, team_b, start_time }) => {
  const result = await pool.query(
    `INSERT INTO matches (sport, league, team_a, team_b, start_time)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [sport, league, team_a, team_b, start_time]
  );
  return result.rows[0];
};

export const updateMatch = async (id, { sport, league, team_a, team_b, start_time }) => {
  const result = await pool.query(
    `UPDATE matches
     SET sport = $1, league = $2, team_a = $3, team_b = $4, start_time = $5
     WHERE id = $6
     RETURNING *`,
    [sport, league, team_a, team_b, start_time, id]
  );
  return result.rows[0];
};

export const deleteMatch = async (id) => {
  const result = await pool.query(
    `DELETE FROM matches WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
