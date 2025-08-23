import type { Card } from "./hand";

type FrequencyMap = { [key: string]: number };

export class Frequency {
  private cardMap: FrequencyMap;
  constructor(cards: Card[]) {
    const cardMap: FrequencyMap = {};
    for (const card of cards) {
      cardMap[card.number] = (cardMap[card.number] || 0) + 1;
    }
    this.cardMap = cardMap;
  }

  getFrequencySorted(): number[] {
    return Object.values(this.cardMap).sort().reverse();
  }

  private getCardValue(): number[] {
    return Object.keys(this.cardMap).map((key) => parseInt(key));
  }

  cardValueSortedByFrequency(): number[] {
    const cardValues = this.getCardValue();
    return cardValues.sort((b, a) => {
      if ((this.cardMap[a] || 0) < (this.cardMap[b] || 0)) return -1;
      if ((this.cardMap[a] || 0) > (this.cardMap[b] || 0)) return 1;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  isFrequencyMatch(match: number[]): boolean {
    const sortedMatch = match.sort().reverse();
    const sortedFrequency = this.getFrequencySorted();
    if (sortedMatch.length !== sortedFrequency.length) return false;

    for (let i = 0; i < sortedFrequency.length; i++) {
      if (sortedMatch[i] !== sortedFrequency[i]) return false;
    }

    return true;
  }
}
