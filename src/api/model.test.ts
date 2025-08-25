import { describe, expect, it, mock } from "bun:test";
import { Database } from "bun:sqlite";
import { HandData } from "./data";
import { HandComparison } from "./model";
import { Card, GameResult, Hand, Suits } from "../poker/hand";

describe("HandComparison", () => {
  it("should throw hand not found when hands is not exists", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getById = mock(() => {
      throw new Error("Object not found");
    });

    const handCompare = new HandComparison(handData);
    expect(() => handCompare.compareHands("123", "456")).toThrowError(
      "Could not find hands",
    );
  });

  it("should throw invalid hand when hand is not valid", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getById = mock(() => {
      return new Hand([new Card(Suits.Diamond, 12)]);
    });

    const handCompare = new HandComparison(handData);
    expect(() => handCompare.compareHands("123", "456")).toThrowError(
      "Invalid hand",
    );
  });

  it("should return win result when player1 wins", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getById = mock((handId) => {
      if (handId === "123")
        return new Hand([
          new Card(Suits.Diamond, 10),
          new Card(Suits.Diamond, 11),
          new Card(Suits.Diamond, 12),
          new Card(Suits.Diamond, 13),
          new Card(Suits.Diamond, 14),
        ]);
      else
        return new Hand([
          new Card(Suits.Diamond, 10),
          new Card(Suits.Heart, 11),
          new Card(Suits.Spade, 12),
          new Card(Suits.Diamond, 13),
          new Card(Suits.Club, 14),
        ]);
    });

    const handCompare = new HandComparison(handData);
    expect(handCompare.compareHands("123", "456")).toBe(GameResult.Win);
  });

  it("should return lose result when player1 lose", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getById = mock((handId) => {
      if (handId === "123")
        return new Hand([
          new Card(Suits.Diamond, 10),
          new Card(Suits.Heart, 11),
          new Card(Suits.Spade, 12),
          new Card(Suits.Diamond, 13),
          new Card(Suits.Club, 14),
        ]);
      else
        return new Hand([
          new Card(Suits.Diamond, 10),
          new Card(Suits.Diamond, 11),
          new Card(Suits.Diamond, 12),
          new Card(Suits.Diamond, 13),
          new Card(Suits.Diamond, 14),
        ]);
    });

    const handCompare = new HandComparison(handData);
    expect(handCompare.compareHands("123", "456")).toBe(GameResult.Lose);
  });

  it("should return draw result when player1 and player2 have same hand", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getById = mock(() => {
      return new Hand([
        new Card(Suits.Diamond, 10),
        new Card(Suits.Heart, 11),
        new Card(Suits.Spade, 12),
        new Card(Suits.Diamond, 13),
        new Card(Suits.Club, 14),
      ]);
    });

    const handCompare = new HandComparison(handData);
    expect(handCompare.compareHands("123", "456")).toBe(GameResult.Draw);
  });
});
