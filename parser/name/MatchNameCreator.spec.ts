import { InvalidSportException } from "../../exceptions/InvalidSportException";
import { MissingParticipantException } from "../../exceptions/MissingParticipantException";
import { matchNameCreator } from "./MatchNameCreator";

test("should throw when sport is not valid", () => {
  const match = { sport: "american football", participant1: "Raccoons", participant2: "Kittens" };

  expect(() => matchNameCreator.getMatchName(match)).toThrowError(new InvalidSportException());
});

test("should throw when there is a missing participant", () => {
  const match = { sport: "soccer", participant1: "Lublinianka" };

  expect(() => matchNameCreator.getMatchName(match)).toThrowError(new MissingParticipantException());
});

test("should correctly format a versus style name", () => {
  const match = { sport: "tennis", participant1: "Andre Agassi", participant2: "Iga Swiatek" };
  const formattedName = matchNameCreator.getMatchName(match)
  const expectedResult = "Andre Agassi vs Iga Swiatek"

  expect(formattedName).toEqual(expectedResult)
})

test("should correctly format a dash-separated name", () => {
  const match = { sport: "soccer", participant1: "Lublinianka", participant2: "Spartakus Szarowola" };
  const formattedName = matchNameCreator.getMatchName(match)
  const expectedResult = "Lublinianka - Spartakus Szarowola"

  expect(formattedName).toEqual(expectedResult)
})