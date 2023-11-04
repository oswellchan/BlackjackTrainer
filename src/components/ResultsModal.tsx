'use client';

export interface StrategyResults {
  [key: string]: Result[];
}

interface Result {
  correctCount: number;
  totalCount: number;
}

export function ResultsModal() {
  return <div className="absolute float-right"></div>
}
