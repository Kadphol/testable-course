export enum Suites {
  Spade,
  Heart,
  Diamond,
  Club,
}

export class Card {
  constructor(
    public suite: Suites,
    public number: number,
  ) {}
}

export class Hand {
  public cards: Card[] = [];

  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
