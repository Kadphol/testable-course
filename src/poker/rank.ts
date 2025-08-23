import { Frequency } from "./frequency";
import { Card, GameResult, Hand } from "./hand";

export enum Rank {
  HIGH_CARD = 0,
  ONE_PAIR = 1,
  TWO_PAIR = 2,
  THREE_OF_A_KIND = 3,
  STRAIGHT = 4,
  FLUSH = 5,
  FULL_HOUSE = 6,
  FOUR_OF_A_KIND = 7,
  STRAIGHT_FLUSH = 8,
  ROYAL_FLUSH = 9,
}

export function checkStraight(card: Card[]): boolean {
  for (let i = 1; i < card.length; i++) {
    if (card[i - 1]?.number !== (card[i]?.number || 0) + 1) {
      // check if Ace is followed by 5
      if (i === 0 && card[i - 1]?.number === 14 && card[i]?.number === 5) {
        continue;
      }
      return false;
    }
  }
  return true;
}

export function checkFlush(cards: Card[]): boolean {
  const suit = cards[0]?.suits;
  for (const card of cards) {
    if (card.suits !== suit) {
      return false;
    }
  }
  return true;
}

export function handRankFromHand(hand: Hand): HandRank {
  const sortedCards = hand.cards.sort((a, b) => b.number - a.number);

  const isStraight = checkStraight(sortedCards);
  const isFlush = checkFlush(sortedCards);
  const cardFrequency = new Frequency(sortedCards);

  if (isStraight && isFlush) {
    if (sortedCards[0]?.number === 14 && sortedCards[4]?.number === 10) {
      return new HandRank(
        Rank.ROYAL_FLUSH,
        cardFrequency.cardValueSortedByFrequency(),
      );
    }
    return new HandRank(
      Rank.STRAIGHT_FLUSH,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (cardFrequency.isFrequencyMatch([4, 1])) {
    return new HandRank(
      Rank.FOUR_OF_A_KIND,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (cardFrequency.isFrequencyMatch([3, 2])) {
    return new HandRank(
      Rank.FULL_HOUSE,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (isFlush) {
    return new HandRank(Rank.FLUSH, cardFrequency.cardValueSortedByFrequency());
  }

  if (isStraight) {
    return new HandRank(
      Rank.STRAIGHT,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (cardFrequency.isFrequencyMatch([3, 1, 1])) {
    return new HandRank(
      Rank.THREE_OF_A_KIND,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (cardFrequency.isFrequencyMatch([2, 2, 1])) {
    return new HandRank(
      Rank.TWO_PAIR,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  if (cardFrequency.isFrequencyMatch([2, 1, 1, 1])) {
    return new HandRank(
      Rank.ONE_PAIR,
      cardFrequency.cardValueSortedByFrequency(),
    );
  }

  return new HandRank(
    Rank.HIGH_CARD,
    cardFrequency.cardValueSortedByFrequency(),
  );
}

export class HandRank {
  private rank: Rank;
  private highs: number[];

  constructor(rank: Rank, highs: number[]) {
    this.rank = rank;
    this.highs = highs;
  }

  public compare(other: HandRank): GameResult {
    const otherRank = other.getRank();
    if (this.rank > otherRank) {
      return GameResult.Win;
    } else if (this.rank < otherRank) {
      return GameResult.Lose;
    }

    const anotherHighs = other.getHighs();
    for (let i = 0; i < this.highs.length; i++) {
      const thisHigh = this.getHighs()[i] || 0;
      const otherHigh = anotherHighs[i] || 0;
      if (thisHigh > otherHigh) {
        return GameResult.Win;
      } else if (thisHigh < otherHigh) {
        return GameResult.Lose;
      }
    }
    return GameResult.Draw;
  }

  public getRank(): Rank {
    return this.rank;
  }

  public getHighs(): number[] {
    return this.highs;
  }
}
