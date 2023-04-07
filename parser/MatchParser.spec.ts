import { matchParser } from "./MatchParser"

test("should return an object containing name and score fields with correct values", () => {
  const match = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  }

  const parsedMatch = matchParser.parseMatch(match)
  expect(parsedMatch).toHaveProperty("name", "Chelsea - Arsenal")
  expect(parsedMatch).toHaveProperty("score", "2:1")
})