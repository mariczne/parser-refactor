import { MatchNamingStrategy } from "./MatchNamingStrategy";

export class DashNamingStrategy implements MatchNamingStrategy {
  getMatchName(homePlayer: string, awayPlayer: string): string {
    return homePlayer + " - " + awayPlayer;
  }
}
