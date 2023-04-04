import { ParseableMatch } from "../app";

export interface SportEventParser {
  makeEventName(match: ParseableMatch): string;
  formatScore(match: ParseableMatch): string;
}