import {
  getAllMatches,
  getMatchesBySport,
  searchMatches,
  getFavoriteMatches,
} from "../models/match.model.js";

export const getMatches = async (req, res) => {
  try {
    const { sport, search, favorites } = req.query;
    const userId = req.user.id;

    let matches;

    if (favorites === "true") {
      matches = await getFavoriteMatches(userId);
    } else if (search) {
      matches = await searchMatches(search);
    } else if (sport) {
      matches = await getMatchesBySport(sport);
    } else {
      matches = await getAllMatches();
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};
