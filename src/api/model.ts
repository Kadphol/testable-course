import { GameResult } from "../poker/hand";

export class HandComparison {
  compareHands(handId: string, anotherHandId: string): GameResult {
    // Implement hand comparison logic here
    return GameResult.Win;
  }
}
