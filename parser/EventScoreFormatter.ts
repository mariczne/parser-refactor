import { InvalidSportException } from "../exceptions/InvalidSportException";
import { BasketballLikeScoreFormattingStrategy } from "./BasketballLikeScoreFormattingStrategy";
import { Sport } from "./EventParser";
import { SoccerLikeScoreFormattingStrategy } from "./SoccerLikeScoreFormattingStrategy";
import { TennisLikeScoreFormattingStrategy } from "./TennisLikeScoreFormattingStrategy";

export class EventScoreFormatter {
  constructor(
    private readonly basketballLikeFormattingStrategy: BasketballLikeScoreFormattingStrategy,
    private readonly soccerLikeFormattingStrategy: SoccerLikeScoreFormattingStrategy,
    private readonly tennisLikeFormattingStrategy: TennisLikeScoreFormattingStrategy
  ) {}

  formatEventScore(event: { sport: string; score?: string | string[][] }) {
    switch (event.sport) {
      case Sport.BASKETBALL:
        return this.basketballLikeFormattingStrategy.formatEventScore(
          event.score
        );
      case Sport.SOCCER:
      case Sport.HANDBALL:
        return this.soccerLikeFormattingStrategy.formatEventScore(event.score);
      case Sport.TENNIS:
      case Sport.VOLLEYBALL:
        return this.tennisLikeFormattingStrategy.formatEventScore(event.score);
      default:
        throw new InvalidSportException();
    }
  }
}
