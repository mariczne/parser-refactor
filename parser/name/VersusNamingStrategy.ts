import { MatchNamingStrategy } from "./MatchNamingStrategy";

export class VersusNamingStrategy implements MatchNamingStrategy {
  getMatchName(homePlayer: string, awayPlayer: string): string {
    return homePlayer + " vs " + awayPlayer;
  }
}
