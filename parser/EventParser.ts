import { ParseableMatch } from "../app";
import { InvalidSportException } from "../exceptions/InvalidSportException";
import { BasketballLikeScoreFormattingStrategy } from "./BasketballLikeScoreFormattingStrategy";
import { DashNamingStrategy } from "./DashNamingStrategy";
import { EventNameCreator } from "./EventNameCreator";
import { EventScoreFormatter } from "./EventScoreFormatter";
import { SoccerLikeScoreFormattingStrategy } from "./SoccerLikeScoreFormattingStrategy";
import { TennisLikeScoreFormattingStrategy } from "./TennisLikeScoreFormattingStrategy";
import { VersusNamingStrategy } from "./VersusNamingStrategy";

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

const versusNamingStrategy = new VersusNamingStrategy()
const dashNamingStrategy = new DashNamingStrategy()
const eventNameCreator = new EventNameCreator(dashNamingStrategy, versusNamingStrategy)

const basketballLikeFormattingStrategy = new BasketballLikeScoreFormattingStrategy()
const soccerLikeFormattingStrategy = new SoccerLikeScoreFormattingStrategy()
const tennisLikeFormattingStrategy = new TennisLikeScoreFormattingStrategy()
const eventScoreFormatter = new EventScoreFormatter(basketballLikeFormattingStrategy, soccerLikeFormattingStrategy, tennisLikeFormattingStrategy)

export const eventParser = new EventParser(eventNameCreator, eventScoreFormatter)