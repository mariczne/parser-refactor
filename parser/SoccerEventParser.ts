import { ParseableMatch } from "../app";
import { SportEventParser } from "./SportEventParser";

export class SoccerEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " - " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    return String(match.score);
  }
}