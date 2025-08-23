import { GameResult } from "./poker/hand";
import { describe, expect, it } from "bun:test";
import { printResult } from "./printer";

describe("printResult", () => {
  it("should return the correct message for each result", () => {
    expect(printResult(GameResult.Win)).toBe("Player 1 win!");
    expect(printResult(GameResult.Lose)).toBe("Player 2 win!");
    expect(printResult(GameResult.Draw)).toBe("It's a Draw!");
  });
});
