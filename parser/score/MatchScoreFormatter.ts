import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { QuartersScoreFormattingStrategy } from "./QuartersScoreFormattingStrategy";
import { Sport } from "../MatchParser";
import { SingleScoreFormattingStrategy } from "./SingleScoreFormattingStrategy";
import { SetsScoreFormattingStrategy } from "./SetsScoreFormattingStrategy";

export class MatchScoreFormatter {
  constructor(
    private readonly quarterScoreFormattingStrategy: QuartersScoreFormattingStrategy,
    private readonly soccerLikeFormattingStrategy: SingleScoreFormattingStrategy,
    private readonly setsScoreFormattingStrategy: SetsScoreFormattingStrategy
  ) {}

  formatMatchScore(match: { sport: string; score?: string | string[][] }) {
    switch (match.sport) {
      case Sport.BASKETBALL:
        return this.quarterScoreFormattingStrategy.formatMatchScore(match.score);
      case Sport.SOCCER:
      case Sport.HANDBALL:
        return this.soccerLikeFormattingStrategy.formatMatchScore(match.score);
      case Sport.TENNIS:
      case Sport.VOLLEYBALL:
        return this.setsScoreFormattingStrategy.formatMatchScore(match.score);
      default:
        throw new InvalidSportException();
    }
  }
}

const quartersScoreFormattingStrategy = new QuartersScoreFormattingStrategy();
const soccerLikeFormattingStrategy = new SingleScoreFormattingStrategy();
const setsScoreFormattingStrategy = new SetsScoreFormattingStrategy();
export const matchScoreFormatter = new MatchScoreFormatter(
  quartersScoreFormattingStrategy,
  soccerLikeFormattingStrategy,
  setsScoreFormattingStrategy
);
