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

  equals(c: Card): boolean {
    return this.number === c.number && this.suits === c.suits;
  }
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

  public cardExists(card: Card): boolean {
    const cardExists = this.cards.some((c) => c.equals(card));
    return cardExists;
  }

  validate(): boolean {
    return this.cards.length === 5;
  }
}
