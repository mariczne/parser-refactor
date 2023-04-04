const SPORTS = {
  SOCCER: "soccer",
  VOLLEYBALL: "volleyball",
  HANDBALL: "handball",
  BASKETBALL: "basketball",
  TENNIS: "tennis",
} as const;

type Sport = typeof SPORTS[keyof typeof SPORTS];

type ParseableMatch = { sport: string } & Partial<{
  participant1: string;
  participant2: string;
  score: string | string[][];
}>;

export const matches: ParseableMatch[] = [
  {
    sport: "soccer",
    participant1: "Chelsea",
    participant2: "Arsenal",
    score: "2:1",
  },
  {
    sport: "volleyball",
    participant1: "Germany",
    participant2: "France",
    score: "3:0,25:23,25:19,25:21",
  },
  {
    sport: "handball",
    participant1: "Pogoń Szczeciń",
    participant2: "Azoty Puławy",
    score: "34:26",
  },
  {
    sport: "basketball",
    participant1: "GKS Tychy",
    participant2: "GKS Katowice",
    score: [
      ["9:7", "2:1"],
      ["5:3", "9:9"],
    ],
  },
  {
    sport: "tennis",
    participant1: "Maria Sharapova",
    participant2: "Serena Williams",
    score: "2:1,7:6,6:3,6:7",
  },
  {
    sport: "ski jumping",
  },
];

class InvalidSportException extends Error {
  constructor() {
    super("Invalid sport");
  }
}

class IncorrectScoreFormatException extends Error {
  constructor() {
    super("Invalid score format");
  }
}

interface SportEventParser {
  makeEventName(match: ParseableMatch): string;
  formatScore(match: ParseableMatch): string;
}

class SoccerEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " - " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    return String(match.score);
  }
}
class BasketballEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " - " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    if (!Array.isArray(match.score)) throw new IncorrectScoreFormatException();

    const [[Q1, Q2], [Q3, Q4]] = match.score;
    // Not showing the total score of a basketball game is a bit weird, though
    return Q1 + "," + Q2 + "," + Q3 + "," + Q4;
  }
}
class TennisEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " vs " + match.participant2;
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
class VolleyballEventParser implements SportEventParser {
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
class HandballEventParser implements SportEventParser {
  makeEventName(match: ParseableMatch) {
    return match.participant1 + " vs " + match.participant2;
  }
  formatScore(match: ParseableMatch) {
    return String(match.score);
  }
}

export class EventParser {
  private PARSERS_MAP: Record<Sport, SportEventParser> = {
    [SPORTS.SOCCER]: new SoccerEventParser,
    [SPORTS.BASKETBALL]: new BasketballEventParser,
    [SPORTS.HANDBALL]: new HandballEventParser,
    [SPORTS.TENNIS]: new TennisEventParser,
    [SPORTS.VOLLEYBALL]: new VolleyballEventParser,
  };
  private parser: SportEventParser;

  constructor(private readonly match: ParseableMatch) {
    this.parser = this.getParser();
  }

  getParser() {
    const parser = this.PARSERS_MAP[this.match.sport as Sport];
    if (!parser) throw new InvalidSportException();
    return parser;
  }

  makeEventName() {
    return this.parser.makeEventName(this.match);
  }

  formatScore() {
    return this.parser.formatScore(this.match);
  }
}

let matchesParsed = [];

for (const match of matches) {
  try {
    const parser = new EventParser(match);
    const name = parser.makeEventName();
    const score = parser.formatScore();

    matchesParsed.push({
      name,
      score,
    });
  } catch {}
}

console.log(matchesParsed);
