import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { MissingParticipantException } from "../../exceptions/MissingParticipantException";
import { eventNameCreator } from "./EventNameCreator";

test("should throw when sport is not valid", () => {
  const event = { sport: "american football", participant1: "Raccoons", participant2: "Kittens" };

  expect(() => eventNameCreator.getEventName(event)).toThrowError(new InvalidSportException());
});

test("should throw when there is a missing participant", () => {
  const event = { sport: "soccer", participant1: "Lublinianka" };

  expect(() => eventNameCreator.getEventName(event)).toThrowError(new MissingParticipantException());
});

test("should correctly format a versus style name", () => {
  const event = { sport: "tennis", participant1: "Andre Agassi", participant2: "Iga Swiatek" };
  const formattedName = eventNameCreator.getEventName(event)
  const expectedResult = "Andre Agassi vs Iga Swiatek"

  expect(formattedName).toEqual(expectedResult)
})

test("should correctly format a dash-separated name", () => {
  const event = { sport: "soccer", participant1: "Lublinianka", participant2: "Spartakus Szarowola" };
  const formattedName = eventNameCreator.getEventName(event)
  const expectedResult = "Lublinianka - Spartakus Szarowola"

  expect(formattedName).toEqual(expectedResult)
})