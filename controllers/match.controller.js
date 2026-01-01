import {
  getAllMatches,
  getMatchesBySport,
  searchMatches,
  getFavoriteMatches,
  createMatch as createMatchModel,
  updateMatch as updateMatchModel,
  deleteMatch as deleteMatchModel,
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

export const createMatch = async (req, res) => {
  try {
    const { sport, league, team_a, team_b, start_time } = req.body;
    if (!sport || !team_a || !team_b || !start_time) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const match = await createMatchModel({ sport, league, team_a, team_b, start_time });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: "Failed to create match" });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { sport, league, team_a, team_b, start_time } = req.body;
    const updated = await updateMatchModel(id, { sport, league, team_a, team_b, start_time });
    if (!updated) return res.status(404).json({ message: "Match not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update match" });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMatchModel(id);
    if (!deleted) return res.status(404).json({ message: "Match not found" });
    res.status(200).json({ message: "Match deleted", match: deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete match" });
  }
};
