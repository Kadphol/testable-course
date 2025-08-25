import { describe, expect, it } from "bun:test";
import { Database } from "bun:sqlite";
import { HandData } from "./data";
import * as uuid from "uuid";
import { Card, Suits } from "../poker/hand";

describe("HandData", () => {
  it("should return Hand when getById", () => {
    const db = new Database("test.sqlite");
    const handId = uuid.v4();
    const handData = new HandData(db);
    handData.initDb();

    db.run(`
      INSERT INTO hands (id) VALUES ("${handId}");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "${handId}", 13, "heart");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "${handId}", 12, "diamond");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "${handId}", 13, "club");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "${handId}", 13, "spade");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "${handId}", 10, "spade");
      INSERT INTO cards (id, handId, number, suit) VALUES
        ("${uuid.v4()}", "randomHandId", 11, "spade");
    `);

    const hand = handData.getById(handId);
    expect(hand.cards.length).toEqual(5);
    expect(hand.cardExists(new Card(Suits.Heart, 13))).toBe(true);
    expect(hand.cardExists(new Card(Suits.Diamond, 12))).toBe(true);
    expect(hand.cardExists(new Card(Suits.Club, 13))).toBe(true);
    expect(hand.cardExists(new Card(Suits.Spade, 13))).toBe(true);
    expect(hand.cardExists(new Card(Suits.Spade, 10))).toBe(true);

    // Cleanup
    db.run(`DELETE FROM hands;
          DELETE FROM cards;`);
  });

  it("GetById throw error 'object not found' when hands is not exists", () => {
    const db = new Database("test.sqlite");

    const handId = "not_exists_id";
    const handData = new HandData(db);
    handData.initDb();

    expect(() => handData.getById(handId)).toThrowError("Object not found");
  });
});
