export class NoParticipantException extends Error {
  constructor() {
    super("No participant");
  }
}
