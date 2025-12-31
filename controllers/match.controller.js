import {
  getAllMatches,
  getMatchesBySport,
} from "../models/match.model.js";

export const getMatches = async (req, res) => {
  try {
    const { sport } = req.query;

    let matches;
    if (sport) {
      matches = await getMatchesBySport(sport);
    } else {
      matches = await getAllMatches();
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};
