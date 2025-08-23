import { describe, it, expect } from "bun:test";
import { HandRank, handRankFromHand, Rank } from "./rank";
import { Card, GameResult, Hand, Suits } from "./hand";

const allRanks = [
  Rank.HIGH_CARD,
  Rank.ONE_PAIR,
  Rank.TWO_PAIR,
  Rank.THREE_OF_A_KIND,
  Rank.STRAIGHT,
  Rank.FLUSH,
  Rank.FULL_HOUSE,
  Rank.FOUR_OF_A_KIND,
  Rank.STRAIGHT_FLUSH,
  Rank.ROYAL_FLUSH,
];
function allRankExcept(excepts: Rank[]) {
  return allRanks.filter((c) => !excepts.includes(c));
}

describe("Rank", () => {
  describe("compare Rank", () => {
    it("royal straight flush", () => {
      const toWin = allRankExcept([Rank.ROYAL_FLUSH]);
      const testingRank = Rank.ROYAL_FLUSH;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
    });
    it("straight flush", () => {
      const toWin = allRankExcept([Rank.ROYAL_FLUSH, Rank.STRAIGHT_FLUSH]);
      const toLose: Rank[] = [Rank.ROYAL_FLUSH];
      const testingRank = Rank.STRAIGHT_FLUSH;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("four of a kind", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
      ]);
      const toLose: Rank[] = [Rank.STRAIGHT_FLUSH, Rank.ROYAL_FLUSH];
      const testingRank = Rank.FOUR_OF_A_KIND;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("full house", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
      ];
      const testingRank = Rank.FULL_HOUSE;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("flush", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
      ];
      const testingRank = Rank.FLUSH;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("straight", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
      ];
      const testingRank = Rank.STRAIGHT;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("three of a kind", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
      ];
      const testingRank = Rank.THREE_OF_A_KIND;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("two pair", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
        Rank.TWO_PAIR,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
      ];
      const testingRank = Rank.TWO_PAIR;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("one pair", () => {
      const toWin = allRankExcept([
        Rank.ROYAL_FLUSH,
        Rank.STRAIGHT_FLUSH,
        Rank.FOUR_OF_A_KIND,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
        Rank.TWO_PAIR,
        Rank.ONE_PAIR,
      ]);
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
        Rank.TWO_PAIR,
      ];
      const testingRank = Rank.ONE_PAIR;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    it("high card", () => {
      const toLose: Rank[] = [
        Rank.FOUR_OF_A_KIND,
        Rank.STRAIGHT_FLUSH,
        Rank.ROYAL_FLUSH,
        Rank.FULL_HOUSE,
        Rank.FLUSH,
        Rank.STRAIGHT,
        Rank.THREE_OF_A_KIND,
        Rank.TWO_PAIR,
      ];
      const testingRank = Rank.HIGH_CARD;

      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });
  });

  describe.each([[Rank.FULL_HOUSE], [Rank.FOUR_OF_A_KIND]])(
    "Same rank, compare high",
    (rank) => {
      it("When high is higher, this hand win", () => {
        const thisHand = new HandRank(rank, [10, 3]);
        const otherHand = new HandRank(rank, [9, 2]);
        expect(thisHand.compare(otherHand)).toEqual(GameResult.Win);
      });
      it("When high is lower, this hand lose", () => {
        const thisHand = new HandRank(rank, [9, 2]);
        const otherHand = new HandRank(rank, [10, 3]);
        expect(thisHand.compare(otherHand)).toEqual(GameResult.Lose);
      });
      it("When high is equal, compare low", () => {
        const thisHand = new HandRank(rank, [10, 3]);
        const otherHand = new HandRank(rank, [10, 2]);
        expect(thisHand.compare(otherHand)).toEqual(GameResult.Win);
      });
      it("When high is equal, return draw", () => {
        const thisHand = new HandRank(rank, [10, 3]);
        const otherHand = new HandRank(rank, [10, 3]);
        expect(thisHand.compare(otherHand)).toEqual(GameResult.Draw);
      });
    },
  );

  describe("hand to rank", () => {
    it("should determined royal straight flush", () => {
      const royalStraightFlush = [
        new Card(Suits.Heart, 14),
        new Card(Suits.Heart, 13),
        new Card(Suits.Heart, 12),
        new Card(Suits.Heart, 11),
        new Card(Suits.Heart, 10),
      ];
      const hand = new Hand(royalStraightFlush);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.ROYAL_FLUSH);
      expect(result.getHighs()).toEqual([14, 13, 12, 11, 10]);
    });

    it("should determined straight flush", () => {
      const straightFlush = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Heart, 9),
        new Card(Suits.Heart, 8),
        new Card(Suits.Heart, 7),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(straightFlush);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.STRAIGHT_FLUSH);
      expect(result.getHighs()).toEqual([10, 9, 8, 7, 6]);
    });

    it("should determined four of a kind", () => {
      const fourOfAKind = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 10),
        new Card(Suits.Club, 10),
        new Card(Suits.Spade, 10),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(fourOfAKind);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.FOUR_OF_A_KIND);
      expect(result.getHighs()).toEqual([10, 6]);
    });

    it("should determined full house", () => {
      const fullHouse = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 10),
        new Card(Suits.Club, 10),
        new Card(Suits.Spade, 6),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(fullHouse);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.FULL_HOUSE);
      expect(result.getHighs()).toEqual([10, 6]);
    });

    it("should determined flush", () => {
      const flush = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Heart, 2),
        new Card(Suits.Heart, 4),
        new Card(Suits.Heart, 7),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(flush);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.FLUSH);
      expect(result.getHighs()).toEqual([10, 7, 6, 4, 2]);
    });

    it("should determined straight", () => {
      const straight = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 9),
        new Card(Suits.Club, 8),
        new Card(Suits.Spade, 7),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(straight);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.STRAIGHT);
      expect(result.getHighs()).toEqual([10, 9, 8, 7, 6]);
    });

    it("should determined three of a kind", () => {
      const threeOfAKind = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 10),
        new Card(Suits.Club, 10),
        new Card(Suits.Spade, 6),
        new Card(Suits.Heart, 5),
      ];
      const hand = new Hand(threeOfAKind);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.THREE_OF_A_KIND);
      expect(result.getHighs()).toEqual([10, 6, 5]);
    });

    it("should determined two pairs", () => {
      const twoPairs = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 10),
        new Card(Suits.Club, 6),
        new Card(Suits.Spade, 6),
        new Card(Suits.Heart, 5),
      ];
      const hand = new Hand(twoPairs);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.TWO_PAIR);
      expect(result.getHighs()).toEqual([10, 6, 5]);
    });

    it("should determined one pair", () => {
      const onePair = [
        new Card(Suits.Heart, 10),
        new Card(Suits.Diamond, 10),
        new Card(Suits.Club, 6),
        new Card(Suits.Spade, 5),
        new Card(Suits.Heart, 4),
      ];
      const hand = new Hand(onePair);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.ONE_PAIR);
      expect(result.getHighs()).toEqual([10, 6, 5, 4]);
    });

    it("should determined high cards", () => {
      const highCards = [
        new Card(Suits.Heart, 14),
        new Card(Suits.Diamond, 9),
        new Card(Suits.Club, 8),
        new Card(Suits.Spade, 7),
        new Card(Suits.Heart, 6),
      ];
      const hand = new Hand(highCards);
      const result = handRankFromHand(hand);
      expect(result.getRank()).toEqual(Rank.HIGH_CARD);
      expect(result.getHighs()).toEqual([14, 9, 8, 7, 6]);
    });
  });
});
