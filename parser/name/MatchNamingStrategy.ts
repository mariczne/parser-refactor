export interface MatchNamingStrategy {
  getMatchName(homePlayer: string, awayPlayer: string): string;
}
