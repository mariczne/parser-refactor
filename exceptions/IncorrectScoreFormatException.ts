export class IncorrectScoreFormatException extends Error {
  constructor() {
    super("Invalid score format");
  }
}