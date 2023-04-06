import { EventScoreFormattingStrategy } from "./EventScoreFormattingStrategy";

export class SoccerLikeScoreFormattingStrategy implements EventScoreFormattingStrategy {
  formatEventScore(score: string | string[][] | undefined): string {
    return String(score);
  }
}
