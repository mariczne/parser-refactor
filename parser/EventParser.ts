import { ParseableMatch } from "../app";
import { InvalidSportException } from "../exceptions/InvalidSportException";
import { BasketballEventParser } from "./BasketballEventParser";
import { HandballEventParser } from "./HandballEventParser";
import { SoccerEventParser } from "./SoccerEventParser";
import { SportEventParser } from "./SportEventParser";
import { TennisEventParser } from "./TennisEventParser";
import { VolleyballEventParser } from "./VolleyballEventParser";

const SPORTS = {
  SOCCER: "soccer",
  VOLLEYBALL: "volleyball",
  HANDBALL: "handball",
  BASKETBALL: "basketball",
  TENNIS: "tennis",
} as const;

type Sport = typeof SPORTS[keyof typeof SPORTS];

export class EventParser {
  private PARSERS_MAP: Record<Sport, SportEventParser> = {
    [SPORTS.SOCCER]: new SoccerEventParser,
    [SPORTS.BASKETBALL]: new BasketballEventParser,
    [SPORTS.HANDBALL]: new HandballEventParser,
    [SPORTS.TENNIS]: new TennisEventParser,
    [SPORTS.VOLLEYBALL]: new VolleyballEventParser,
  };
  private parser: SportEventParser;

  constructor(private readonly match: ParseableMatch) {
    this.parser = this.getParser();
  }

  getParser() {
    const parser = this.PARSERS_MAP[this.match.sport as Sport];
    if (!parser) throw new InvalidSportException();
    return parser;
  }

  makeEventName() {
    return this.parser.makeEventName(this.match);
  }

  formatScore() {
    return this.parser.formatScore(this.match);
  }
}