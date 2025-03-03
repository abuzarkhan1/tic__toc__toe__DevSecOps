import React from 'react';
import Cell from './Cell';

interface GameBoardProps {
  board: Array<string | null>;
  onClick: (index: number) => void;
  winningLine: number[] | null;
  isDisabled?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onClick, winningLine, isDisabled = false }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6 relative">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
        {/* Vertical lines */}
        <div className="col-start-1 col-end-2 border-r border-indigo-500/30"></div>
        <div className="col-start-2 col-end-3 border-r border-indigo-500/30"></div>
        
        {/* Horizontal lines */}
        <div className="row-start-1 row-end-2 border-b border-indigo-500/30"></div>
        <div className="row-start-2 row-end-3 border-b border-indigo-500/30"></div>
      </div>
      
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onClick(index)}
          isWinningCell={winningLine?.includes(index) || false}
          index={index}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;