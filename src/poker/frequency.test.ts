import { describe, it, expect } from "bun:test";
import { Card, Suits } from "./hand";
import { Frequency } from "./frequency";

describe("Frequency", () => {
  it("should calculate frequency and card value sort by frequency", () => {
    const card = [
      new Card(Suits.Club, 14),
      new Card(Suits.Diamond, 14),
      new Card(Suits.Spade, 14),
      new Card(Suits.Spade, 14),
      new Card(Suits.Club, 11),
      new Card(Suits.Diamond, 11),
      new Card(Suits.Heart, 11),
    ];

    const result = new Frequency(card);
    expect(result.getFrequencySorted()).toEqual([4, 3]);
    expect(result.cardValueSortedByFrequency()).toEqual([14, 11]);
  });

  it("should sorted by value when frequency is equal", () => {
    const card = [
      new Card(Suits.Club, 14),
      new Card(Suits.Diamond, 2),
      new Card(Suits.Spade, 5),
      new Card(Suits.Spade, 11),
      new Card(Suits.Club, 8),
    ];

    const result = new Frequency(card);
    expect(result.getFrequencySorted()).toEqual([1, 1, 1, 1, 1]);
    expect(result.cardValueSortedByFrequency()).toEqual([14, 11, 8, 5, 2]);
  });

  it("should sorted by frequency then value when mixed", () => {
    const card = [
      new Card(Suits.Club, 14),
      new Card(Suits.Diamond, 2),
      new Card(Suits.Spade, 11),
      new Card(Suits.Spade, 11),
      new Card(Suits.Club, 11),
    ];

    const result = new Frequency(card);
    expect(result.getFrequencySorted()).toEqual([3, 1, 1]);
    expect(result.cardValueSortedByFrequency()).toEqual([11, 14, 2]);
  });

  it("should match pattern", () => {
    const card1 = [
      new Card(Suits.Heart, 10),
      new Card(Suits.Diamond, 10),
      new Card(Suits.Club, 10),
      new Card(Suits.Spade, 6),
      new Card(Suits.Heart, 6),
    ];

    const card2 = [
      new Card(Suits.Heart, 10),
      new Card(Suits.Diamond, 10),
      new Card(Suits.Club, 6),
      new Card(Suits.Spade, 6),
      new Card(Suits.Heart, 5),
    ];

    const card3 = [
      new Card(Suits.Heart, 10),
      new Card(Suits.Diamond, 10),
      new Card(Suits.Club, 6),
      new Card(Suits.Spade, 5),
      new Card(Suits.Heart, 4),
    ];

    const freq1 = new Frequency(card1);
    const freq2 = new Frequency(card2);
    const freq3 = new Frequency(card3);

    expect(freq1.isFrequencyMatch([3, 2])).toBeTruthy();
    expect(freq1.isFrequencyMatch([3, 1, 1])).toBeFalsy();

    expect(freq2.isFrequencyMatch([2, 2, 1])).toBeTruthy();
    expect(freq2.isFrequencyMatch([2, 1, 1, 1])).toBeFalsy();

    expect(freq3.isFrequencyMatch([2, 1, 1, 1])).toBeTruthy();
    expect(freq3.isFrequencyMatch([2, 2, 1])).toBeFalsy();
  });
});
