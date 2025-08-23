import { describe, it, expect } from "bun:test";
import { Reader } from "./reader";
import path from "path";
import { Suits } from "./poker/hand";

describe("reader", () => {
  it("should read a file", () => {
    const reader = new Reader(
      path.join(__dirname, "../test_input/sample.json"),
    );
    const actual = reader.read();
    expect(actual).toHaveLength(2);

    const [hand1, hand2] = actual;
    expect(hand1?.cards).toHaveLength(5);
    expect(hand2?.cards).toHaveLength(5);

    expect(hand1?.cards[0]?.suits).toEqual(Suits.Spade);
    expect(hand1?.cards[0]?.number).toEqual(3);

    expect(hand1?.cards[1]?.suits).toEqual(Suits.Spade);
    expect(hand1?.cards[1]?.number).toEqual(4);

    expect(hand1?.cards[2]?.suits).toEqual(Suits.Spade);
    expect(hand1?.cards[2]?.number).toEqual(5);

    expect(hand1?.cards[3]?.suits).toEqual(Suits.Spade);
    expect(hand1?.cards[3]?.number).toEqual(12);

    expect(hand1?.cards[4]?.suits).toEqual(Suits.Spade);
    expect(hand1?.cards[4]?.number).toEqual(11);

    expect(hand2?.cards[0]?.suits).toEqual(Suits.Diamond);
    expect(hand2?.cards[0]?.number).toEqual(3);

    expect(hand2?.cards[1]?.suits).toEqual(Suits.Spade);
    expect(hand2?.cards[1]?.number).toEqual(3);

    expect(hand2?.cards[2]?.suits).toEqual(Suits.Heart);
    expect(hand2?.cards[2]?.number).toEqual(3);

    expect(hand2?.cards[3]?.suits).toEqual(Suits.Heart);
    expect(hand2?.cards[3]?.number).toEqual(12);

    expect(hand2?.cards[4]?.suits).toEqual(Suits.Club);
    expect(hand2?.cards[4]?.number).toEqual(10);
  });

  it("should throw an error when file does not exist", () => {
    const reader = new Reader(
      path.join(__dirname, "../test_input/nonexistent.json"),
    );
    expect(() => reader.read()).toThrowError("File not found");
  });

  it("should throw an error when file is invalid JSON type", () => {
    const reader = new Reader(
      path.join(__dirname, "../test_input/sample_invalid_format.txt"),
    );
    expect(() => reader.read()).toThrowError("not json");
  });

  it("should throw an error when file is not valid JSON file", () => {
    const reader = new Reader(
      path.join(__dirname, "../test_input/sample_invalid_json_format.json"),
    );
    expect(() => reader.read()).toThrowError("invalid json");
  });
});
