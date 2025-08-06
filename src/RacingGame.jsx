
import React, { useState, useEffect, useRef } from 'react';
import './RacingGame.css';

const NUM_CARS = 4;
const FINISH_LINE = window.innerWidth * 0.8; // 화면 너비의 80%를 결승선으로 설정

const carEmojis = ['🚗', '🚕', '🚙', '🚌'];

const RacingGame = () => {
  const [carPositions, setCarPositions] = useState(new Array(NUM_CARS).fill(0));
  const [winner, setWinner] = useState(null);
  const [isRacing, setIsRacing] = useState(false);
  const raceIntervalRef = useRef(null);

  useEffect(() => {
    if (isRacing) {
      raceIntervalRef.current = setInterval(() => {
        setCarPositions(prevPositions => {
          const newPositions = prevPositions.map(pos => {
            if (winner) return pos; // 승자가 결정되면 멈춤
            const move = Math.random() * 15;
            return Math.min(pos + move, FINISH_LINE);
          });

          // 승자 확인
          for (let i = 0; i < newPositions.length; i++) {
            if (newPositions[i] >= FINISH_LINE && !winner) {
              setWinner(i + 1);
              setIsRacing(false);
              break;
            }
          }
          
          return newPositions;
        });
      }, 100);
    } else {
      clearInterval(raceIntervalRef.current);
    }

    return () => clearInterval(raceIntervalRef.current);
  }, [isRacing, winner]);

  const startGame = () => {
    setCarPositions(new Array(NUM_CARS).fill(0));
    setWinner(null);
    setIsRacing(true);
  };

  return (
    <div className="racing-game">
      <h1>나의 자동차 경주</h1>
      <div className="controls">
        <button onClick={startGame} disabled={isRacing}>
          {winner ? '다시 시작' : '경주 시작'}
        </button>
        {winner && <h2 className="winner-text">{`🎉 ${winner}번 자동차 승리! 🎉`}</h2>}
      </div>
      <div className="track-container">
        {carPositions.map((position, index) => (
          <div key={index} className="track">
            <div
              className="car"
              style={{ left: `${(position / FINISH_LINE) * 100}%` }}
            >
              {carEmojis[index % carEmojis.length]}
              <span className="car-number">{index + 1}</span>
            </div>
          </div>
        ))}
        <div className="finish-line"></div>
      </div>
    </div>
  );
};

export default RacingGame;
