import { ParseableMatch } from "../app";
import { IncorrectScoreFormatException } from "../exceptions/IncorrectScoreFormatException";
import { SportEventParser } from "./SportEventParser";

export class BasketballEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " - " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    if (!Array.isArray(match.score)) throw new IncorrectScoreFormatException();

    const [[Q1, Q2], [Q3, Q4]] = match.score;
    // Not showing the total score of a basketball game is a bit weird, though
    return Q1 + "," + Q2 + "," + Q3 + "," + Q4;
  }
}