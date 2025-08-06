
import React, { useState, useCallback } from 'react';
import './Lotto.css';

const LottoBall = ({ number }) => {
  const getBallColor = (num) => {
    if (num <= 10) return 'yellow';
    if (num <= 20) return 'blue';
    if (num <= 30) return 'red';
    if (num <= 40) return 'gray';
    return 'green';
  };

  return (
    <div className={`lotto-ball ${getBallColor(number)}`}>
      {number}
    </div>
  );
};

const Lotto = () => {
  const [numbers, setNumbers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = useCallback(() => {
    if (isGenerating) return;

    setIsGenerating(true);
    setNumbers([]);

    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      lottoNumbers.add(randomNum);
    }

    const sortedNumbers = [...lottoNumbers].sort((a, b) => a - b);

    sortedNumbers.forEach((num, index) => {
      setTimeout(() => {
        setNumbers(prev => [...prev, num]);
        if (index === sortedNumbers.length - 1) {
          setIsGenerating(false);
        }
      }, (index + 1) * 700);
    });
  }, [isGenerating]);

  return (
    <div className="lotto-container">
      <h1>Lotto 번호 생성기</h1>
      <div className="lotto-balls-container">
        {numbers.map((num, index) => (
          <LottoBall key={index} number={num} />
        ))}
      </div>
      <button onClick={generateNumbers} disabled={isGenerating}>
        {isGenerating ? '번호 생성 중...' : '번호 받기'}
      </button>
    </div>
  );
};

export default Lotto;
