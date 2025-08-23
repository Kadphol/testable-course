import { describe, expect, it } from "bun:test";
import { Card, GameResult, Hand, Suits } from "./hand";

describe("Hand", () => {
  describe("compare hands", () => {
    it("should compare hands, different rank", () => {
      const hand1 = new Hand([
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
      ]);

      const hand2 = new Hand([
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 9),
      ]);

      expect(hand1.compareHand(hand2)).toEqual(GameResult.Win);
      expect(hand2.compareHand(hand1)).toEqual(GameResult.Lose);
    });

    it("should compare hands, same rank", () => {
      const hand1 = new Hand([
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
      ]);

      const hand2 = new Hand([
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
        new Card(Suits.Heart, 9),
      ]);

      expect(hand1.compareHand(hand2)).toEqual(GameResult.Win);
      expect(hand2.compareHand(hand1)).toEqual(GameResult.Lose);
    });

    it("should compare hands with draw", () => {
      const hand1 = new Hand([
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
      ]);

      const hand2 = new Hand([
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
      ]);

      expect(hand1.compareHand(hand2)).toEqual(GameResult.Draw);
      expect(hand2.compareHand(hand1)).toEqual(GameResult.Draw);
    });
  });
});
