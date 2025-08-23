import fs from "fs";
import { z, ZodError } from "zod";
import { Card, Hand, Suits } from "./poker/hand";

const schema = z.object({
  player1: z.array(
    z.object({
      suits: z.enum(["heart", "diamond", "club", "spade"]),
      number: z.number().min(2).max(14),
    }),
  ),
  player2: z.array(
    z.object({
      suits: z.enum(["heart", "diamond", "club", "spade"]),
      number: z.number().min(2).max(14),
    }),
  ),
});

export class Reader {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  private suiteFromString(suit: string): Suits {
    switch (suit) {
      case "heart":
        return Suits.Heart;
      case "diamond":
        return Suits.Diamond;
      case "club":
        return Suits.Club;
      case "spade":
        return Suits.Spade;
      default:
        throw new Error(`Invalid suit: ${suit}`);
    }
  }

  read(): Hand[] {
    if (!fs.existsSync(this.path)) {
      throw new Error("File not found");
    }
    try {
      const data = fs.readFileSync(this.path, "utf8");
      const parsedData = schema.parse(JSON.parse(data));

      const cards1: Card[] = [];
      parsedData.player1.forEach((card) =>
        cards1.push(new Card(this.suiteFromString(card.suits), card.number)),
      );

      const cards2: Card[] = [];
      parsedData.player2.forEach((card) =>
        cards2.push(new Card(this.suiteFromString(card.suits), card.number)),
      );

      return [new Hand(cards1), new Hand(cards2)];
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("not json");
      }
      if (error instanceof ZodError) {
        throw new Error("invalid json");
      }
      throw error;
    }
  }
}
