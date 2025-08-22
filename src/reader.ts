import fs from "fs";
import { z, ZodError } from "zod";

const schema = z.object({
  player1: z.array(
    z.object({
      suits: z.enum(["heart", "diamond", "club", "spade"]),
      rank: z.number().min(2).max(14),
    }),
  ),
  player2: z.array(
    z.object({
      suits: z.enum(["heart", "diamond", "club", "spade"]),
      rank: z.number().min(2).max(14),
    }),
  ),
});

export class Reader {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  read() {
    if (!fs.existsSync(this.path)) {
      throw new Error(`File not found: ${this.path}`);
    }
    try {
      const data = fs.readFileSync(this.path, "utf8");
      const parsedData = schema.parse(JSON.parse(data));
      return parsedData;
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
