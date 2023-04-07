export interface MatchScoreFormattingStrategy {
  formatMatchScore(score: string | string[][] | undefined): string;
}
