export const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const checkWinner = (board: Array<string | null>) => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        line: combination
      };
    }
  }
  return null;
};

export const checkDraw = (board: Array<string | null>) => {
  return !board.includes(null) && !checkWinner(board);
};

export const getAIMove = (board: Array<string | null>, aiPlayer: string) => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  // Check if AI can win in the next move
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = aiPlayer;
      if (checkWinner(newBoard)) {
        return i;
      }
    }
  }
  
  // Check if human can win in the next move and block
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = humanPlayer;
      if (checkWinner(newBoard)) {
        return i;
      }
    }
  }
  
  // Try to take the center
  if (!board[4]) {
    return 4;
  }
  
  // Try to take the corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => !board[corner]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available edge
  const edges = [1, 3, 5, 7];
  const availableEdges = edges.filter(edge => !board[edge]);
  if (availableEdges.length > 0) {
    return availableEdges[Math.floor(Math.random() * availableEdges.length)];
  }
  
  // If we get here, there are no moves left
  return -1;
};