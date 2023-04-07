import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { MissingParticipantException } from "../../exceptions/MissingParticipantException";
import { DashNamingStrategy } from "./DashNamingStrategy";
import { MatchLike, Sport } from "../MatchParser";
import { VersusNamingStrategy } from "./VersusNamingStrategy";

export class MatchNameCreator {
  constructor(
    private readonly dashNamingStrategy: DashNamingStrategy,
    private readonly versusNamingStrategy: VersusNamingStrategy
  ) {}

  getMatchName(match: MatchLike) {
    if (!match.participant1 || !match.participant2) throw new MissingParticipantException();

    switch (match.sport) {
      case Sport.BASKETBALL:
      case Sport.SOCCER:
      case Sport.VOLLEYBALL:
        return this.dashNamingStrategy.getMatchName(match.participant1, match.participant2);
      case Sport.TENNIS:
      case Sport.HANDBALL:
        return this.versusNamingStrategy.getMatchName(match.participant1, match.participant2);
      default:
        throw new InvalidSportException();
    }
  }
}

const versusNamingStrategy = new VersusNamingStrategy();
const dashNamingStrategy = new DashNamingStrategy();
export const matchNameCreator = new MatchNameCreator(dashNamingStrategy, versusNamingStrategy);
