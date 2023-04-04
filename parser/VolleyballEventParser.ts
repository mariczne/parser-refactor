import { ParseableMatch } from "../app";
import { IncorrectScoreFormatException } from "../exceptions/IncorrectScoreFormatException";
import { SportEventParser } from "./SportEventParser";

export class VolleyballEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " - " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    if (typeof match.score !== "string")
      throw new IncorrectScoreFormatException();

    const scores =
      /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(
        match.score
      );
    if (!scores || scores.length < 5) throw new IncorrectScoreFormatException();

    const mainScore = scores[1];
    const set1 = scores[2];
    const set2 = scores[3];
    const set3 = scores[4];

    return (
      "Main score: " +
      mainScore +
      " (" +
      "set1 " +
      set1 +
      ", " +
      "set2 " +
      set2 +
      ", " +
      "set3 " +
      set3 +
      ")"
    );
  }
}