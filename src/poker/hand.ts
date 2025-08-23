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

  public compareHand(another: Hand): GameResult {
    // Implement comparison logic here
    return GameResult.Draw;
  }
}
