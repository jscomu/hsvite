/*
플로팅 메뉴s
*/

import './Floating.css';
import {useState } from 'react';

const Floating = () => {
  function showAlert() {
    alert("하이!");
  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleNotice = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className='floatcon'>
      <div className={`notibox ${!isVisible ? 'hidden' : ''}`}>
        <h2>📢 공지사항</h2>
        <p>안녕하세요!</p>
        <p>
          저희 웹사이트를 방문해주셔서 감사합니다.
          새로운 업데이트 및 이벤트 소식은 이 곳을 통해 확인하실 수 있습니다.
        </p>
        <hr />
        <p>
          이번 주에는 특별 할인 행사가 진행 중이니 많은 관심 부탁드립니다!
        </p>
      </div>
      <button className="togbtn" onClick={toggleNotice}>
        {/* {isVisible ? '✖' : '🔔'} */}
        {isVisible ? '닫기' : '공지'}
      </button>
    </div>
  );
};

export default Floating;
