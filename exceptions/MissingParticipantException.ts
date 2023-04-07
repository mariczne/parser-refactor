export class MissingParticipantException extends Error {
  constructor() {
    super("No participant");
  }
}
