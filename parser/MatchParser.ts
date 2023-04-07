import { matchNameCreator, MatchNameCreator } from "./name/MatchNameCreator";
import { matchScoreFormatter, MatchScoreFormatter } from "./score/MatchScoreFormatter";

export enum Sport {
  SOCCER = "soccer",
  VOLLEYBALL = "volleyball",
  HANDBALL = "handball",
  BASKETBALL = "basketball",
  TENNIS = "tennis",
}

export type MatchLike = {
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
  sport: string;
};

export type ParsedMatch = {
  name: string;
  score: string;
};

export class MatchParser {
  constructor(
    private readonly matchNameCreator: MatchNameCreator,
    private readonly matchScoreFormatter: MatchScoreFormatter
  ) {}

  parseMatch(match: MatchLike): ParsedMatch {
    return {
      name: this.matchNameCreator.getMatchName(match),
      score: this.matchScoreFormatter.formatMatchScore(match),
    };
  }
}

// I won't be mocking anything, so this is fine
export const matchParser = new MatchParser(matchNameCreator, matchScoreFormatter);
