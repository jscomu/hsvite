/*
react.js 로 테트리스 게임 페이지 jsx 만들
*/
import React, { useState, useEffect } from 'react';
import './Tetris.css';

// --- 게임 설정 ---
const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;

const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

// --- 테트로미노 (블록) ---
const TETROMINOS = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
    color: '80, 227, 230',
  },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: '36, 95, 223' },
  L: { shape: [['L', 'L', 0], [0, 'L', 0], [0, 'L', 0]], color: '223, 173, 36' },
  O: { shape: [['O', 'O'], ['O', 'O']], color: '223, 217, 36' },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: '48, 211, 56' },
  T: { shape: [['T', 'T', 'T'], [0, 'T', 0], [0, 0, 0]], color: '132, 61, 198' },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: '227, 78, 78' },
};

const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};


// --- 컴포넌트 ---

const Cell = ({ type }) => <div className={`cell ${type}`} style={{ backgroundColor: `rgba(${TETROMINOS[type]?.color}, 0.8)` }} />;

const Stage = ({ stage }) => (
  <div className="stage">
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </div>
);

const Display = ({ text }) => <div className="display">{text}</div>;

const StartButton = ({ callback }) => <button className="startButton" onClick={callback}>게임 시작</button>;


// --- 메인 게임 컴포넌트 ---

const Tetris = () => {
  const [stage, setStage] = useState(createStage());
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0],
    collided: false,
  });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [dropTime, setDropTime] = useState(null);


  const resetPlayer = () => {
    const newTetromino = randomTetromino();
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: newTetromino,
      collided: false,
    });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setDropTime(1000);
  };

  const checkCollision = (p, s, { x: moveX, y: moveY }) => {
    for (let y = 0; y < p.tetromino.shape.length; y += 1) {
      for (let x = 0; x < p.tetromino.shape[y].length; x += 1) {
        if (p.tetromino.shape[y][x] !== 0) {
          if (
            !s[y + p.pos.y + moveY] ||
            !s[y + p.pos.y + moveY][x + p.pos.x + moveX] ||
            s[y + p.pos.y + moveY][x + p.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  
  const dropPlayer = () => {
      drop();
  }

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const rotate = (matrix, dir) => {
    const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        rotate(clonedPlayer.tetromino.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };


  useEffect(() => {
    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setScore(prev => prev + 10);
          setRows(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    if (player.collided) {
      const newStage = [...stage];
      player.tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              'merged',
            ];
          }
        });
      });
      
      const sweptStage = sweepRows(newStage);
      setStage(sweptStage);
      resetPlayer();
    }
  }, [player.collided]);


  useEffect(() => {
    const updateStage = prevStage => {
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      player.tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              player.collided ? 'merged' : 'clear',
            ];
          }
        });
      });
      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player]);

  useEffect(() => {
    if (!gameOver) {
        const interval = setInterval(() => {
            drop();
        }, dropTime);
        return () => clearInterval(interval);
    }
  }, [dropTime, gameOver, drop]);


  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) { // Left
        movePlayer(-1);
      } else if (keyCode === 39) { // Right
        movePlayer(1);
      } else if (keyCode === 40) { // Down
        dropPlayer();
      } else if (keyCode === 38) { // Up (Rotate)
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <div className="tetris-wrapper" role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display text="Game Over" />
          ) : (
            <div>
              <Display text={`점수: ${score}`} />
              <Display text={`줄: ${rows}`} />
              <Display text={`레벨: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
