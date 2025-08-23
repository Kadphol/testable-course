import { handRankFromHand } from "./rank";

export enum Suits {
  Spade,
  Heart,
  Diamond,
  Club,
}

export enum GameResult {
  Win,
  Lose,
  Draw,
}

export class Card {
  constructor(
    public suits: Suits,
    public number: number,
  ) {}
}

export class Hand {
  public cards: Card[] = [];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  public compareHand(other: Hand): GameResult {
    const thisRank = handRankFromHand(this);
    const otherRank = handRankFromHand(other);
    return thisRank.compare(otherRank);
  }
}
