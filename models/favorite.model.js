import { pool } from "../config/db.js";

export const addFavorite = async (userId, matchId) => {
  const result = await pool.query(
    `INSERT INTO favorites (user_id, match_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, matchId]
  );
  return result.rows[0];
};

export const removeFavorite = async (userId, matchId) => {
  await pool.query(
    `DELETE FROM favorites
     WHERE user_id = $1 AND match_id = $2`,
    [userId, matchId]
  );
};

export const getUserFavorites = async (userId) => {
  const result = await pool.query(
    `SELECT m.*
     FROM favorites f
     JOIN matches m ON f.match_id = m.id
     WHERE f.user_id = $1`,
    [userId]
  );
  return result.rows;
};
