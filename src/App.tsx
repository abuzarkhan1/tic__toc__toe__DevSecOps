import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Trophy, Zap, Star, RotateCcw } from 'lucide-react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameStatus from './components/GameStatus';
import { checkWinner, checkDraw, getAIMove } from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<Array<Array<string | null>>>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameMode, setGameMode] = useState<'human' | 'ai'>('human');
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      updateScores(result.winner);
    } else if (checkDraw(board)) {
      setIsDraw(true);
      updateScores(null);
    } else if (gameMode === 'ai' && !isXNext && !winner && !isDraw) {
      // AI's turn
      handleAIMove();
    }
  }, [board, isXNext, gameMode]);

  const handleAIMove = async () => {
    if (winner || isDraw) return;
    
    setIsAIThinking(true);
    
    // Add a small delay to simulate "thinking"
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const aiMove = getAIMove(board, 'O');
    
    if (aiMove >= 0) {
      const newBoard = [...board];
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      setGameHistory(prev => [...prev, newBoard]);
    }
    
    setIsAIThinking(false);
  };

  const updateScores = (winner: string | null) => {
    if (winner === 'X') {
      setScores(prev => ({ ...prev, x: prev.x + 1 }));
    } else if (winner === 'O') {
      setScores(prev => ({ ...prev, o: prev.o + 1 }));
    } else if (winner === null && !board.includes(null)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw || (gameMode === 'ai' && !isXNext) || isAIThinking) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    // Save game state to history
    setGameHistory(prev => [...prev, newBoard]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setWinningLine(null);
    setGameHistory([]);
    setIsAIThinking(false);
  };

  const startGame = () => {
    resetGame();
    setIsGameStarted(true);
  };

  const undoMove = () => {
    if (gameHistory.length === 0 || winner || isDraw) return;
    
    // If in AI mode and it's AI's turn, undo both moves (player's and AI's)
    if (gameMode === 'ai' && !isXNext) {
      if (gameHistory.length >= 2) {
        const previousState = gameHistory[gameHistory.length - 2];
        setBoard(previousState);
        setGameHistory(prev => prev.slice(0, -2));
        // isXNext stays true as it was the player's turn
      }
    } else {
      const previousState = gameHistory[gameHistory.length - 1];
      setBoard(previousState);
      setGameHistory(prev => prev.slice(0, -1));
      setIsXNext(!isXNext);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              animationDuration: `${3 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Nebula effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-500/10 blur-3xl animate-pulse"
            style={{
              width: `${Math.random() * 500 + 200}px`,
              height: `${Math.random() * 500 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150 + 100)}, 0.15), rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150 + 100)}, 0.05))`,
            }}
          />
        ))}
      </div>
      
      {/* Game container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-2 flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
            <Sparkles className="h-8 w-8 text-purple-400" />
            Cosmic Tic Tac Toe
            <Sparkles className="h-8 w-8 text-pink-400" />
          </h1>
          <p className="text-purple-300 italic">A game from another dimension</p>
        </div>

        {!isGameStarted ? (
          <div className="flex flex-col items-center space-y-6 p-8 backdrop-blur-lg bg-indigo-900/30 rounded-2xl border border-indigo-500/50 shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-center">Choose Game Mode</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => {
                  setGameMode('human');
                  startGame();
                }}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex flex-col items-center justify-center gap-2 group shadow-lg hover:shadow-indigo-500/20"
              >
                <div className="h-16 w-16 rounded-full bg-indigo-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-purple-300" />
                </div>
                <span className="font-medium">Player vs Player</span>
              </button>
              <button
                onClick={() => {
                  setGameMode('ai');
                  startGame();
                }}
                className="p-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 flex flex-col items-center justify-center gap-2 group shadow-lg hover:shadow-pink-500/20"
              >
                <div className="h-16 w-16 rounded-full bg-purple-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="h-8 w-8 text-pink-300" />
                </div>
                <span className="font-medium">Player vs AI</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="backdrop-blur-lg bg-indigo-900/30 rounded-2xl border border-indigo-500/50 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-6">
                <GameStatus 
                  winner={winner} 
                  isDraw={isDraw} 
                  isXNext={isXNext} 
                  gameMode={gameMode}
                  isAIThinking={isAIThinking}
                />
                
                <GameBoard 
                  board={board} 
                  onClick={handleClick} 
                  winningLine={winningLine}
                  isDisabled={isAIThinking}
                />
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={resetGame}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md hover:shadow-indigo-500/30"
                    >
                      <RefreshCw className="h-4 w-4" />
                      New Game
                    </button>
                    
                    <button
                      onClick={undoMove}
                      disabled={gameHistory.length === 0 || winner !== null || isDraw}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md
                        ${gameHistory.length === 0 || winner !== null || isDraw
                          ? 'bg-gray-700/50 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-500 hover:shadow-purple-500/30'
                        }`}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Undo
                    </button>
                  </div>
                  
                  <ScoreBoard scores={scores} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-sm text-purple-300/70 flex items-center gap-2">
        <Star className="h-3 w-3" />
        Created with cosmic energy • {new Date().getFullYear()}
        <Star className="h-3 w-3" />
      </div>
    </div>
  );
}

export default App;