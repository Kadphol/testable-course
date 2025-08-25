import { describe, expect, it } from "bun:test";
import { GameResultView } from "./view";
import { GameResult } from "../poker/hand";

describe("GameResultView", () => {
  it("should return view with draw when GameResult is Draw", () => {
    const view = new GameResultView(GameResult.Draw);
    expect(view.result).toBe("draw");
  });

  it("should return view with win when GameResult is Win", () => {
    const view = new GameResultView(GameResult.Win);
    expect(view.result).toBe("win");
  });

  it("should return view with lose when GameResult is Lose", () => {
    const view = new GameResultView(GameResult.Lose);
    expect(view.result).toBe("lose");
  });
});
