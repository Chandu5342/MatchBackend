import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "../models/favorite.model.js";

export const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { matchId } = req.params;

    await addFavorite(userId, matchId);

    res.status(201).json({ message: "Added to favorites ⭐" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Already in favorites" });
    }
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { matchId } = req.params;

    await removeFavorite(userId, matchId);

    res.status(200).json({ message: "Removed from favorites ❌" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getUserFavorites(userId);

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};
