export enum CardValue {
  A,
  K,
  Q,
  J,
  TEN,
  NINE,
  EIGHT,
  SEVEN,
  SIX,
  FIVE,
  FOUR,
  THREE,
  TWO,
}

export enum CardSuit {
  DIAMONDS = 'DIAMONDS',
  CLUBS = 'CLUBS',
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
}

export const ALL_SUITS = [CardSuit.DIAMONDS, CardSuit.CLUBS, CardSuit.HEARTS, CardSuit.SPADES];

const CARD_REPRESENTATION = {
  [CardValue.A]: { numVal: 11, strVal: 'ACE' },
  [CardValue.K]: { numVal: 10, strVal: 'KING' },
  [CardValue.Q]: { numVal: 10, strVal: 'QUEEN' },
  [CardValue.J]: { numVal: 10, strVal: 'JACK' },
  [CardValue.TEN]: { numVal: 10, strVal: '10' },
  [CardValue.NINE]: { numVal: 9, strVal: '9' },
  [CardValue.EIGHT]: { numVal: 8, strVal: '8' },
  [CardValue.SEVEN]: { numVal: 7, strVal: '7' },
  [CardValue.SIX]: { numVal: 6, strVal: '6' },
  [CardValue.FIVE]: { numVal: 5, strVal: '5' },
  [CardValue.FOUR]: { numVal: 4, strVal: '4' },
  [CardValue.THREE]: { numVal: 3, strVal: '3' },
  [CardValue.TWO]: { numVal: 2, strVal: '2' },
}

const NUMERICAL_VAL_CARD_VAL_MAP = {
  11: [CardValue.A],
  10: [CardValue.K, CardValue.Q, CardValue.J, CardValue.TEN],
  9: [CardValue.NINE],
  8: [CardValue.EIGHT],
  7: [CardValue.SEVEN],
  6: [CardValue.SIX],
  5: [CardValue.FIVE],
  4: [CardValue.FOUR],
  3: [CardValue.THREE],
  2: [CardValue.TWO],
}

export class Card {
  value: CardValue;
  suit: CardSuit;
  numericalValue: number;

  constructor(value: CardValue, suit: CardSuit) {
    this.value = value;
    this.numericalValue = CARD_REPRESENTATION[value].numVal;
    this.suit = suit;
  }

  isAce() {
    return this.value === CardValue.A;
  }

  toString() {
    return `${CARD_REPRESENTATION[this.value].strVal}_of_${this.suit}`.toLowerCase();
  }
}

export class CardFactory {
  static getCard(val: CardValue, suit: CardSuit) {
    return new Card(val, suit);
  }

  static getCardByNumericalValue(numVal: number, suit: CardSuit | undefined) {
    if (numVal < 2 || numVal > 11) {
      throw Error('Invalid numVal');
    }

    const possibleCardValues = NUMERICAL_VAL_CARD_VAL_MAP[numVal as keyof typeof NUMERICAL_VAL_CARD_VAL_MAP];
    return new Card(
      possibleCardValues[Math.floor(Math.random() * possibleCardValues.length)],
      suit ?? ALL_SUITS[Math.floor(Math.random() * ALL_SUITS.length)]
    );
  }
}
