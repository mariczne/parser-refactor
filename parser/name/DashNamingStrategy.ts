import { EventNamingStrategy } from "./EventNamingStrategy";

export class DashNamingStrategy implements EventNamingStrategy {
  getEventName(homePlayer: string, awayPlayer: string): string {
    return homePlayer + " - " + awayPlayer;
  }
}
