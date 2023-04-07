import { eventNameCreator, EventNameCreator } from "./name/EventNameCreator";
import { eventScoreFormatter, EventScoreFormatter } from "./score/EventScoreFormatter";

export enum Sport {
  SOCCER = "soccer",
  VOLLEYBALL = "volleyball",
  HANDBALL = "handball",
  BASKETBALL = "basketball",
  TENNIS = "tennis",
}

export type EventLike = {
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
  sport: string;
};

export type ParsedEvent = {
  name: string;
  score: string;
};

export class EventParser {
  constructor(
    private readonly eventNameCreator: EventNameCreator,
    private readonly eventScoreFormatter: EventScoreFormatter
  ) {}

  parseEvent(event: EventLike): ParsedEvent {
    return {
      name: this.eventNameCreator.getEventName(event),
      score: this.eventScoreFormatter.formatEventScore(event),
    };
  }
}

// I won't be mocking anything, so this is fine
export const eventParser = new EventParser(eventNameCreator, eventScoreFormatter);
