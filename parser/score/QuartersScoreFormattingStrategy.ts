import { IncorrectScoreFormatException } from "../../exceptions/IncorrectScoreFormatException";
import { MatchScoreFormattingStrategy } from "./MatchScoreFormattingStrategy";

export class QuartersScoreFormattingStrategy implements MatchScoreFormattingStrategy {
  formatMatchScore(score: string | string[][] | undefined): string {
    if (!Array.isArray(score)) throw new IncorrectScoreFormatException();

    const [[Q1, Q2], [Q3, Q4]] = score;
    // Not showing the total score of a basketball game is a bit weird
    return Q1 + "," + Q2 + "," + Q3 + "," + Q4;
  }
}
