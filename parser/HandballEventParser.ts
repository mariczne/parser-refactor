import { ParseableMatch } from "../app";
import { SportEventParser } from "./SportEventParser";

export class HandballEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " vs " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    return String(match.score);
  }
}
