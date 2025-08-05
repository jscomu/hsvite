import React, { useState, useEffect } from 'react';
import './Pacman.css';

// 0: 빈 공간, 1: 벽, 2: 점, 3: 파워 펠렛, 4: 유령 집
const layout = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,4,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,4,4,4,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const Pacman = () => {
  const [board, setBoard] = useState(layout);
  const [pacmanPos, setPacmanPos] = useState({ x: 9, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':    setDirection('UP'); break;
        case 'ArrowDown':  setDirection('DOWN'); break;
        case 'ArrowLeft':  setDirection('LEFT'); break;
        case 'ArrowRight': setDirection('RIGHT'); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      setPacmanPos(prevPos => {
        const newPos = { ...prevPos };
        switch (direction) {
          case 'UP':    newPos.y -= 1; break;
          case 'DOWN':  newPos.y += 1; break;
          case 'LEFT':  newPos.x -= 1; break;
          case 'RIGHT': newPos.x += 1; break;
        }

        // 벽 충돌 체크
        if (board[newPos.y][newPos.x] === 1) {
          return prevPos; // 이동 안함
        }

        // 점수 획득
        if (board[newPos.y][newPos.x] === 2) {
          setScore(s => s + 10);
          const newBoard = [...board];
          newBoard[newPos.y][newPos.x] = 0;
          setBoard(newBoard);
        }

        return newPos;
      });
    }, 200);

    return () => clearInterval(gameInterval);
  }, [direction, board, gameOver]);

  return (
    <div className="pacman-container">
        <h2>Score: {score}</h2>
        <div className="pacman-board">
        {board.map((row, y) =>
            row.map((cell, x) => {
            let cellClass = 'cell';
            if (cell === 1) cellClass += ' wall';
            if (cell === 2) cellClass += ' dot';
            if (cell === 3) cellClass += ' power-pellet';

            return (
                <div key={`${y}-${x}`} className={cellClass}>
                {pacmanPos.x === x && pacmanPos.y === y && <div className="pacman"></div>}
                </div>
            );
            })
        )}
        </div>
        {gameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default Pacman;
