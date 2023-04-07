import { MatchScoreFormattingStrategy } from "./MatchScoreFormattingStrategy";

export class SingleScoreFormattingStrategy implements MatchScoreFormattingStrategy {
  formatMatchScore(score: string | string[][] | undefined): string {
    return String(score);
  }
}
