export interface EventScoreFormattingStrategy {
  formatEventScore(score: string | string[][] | undefined): string;
}
