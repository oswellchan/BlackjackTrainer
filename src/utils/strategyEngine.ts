import { Action } from './common';
import { ALL_SUITS, Card, CardFactory } from './card';

interface Strategy {
  [key: string]: Actions;
}

interface Actions {
  [key: string]: Action[];
}

export interface StrategyCase {
  hand: Card[];
  dealerCard: Card;
}

// https://en.wikipedia.org/wiki/Blackjack#Basic_strategy
export const HIT_17_STRATEGY = {
  H21: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  H20: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  H19: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  H18: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  H17: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.SURRENDER, Action.STAND]},
  H16: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.SURRENDER, Action.HIT], 10: [Action.SURRENDER, Action.HIT], 11: [Action.SURRENDER, Action.HIT]},
  H15: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.SURRENDER, Action.HIT], 11: [Action.SURRENDER, Action.HIT]},
  H14: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H13: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H12: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H11: {2: [Action.DOUBLE, Action.HIT], 3: [Action.DOUBLE, Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.DOUBLE, Action.HIT], 8: [Action.DOUBLE, Action.HIT], 9: [Action.DOUBLE, Action.HIT], 10: [Action.DOUBLE, Action.HIT], 11: [Action.DOUBLE, Action.HIT]},
  H10: {2: [Action.DOUBLE, Action.HIT], 3: [Action.DOUBLE, Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.DOUBLE, Action.HIT], 8: [Action.DOUBLE, Action.HIT], 9: [Action.DOUBLE, Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H9: {2: [Action.HIT], 3: [Action.DOUBLE, Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H8: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.HIT], 6: [Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H7: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.HIT], 6: [Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H6: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.HIT], 6: [Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  H5: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.HIT], 6: [Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A9: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  A8: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.DOUBLE, Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  A7: {2: [Action.DOUBLE, Action.STAND], 3: [Action.DOUBLE, Action.STAND], 4: [Action.DOUBLE, Action.STAND], 5: [Action.DOUBLE, Action.STAND], 6: [Action.DOUBLE, Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A6: {2: [Action.HIT], 3: [Action.DOUBLE, Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A5: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A4: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A3: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  A2: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  PA: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.SPLIT], 8: [Action.SPLIT], 9: [Action.SPLIT], 10: [Action.SPLIT], 11: [Action.SPLIT]},
  P10: {2: [Action.STAND], 3: [Action.STAND], 4: [Action.STAND], 5: [Action.STAND], 6: [Action.STAND], 7: [Action.STAND], 8: [Action.STAND], 9: [Action.STAND], 10: [Action.STAND], 11: [Action.STAND]},
  P9: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.STAND], 8: [Action.SPLIT], 9: [Action.SPLIT], 10: [Action.STAND], 11: [Action.STAND]},
  P8: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.SPLIT], 8: [Action.SPLIT], 9: [Action.SPLIT], 10: [Action.SPLIT], 11: [Action.SURRENDER, Action.SPLIT]},
  P7: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.SPLIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  P6: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  P5: {2: [Action.DOUBLE, Action.HIT], 3: [Action.DOUBLE, Action.HIT], 4: [Action.DOUBLE, Action.HIT], 5: [Action.DOUBLE, Action.HIT], 6: [Action.DOUBLE, Action.HIT], 7: [Action.DOUBLE, Action.HIT], 8: [Action.DOUBLE, Action.HIT], 9: [Action.DOUBLE, Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  P4: {2: [Action.HIT], 3: [Action.HIT], 4: [Action.HIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.HIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  P3: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.SPLIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
  P2: {2: [Action.SPLIT], 3: [Action.SPLIT], 4: [Action.SPLIT], 5: [Action.SPLIT], 6: [Action.SPLIT], 7: [Action.SPLIT], 8: [Action.HIT], 9: [Action.HIT], 10: [Action.HIT], 11: [Action.HIT]},
}

export class StrategyEngine {
  strategy: Strategy = HIT_17_STRATEGY;

  getCorrectActions(hand: Card[], dealerCard: Card) {
    const handMapping = this.getHandMapping(hand);

    if (!(handMapping in this.strategy)) {
      throw Error(`Unknown hand: ${handMapping}`);
    }

    return this.strategy[handMapping][dealerCard.numericalValue];
  }

  getHandMapping(hand: Card[]) {
    let handMapping = '';
    if (this.isSplit(hand)) {
      handMapping = `P${hand[0].isAce() ? 'A' : hand[0].numericalValue}`;
    } else if (this.isSoftTotal(hand)) {
      const aces = [];
      const others = [];

      for (const card of hand) {
        if (card.isAce()) {
          aces.push(card);
        } else {
          others.push(card);
        }
      }

      const hardTotal = this.getMinHandValue(others) + aces.length - 1;
      handMapping = `A${hardTotal}`;
    } else {
      handMapping = `H${this.getMinHandValue(hand)}`
    }

    return handMapping;
  }

  isSplit(hand: Card[]) {
    return hand.length == 2 && hand[0].numericalValue == hand[1].numericalValue;
  }

  isSoftTotal(hand: Card[]) {
    if (!hand.some(card => card.isAce())) {
      return false;
    }
    return this.getMinHandValue(hand) <= 21;
  }

  getMinHandValue(hand: Card[]) {
    return hand.reduce((total, card) => {
      return total + (card.isAce() ? 1 : card.numericalValue);
    }, 0);
  }

  generateAllStrategyCases(random = true) {
    const cases = [
      ...this.generateHardTotalCases(),
      ...this.generateSoftTotalCases(),
      ...this.generateSplitCases(),
    ];
    
    if (!random) {
      return cases;
    }

    return cases.sort(() => 0.5 - Math.random());
  }

  generateHardTotalCases() {
    const cases: StrategyCase[] = [];

    const smallTotals = [5, 6, 7, 8, 9, 10, 11];
    for (const handSum of smallTotals) {
      const possibleCards = [];

      for (let i = 2; i <= handSum - 2; i++) {
        if (i !== handSum - i) {
          possibleCards.push(i);
        }
      }

      for (let dealerValue = 2; dealerValue <= 11; dealerValue++) {
        const cardValue = possibleCards[Math.floor(Math.random() * possibleCards.length)];
        cases.push({
          hand: [
            CardFactory.getCardByNumericalValue(cardValue, undefined),
            CardFactory.getCardByNumericalValue(handSum - cardValue, undefined),
          ],
          dealerCard: CardFactory.getCardByNumericalValue(dealerValue, undefined),
        })
      }
    }

    const largeTotals = [12, 13, 14, 15, 16, 17, 18, 19];

    for (const handSum of largeTotals) {
      const lowest = handSum - 10;
      const possibleCards = [];

      for (let i = lowest; i <= 10; i++) {
        if (i !== handSum - i) {
          possibleCards.push(i);
        }
      }

      for (let dealerValue = 2; dealerValue <= 11; dealerValue++) {
        const cardValue = possibleCards[Math.floor(Math.random() * possibleCards.length)];
        cases.push({
          hand: [
            CardFactory.getCardByNumericalValue(cardValue, undefined),
            CardFactory.getCardByNumericalValue(handSum - cardValue, undefined),
          ],
          dealerCard: CardFactory.getCardByNumericalValue(dealerValue, undefined),
        })
      }
    }

    return cases;
  }

  generateSoftTotalCases() {
    const cases: StrategyCase[] = [];
    for (let i = 2; i < 10; i++) {
      for (let dealerValue = 2; dealerValue <= 11; dealerValue++) {
        cases.push({
          hand: [
            CardFactory.getCardByNumericalValue(11, undefined),
            CardFactory.getCardByNumericalValue(i, undefined),
          ],
          dealerCard: CardFactory.getCardByNumericalValue(dealerValue, undefined),
        })
      }
    }
    return cases;
  }

  generateSplitCases() {
    const cases: StrategyCase[] = [];

    for (let i = 2; i <= 11; i++) {
      for (let dealerValue = 2; dealerValue <= 11; dealerValue++) {
        const suits = [...ALL_SUITS];
        suits.sort(() => 0.5 - Math.random());

        cases.push({
          hand: [
            CardFactory.getCardByNumericalValue(i, suits[0]),
            CardFactory.getCardByNumericalValue(i, suits[1]),
          ],
          dealerCard: CardFactory.getCardByNumericalValue(dealerValue, undefined),
        })
      }
    }
    return cases;
  }
}
