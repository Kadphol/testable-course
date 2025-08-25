import { GameResult, Hand } from "../poker/hand";
import type { HandData } from "./data";

export class HandComparison {
  private handData: HandData;
  constructor(handData: HandData) {
    this.handData = handData;
  }
  compareHands(handId: string, anotherHandId: string): GameResult {
    let hand: Hand, anotherHand: Hand;
    try {
      hand = this.handData.getById(handId);
      anotherHand = this.handData.getById(anotherHandId);
    } catch (error) {
      throw new Error("Could not find hands");
    }

    if (!hand.validate() || !anotherHand.validate()) {
      throw new Error("Invalid hand");
    }

    const result = hand.compareHand(anotherHand);
    return result;
  }
}
