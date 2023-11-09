'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { ResultsModal, StrategyResults } from '../components/ResultsModal';
import { Card } from '../utils/card';
import { Action } from '../utils/common';
import { StrategyEngine, StrategyCase } from '../utils/strategyEngine';

const strategyEngine = new StrategyEngine();
let timer: NodeJS.Timeout;

export default function Home() {
  const [cases, setCases] = useState([] as StrategyCase[]);
  const [currentCase, setCurrentCase] = useState<StrategyCase | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [correctAction, setCorrectAction] = useState<Action | undefined>();
  const [totalCaseCount, setTotalCaseCount] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);
  const [allowNext, setAllowNext] = useState(false);
  const [timeSpentMilli, setTimeSpentMilli] = useState(0);
  const [totalTimeSpentMilli, setTotalTimeSpentMilli] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    const allCases = strategyEngine.generateAllStrategyCases();
    setTotalCaseCount(allCases.length);
    setCurrentCase(allCases.pop());
    setCases(allCases);
    setTotalCorrectCount(0);
  }, []);

  useEffect(() => {
    if (!allowNext) {
      clearInterval(timer);
      timer = setInterval(() => {setTimeSpentMilli((prev) => prev + 100)}, 100);
    }

    if (allowNext) {
      console.log(timer);
      clearInterval(timer);
    }
  }, [allowNext])

  const handleAction = (action: Action) => {
    const actions = strategyEngine.getCorrectActions(currentCase!.hand, currentCase!.dealerCard);
    if (actions[0] === action) {
      setIsCorrect(true);
      setTotalCorrectCount(totalCorrectCount + 1);
    } else {
      setIsCorrect(false);
      setCorrectAction(actions[0]);
    }
    setAllowNext(true);
    setTotalTimeSpentMilli((prev) => timeSpentMilli + prev);
    setTotalCompleted((prev) => prev + 1);
  }

  const handleNext = () => {
    setCurrentCase(cases.pop());
    setCases([...cases]);
    setAllowNext(false);
    setTimeSpentMilli(0);
  }

  const percentageCorrect = !totalCompleted ? 0 : (totalCorrectCount / totalCompleted * 100).toFixed(2);
  const averageTime = !totalCompleted ? 0 : (totalTimeSpentMilli / totalCompleted / 1000).toFixed(2);

  return (
    <main className="grid grid-rows-6">
      <div className="row-span-5 flex flex-col justify-between">
        <div className="flex gap-4">
          <div>
            <p>{`Remaining: ${totalCaseCount - totalCompleted} / ${totalCaseCount}`}</p>
            <p>{`Correct: ${totalCorrectCount} / ${totalCompleted} (${percentageCorrect}%)`}</p>
          </div>
          <div>
            <p>{`Average: ${averageTime}`}</p>
            <p>{`Time: ${(timeSpentMilli / 1000).toFixed(2)}`}</p>
          </div>
        </div>
        <div className="">
          { currentCase ? 
            <PlayingArea
              strategyCase={currentCase}
              onAction={handleAction}
              onNext={handleNext}
              allowNext={allowNext}
            /> 
            : null 
          }
        </div>
      </div>
      <div className="grid row-span-1">
        <ResultFeedback isCorrect={isCorrect} correctAction={correctAction}/>
      </div>
    </main>
  );
}

function Actions(props: {
  onAction: (action: Action) => void,
  disabled: boolean,
}) {
  const disabledStyle = props.disabled ? 'disabled:opacity-25' : '';
  return <>
    <div className="flex justify-center gap-2 m-2">
      <button 
        className={`bg-blue-500 text-white font-bold py-2 px-2 rounded ${disabledStyle}`}
        type="button"
        onClick={() => props.onAction(Action.STAND)}
        disabled={props.disabled}
      >
        STAND
      </button>
      <button 
        className={`bg-blue-500 text-white font-bold py-2 px-2 rounded ${disabledStyle}`}
        type="button"
        onClick={() => props.onAction(Action.HIT)}
        disabled={props.disabled}
      >
        HIT
      </button>
      <button 
        className={`bg-blue-500 text-white font-bold py-2 px-2 rounded ${disabledStyle}`}
        type="button"
        onClick={() => props.onAction(Action.DOUBLE)}
        disabled={props.disabled}
      >
        DOUBLE
      </button>
    </div>
    <div className="flex justify-center gap-2 m-2">
      <button
        className={`bg-blue-500 text-white font-bold py-2 px-2 rounded ${disabledStyle}`}
        type="button"
        onClick={() => props.onAction(Action.SPLIT)}
        disabled={props.disabled}
      >
        SPLIT
      </button>
      <button
        className={`bg-blue-500 text-white font-bold py-2 px-2 rounded ${disabledStyle}`}
        type="button"
        onClick={() => props.onAction(Action.SURRENDER)}
        disabled={props.disabled}
      >
        SURRENDER
      </button>
    </div>
  </>;
}

function NextButton(props: {
  onPress: () => void,
  disabled: boolean,
}) {
  const disabledStyle = props.disabled ? 'disabled:opacity-25' : '';
  return <>
    <button 
        className={`w-full h-full rounded bg-yellow-500 ${disabledStyle}`}
        type="button"
        onClick={() => props.onPress()}
        disabled={props.disabled}
    >
      <ChevronRightIcon/>
    </button>
  </>;
}

function CardImage(props: { card: Card }) {
  return <Image
    priority
    placeholder="empty"
    key={props.card.toString()}
    className="h-40 w-auto"
    src={`/images/playing_cards/${props.card.toString()}.svg`}
    height={0}
    width={0}
    alt={`${props.card.toString()}`}
  />;
}

function PlayingArea(props: {
  strategyCase: StrategyCase,
  onAction: (action: Action) => void,
  onNext: () => void,
  allowNext: boolean
}) {
  return <div className="grid grid-rows-5">
    <div className="row-span-2 flex justify-around items-center">
      <CardImage card={props.strategyCase.dealerCard} />
    </div>
    <div className="row-span-2 flex justify-center gap-1 items-center">
        <CardImage card={props.strategyCase.hand[0]} />
        <CardImage card={props.strategyCase.hand[1]} />
    </div>
    <div className="row-span-1 flex justify-around">
      <div className="grid grid-cols-5 items-center">
        <div className="col-span-4">
          <Actions onAction={props.onAction} disabled={props.allowNext}/>
        </div>
        <div className="col-span-1">
          <NextButton onPress={props.onNext} disabled={!props.allowNext}/>
        </div>
      </div>
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
