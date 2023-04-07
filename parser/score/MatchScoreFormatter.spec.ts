import { IncorrectScoreFormatException } from "../../exceptions/IncorrectScoreFormatException";
import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { matchScoreFormatter } from "./MatchScoreFormatter";

test("should throw when sport is not valid", () => {
  const match = {
    sport: "hockey",
    participant1: "Cracovia",
    participant2: "Podhale",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  };

  expect(() => matchScoreFormatter.formatMatchScore(match)).toThrowError(new InvalidSportException());
});

test("should throw when wrong score format is supplied", () => {
  const match = {
    sport: "basketball",
    participant1: "Golden State",
    participant2: "Cleveland",
    score: "22:23 27:19 27:33 13:18",
  };

  expect(() => matchScoreFormatter.formatMatchScore(match)).toThrowError(new IncorrectScoreFormatException());
});

test("should correctly format score of a correct format", () => {
  const match = {
    sport: "basketball",
    participant1: "Golden State",
    participant2: "Cleveland",
    score: [
      ["22:23", "27:19"],
      ["27:33", "13:18"],
    ],
  };

  const formattedScore = matchScoreFormatter.formatMatchScore(match)
  const expectedResult = "22:23,27:19,27:33,13:18"

  expect(formattedScore).toEqual(expectedResult);
});
