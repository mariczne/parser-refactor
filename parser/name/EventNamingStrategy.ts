export interface EventNamingStrategy {
  getEventName(homePlayer: string, awayPlayer: string): string;
}