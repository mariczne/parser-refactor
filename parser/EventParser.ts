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

  // private validateSport(sport: unknown): sport is Sport {
  //   if (!Object.values(Sport).includes(sport as Sport)) throw new InvalidSportException()
  //   return true
  // }

  parseEvent(event: EventLike): ParsedEvent {
    // this.validateSport(event.sport)

    return {
      name: this.eventNameCreator.getEventName(event),
      score: this.eventScoreFormatter.formatEventScore(event),
    };
  }
}

export const eventParser = new EventParser(eventNameCreator, eventScoreFormatter);
