import React from 'react';

interface CellProps {
  value: string | null;
  onClick: () => void;
  isWinningCell: boolean;
  index: number;
  isDisabled?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, index, isDisabled = false }) => {
  const getDelayClass = () => {
    // Create a staggered animation effect
    const delays = ['delay-0', 'delay-75', 'delay-150', 'delay-75', 'delay-150', 'delay-225', 'delay-150', 'delay-225', 'delay-300'];
    return delays[index];
  };

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center text-5xl font-bold rounded-lg
        transition-all duration-300 transform hover:scale-105 active:scale-95
        ${getDelayClass()} animate-fade-in
        ${value ? 'cursor-default' : isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-indigo-700/50'}
        ${isWinningCell 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30' 
          : 'bg-indigo-800/40 backdrop-blur-sm border border-indigo-700/50'}
        relative overflow-hidden
      `}
      disabled={!!value || isDisabled}
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
      
      {value && (
        <span 
          className={`
            inline-block transform transition-all duration-300
            ${value === 'X' 
              ? 'text-pink-400 animate-x-appear' 
              : 'text-cyan-400 animate-o-appear'}
            ${isWinningCell ? 'animate-pulse-slow' : ''}
            relative z-10
          `}
        >
          {value}
          
          {/* Glow effect for winning cells */}
          {isWinningCell && (
            <div className={`absolute inset-0 blur-md opacity-50 -z-10 ${value === 'X' ? 'bg-pink-500' : 'bg-cyan-500'}`}></div>
          )}
        </span>
      )}
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      ></div>
    </button>
  );
};

export default Cell;