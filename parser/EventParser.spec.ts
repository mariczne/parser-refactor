import { eventParser } from "./EventParser"

test("should return an object containing name and score fields with correct values", () => {
  const event = {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  }

  const parsedEvent = eventParser.parseEvent(event)
  expect(parsedEvent).toHaveProperty("name", "Chelsea - Arsenal")
  expect(parsedEvent).toHaveProperty("score", "2:1")
})