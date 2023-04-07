import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { MissingParticipantException } from "../../exceptions/MissingParticipantException";
import { DashNamingStrategy } from "./DashNamingStrategy";
import { EventLike, Sport } from "../EventParser";
import { VersusNamingStrategy } from "./VersusNamingStrategy";

export class EventNameCreator {
  constructor(
    private readonly dashNamingStrategy: DashNamingStrategy,
    private readonly versusNamingStrategy: VersusNamingStrategy
  ) {}

  getEventName(event: EventLike) {
    if (!event.participant1 || !event.participant2) throw new MissingParticipantException();

    switch (event.sport) {
      case Sport.BASKETBALL:
      case Sport.SOCCER:
      case Sport.VOLLEYBALL:
        return this.dashNamingStrategy.getEventName(event.participant1, event.participant2);
      case Sport.TENNIS:
      case Sport.HANDBALL:
        return this.versusNamingStrategy.getEventName(event.participant1, event.participant2);
      default:
        throw new InvalidSportException();
    }
  }
}

const versusNamingStrategy = new VersusNamingStrategy();
const dashNamingStrategy = new DashNamingStrategy();
export const eventNameCreator = new EventNameCreator(dashNamingStrategy, versusNamingStrategy);
