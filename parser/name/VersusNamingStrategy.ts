import { EventNamingStrategy } from "./EventNamingStrategy";

export class VersusNamingStrategy implements EventNamingStrategy {
  getEventName(homePlayer: string, awayPlayer: string): string {
    return homePlayer + " vs " + awayPlayer;
  }
}
