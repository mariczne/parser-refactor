import { IncorrectScoreFormatException } from "../exceptions/IncorrectScoreFormatException";
import { EventScoreFormattingStrategy } from "./EventScoreFormattingStrategy";

export class TennisLikeScoreFormattingStrategy
  implements EventScoreFormattingStrategy
{
  formatEventScore(score: string | string[][] | undefined): string {
    if (typeof score !== "string")
    throw new IncorrectScoreFormatException();

  const scores =
    /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(
      score
    );
  if (!scores || scores.length < 5)
    throw new IncorrectScoreFormatException();

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
