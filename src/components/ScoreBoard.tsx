import React from 'react';
import { X, Circle, Divide } from 'lucide-react';

interface ScoreBoardProps {
  scores: {
    x: number;
    o: number;
    draws: number;
  };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="flex gap-3 text-sm">
      <div className="px-3 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center gap-1 shadow-inner">
        <X className="h-3 w-3 text-pink-400" />
        <span className="font-bold text-pink-400">{scores.x}</span>
      </div>
      <div className="px-3 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1 shadow-inner">
        <Circle className="h-3 w-3 text-cyan-400" />
        <span className="font-bold text-cyan-400">{scores.o}</span>
      </div>
      <div className="px-3 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center gap-1 shadow-inner">
        <Divide className="h-3 w-3 text-purple-400" />
        <span className="font-bold text-purple-400">{scores.draws}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;