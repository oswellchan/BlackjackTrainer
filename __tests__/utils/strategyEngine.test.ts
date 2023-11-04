import { Card, CardValue } from "@/utils/card";
import { Action } from "@/utils/common";
import { StrategyEngine } from "@/utils/strategyEngine";

interface ExpectedOuput {
  [key: number]: ExpectedActions;
}

interface ExpectedActions {
  [key: number]: Action;
}

const PAIRS: ExpectedOuput = {
  11: {
    11: Action.SPLIT,
    10: Action.SPLIT,
    9: Action.SPLIT,
    8: Action.SPLIT,
    7: Action.SPLIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  10: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  9: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.SPLIT,
    8: Action.SPLIT,
    7: Action.STAND,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  8: {
    11: Action.SURRENDER,
    10: Action.SPLIT,
    9: Action.SPLIT,
    8: Action.SPLIT,
    7: Action.SPLIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  7: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.SPLIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  6: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  5: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.DOUBLE,
    8: Action.DOUBLE,
    7: Action.DOUBLE,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.DOUBLE,
  },
  4: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
  3: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.SPLIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
  2: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.SPLIT,
    6: Action.SPLIT,
    5: Action.SPLIT,
    4: Action.SPLIT,
    3: Action.SPLIT,
    2: Action.SPLIT,
  },
};

const SOFT: ExpectedOuput = {
  9: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  8: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.DOUBLE,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  7: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.DOUBLE,
  },
  6: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.HIT,
  },
  5: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.HIT,
    2: Action.HIT,
  },
  4: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.HIT,
    2: Action.HIT,
  },
  3: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
  2: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
};

const HARD: ExpectedOuput = {
  20: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  19: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  18: {
    11: Action.STAND,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  17: {
    11: Action.SURRENDER,
    10: Action.STAND,
    9: Action.STAND,
    8: Action.STAND,
    7: Action.STAND,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  16: {
    11: Action.SURRENDER,
    10: Action.SURRENDER,
    9: Action.SURRENDER,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  15: {
    11: Action.SURRENDER,
    10: Action.SURRENDER,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  14: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  13: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.STAND,
    2: Action.STAND,
  },
  12: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.STAND,
    5: Action.STAND,
    4: Action.STAND,
    3: Action.HIT,
    2: Action.HIT,
  },
  11: {
    11: Action.DOUBLE,
    10: Action.DOUBLE,
    9: Action.DOUBLE,
    8: Action.DOUBLE,
    7: Action.DOUBLE,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.DOUBLE,
  },
  10: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.DOUBLE,
    8: Action.DOUBLE,
    7: Action.DOUBLE,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.DOUBLE,
  },
  9: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.DOUBLE,
    5: Action.DOUBLE,
    4: Action.DOUBLE,
    3: Action.DOUBLE,
    2: Action.HIT,
  },
  8: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.HIT,
    5: Action.HIT,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
  7: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.HIT,
    5: Action.HIT,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
  6: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.HIT,
    5: Action.HIT,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
  5: {
    11: Action.HIT,
    10: Action.HIT,
    9: Action.HIT,
    8: Action.HIT,
    7: Action.HIT,
    6: Action.HIT,
    5: Action.HIT,
    4: Action.HIT,
    3: Action.HIT,
    2: Action.HIT,
  },
};

const getExpectedAction = (hand: Card[], dealerCard: Card, uniqueCases: Set<string>) => {
  if (hand[0].value === hand[1].value) {
    uniqueCases.add(`P${hand[0].numericalValue}_${dealerCard.numericalValue}`);
    return PAIRS[hand[0].numericalValue][dealerCard.numericalValue];
  }
  
  if (hand[0].numericalValue === 11 || hand[1].numericalValue === 11) {
    const card = hand[0].numericalValue === 11 ? hand[1] : hand[0];
    uniqueCases.add(`S${card.numericalValue}_${dealerCard.numericalValue}`);
    return SOFT[card.numericalValue][dealerCard.numericalValue];
  }

  const total = hand[0].numericalValue + hand[1].numericalValue;
  uniqueCases.add(`H${total}_${dealerCard.numericalValue}`);
  return HARD[total][dealerCard.numericalValue];
}

describe('StrategyEngine tests', () => {
  let engine: StrategyEngine;
  beforeEach(() => {
    engine = new StrategyEngine();
  });

  test('All cases are generated and are correct', () => {
    const allCases = engine.generateAllStrategyCases();
    const uniqueCases = new Set<string>();

    for (const strategyCase of allCases) {
      const actions = engine.getCorrectActions(
        strategyCase.hand,
        strategyCase.dealerCard
      );
      expect(actions[0]).toEqual(
        getExpectedAction(
          strategyCase.hand,
          strategyCase.dealerCard,
          uniqueCases
        )
      );
    }
    expect(uniqueCases.size).toBe(330);
  });
});
