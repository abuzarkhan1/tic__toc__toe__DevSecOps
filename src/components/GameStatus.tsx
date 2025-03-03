import React from 'react';
import { Sparkles, AlertCircle, Brain, User } from 'lucide-react';

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  isXNext: boolean;
  gameMode: 'human' | 'ai';
  isAIThinking?: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, isXNext, gameMode, isAIThinking = false }) => {
  let statusText = '';
  let statusIcon = null;
  let statusClass = '';
  let secondaryIcon = null;

  if (winner) {
    statusText = `Player ${winner} wins!`;
    statusIcon = <Sparkles className="h-5 w-5" />;
    statusClass = winner === 'X' ? 'text-pink-400' : 'text-cyan-400';
    secondaryIcon = <Sparkles className="h-5 w-5" />;
  } else if (isDraw) {
    statusText = "It's a draw!";
    statusIcon = <AlertCircle className="h-5 w-5" />;
    statusClass = 'text-purple-400';
    secondaryIcon = <AlertCircle className="h-5 w-5" />;
  } else {
    const nextPlayer = isXNext ? 'X' : 'O';
    
    if (gameMode === 'ai' && !isXNext) {
      statusText = isAIThinking ? 'AI is thinking...' : 'AI\'s turn';
      statusIcon = <Brain className="h-5 w-5 animate-pulse" />;
      statusClass = 'text-cyan-400';
    } else {
      statusText = `Player ${nextPlayer}'s turn`;
      statusIcon = <User className="h-5 w-5" />;
      statusClass = isXNext ? 'text-pink-400' : 'text-cyan-400';
    }
  }

  return (
    <div className={`flex items-center justify-center gap-2 text-lg font-medium ${statusClass} py-2 px-4 rounded-full bg-indigo-900/50 backdrop-blur-sm border border-indigo-700/50 shadow-inner`}>
      {statusIcon}
      <span className={isAIThinking ? 'animate-pulse' : ''}>{statusText}</span>
      {secondaryIcon}
    </div>
  );
};

export default GameStatus;