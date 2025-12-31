import { getAllMatches } from "./models/match.model.js";

const test = async () => {
  const matches = await getAllMatches();
  console.log(matches);
  process.exit();
};

test();
