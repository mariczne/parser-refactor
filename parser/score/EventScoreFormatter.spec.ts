import { IncorrectScoreFormatException } from "../../exceptions/IncorrectScoreFormatException";
import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { eventScoreFormatter } from "./EventScoreFormatter";

test("should throw when sport is not valid", () => {
  const event = {
    sport: "hockey",
    participant1: "Cracovia",
    participant2: "Podhale",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  };

  expect(() => eventScoreFormatter.formatEventScore(event)).toThrowError(new InvalidSportException());
});

test("should throw when wrong score format is supplied", () => {
  const event = {
    sport: "basketball",
    participant1: "Golden State",
    participant2: "Cleveland",
    score: "22:23 27:19 27:33 13:18",
  };

  expect(() => eventScoreFormatter.formatEventScore(event)).toThrowError(new IncorrectScoreFormatException());
});

test("should correctly format score of a correct format", () => {
  const event = {
    sport: "basketball",
    participant1: "Golden State",
    participant2: "Cleveland",
    score: [
      ["22:23", "27:19"],
      ["27:33", "13:18"],
    ],
  };
  
  const formattedScore = eventScoreFormatter.formatEventScore(event)
  const expectedResult = "22:23,27:19,27:33,13:18"

  expect(formattedScore).toEqual(expectedResult);
});
