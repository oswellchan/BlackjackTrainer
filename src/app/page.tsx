'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ResultsModal, StrategyResults } from '../components/ResultsModal';
import { Card } from '../utils/card';
import { Action } from '../utils/common';
import { StrategyEngine, StrategyCase } from '../utils/strategyEngine';

const strategyEngine = new StrategyEngine();

export default function Home() {
  const [cases, setCases] = useState([] as StrategyCase[]);
  const [currentCase, setCurrentCase] = useState<StrategyCase | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [correctAction, setCorrectAction] = useState<Action | undefined>();
  const [totalCaseCount, setTotalCaseCount] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);

  useEffect(() => {
    const allCases = strategyEngine.generateAllStrategyCases();
    setTotalCaseCount(allCases.length);
    setCurrentCase(allCases.pop());
    setCases(allCases);
    setTotalCorrectCount(0);
  }, []);

  const handleAction = (action: Action) => {
    const actions = strategyEngine.getCorrectActions(currentCase!.hand, currentCase!.dealerCard);
    if (actions[0] === action) {
      setIsCorrect(true);
      setTotalCorrectCount(totalCorrectCount + 1);
    } else {
      setIsCorrect(false);
      setCorrectAction(actions[0]);
    }

    setCurrentCase(cases.pop());
    setCases([...cases]);
  }

  const totalCompleted = totalCaseCount - cases.length - 1;
  const percentageCorrect = !totalCompleted ? 0 : Math.round(((totalCorrectCount / totalCompleted) * 100) * 100) / 100;

  return (
    <main className="h-screen grid grid-rows-6">
      {
        cases.length ? 
          <div className="absolute float-right">
            <p>{`Remaining: ${cases.length + 1} / ${totalCaseCount}`}</p>
            <p>{`Correct: ${totalCorrectCount} / ${totalCompleted} (${percentageCorrect}%)`}</p>
          </div>
        : null
      }
      <div className="grid row-span-5">
        { currentCase ? 
          <PlayingArea
            strategyCase={currentCase}
            onAction={handleAction}
          /> 
          : null 
        }
      </div>
      <div className="grid row-span-1">
        <ResultFeedback isCorrect={isCorrect} correctAction={correctAction}/>
      </div>
    </main>
  );
}

function Actions(props: { onAction: (action: Action) => void }) {
  return <>
    <div className="flex justify-center gap-2 m-2">
      <button 
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        type="button"
        onClick={() => props.onAction(Action.STAND)}
      >
        STAND
      </button>
      <button 
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        type="button"
        onClick={() => props.onAction(Action.HIT)}
      >
        HIT
      </button>
      <button 
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        type="button"
        onClick={() => props.onAction(Action.DOUBLE)}
      >
        DOUBLE
      </button>
    </div>
    <div className="flex justify-center gap-2 m-2">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        type="button"
        onClick={() => props.onAction(Action.SPLIT)}
      >
        SPLIT
      </button>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
        type="button"
        onClick={() => props.onAction(Action.SURRENDER)}
      >
        SURRENDER
      </button>
    </div>
  </>;
}

function CardImage(props: { card: Card }) {
  return <Image
    priority
    className="h-40 w-auto"
    src={`/images/playing_cards/${props.card.toString()}.svg`}
    height={0}
    width={0}
    alt={`${props.card.toString()}`}
  />;
}

function PlayingArea(props: { strategyCase: StrategyCase, onAction: (action: Action) => void }) {
  return <div className="grid grid-rows-5">
    <div className="row-span-2 flex justify-around items-center">
      <CardImage card={props.strategyCase.dealerCard} />
    </div>
    <div className="row-span-2 flex justify-center gap-1 items-center">
        <CardImage card={props.strategyCase.hand[0]} />
        <CardImage card={props.strategyCase.hand[1]} />
    </div>
    <div className="row-span-1 w-full">
      <Actions onAction={props.onAction}/>
    </div>
  </div>;
}

function ResultFeedback(props: {
  isCorrect: boolean | undefined,
  correctAction: Action | undefined,
}) {
  if (props.isCorrect === undefined) {
    return null;
  }

  const bgColour = props.isCorrect ? 'bg-lime-500' : 'bg-red-500';

  return <div className="grid grid-rows-3">
    <div className="row-span-1"/>
    <div className={`row-span-2 flex justify-center h-full items-center ${bgColour}`}>
      <p>{ props.isCorrect ? 'Correct' : `Wrong. Should ${props.correctAction}` }</p>
    </div>
  </div>;
}
