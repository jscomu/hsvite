/*
Gemini 실행
"리액트 js 로 내소게 페이지를 jsx 파일로 만들어"
파일 만들때마다 accept 해주면
intro.jsx intro.css 파일을 내 프로젝트에 만든다.
그러면 Layout.jsx 와 App.jsx 에 라우터만 추가해주면 완성
그리고 AI가 만들어준 페이지를 커스터마이징
*/

import React from 'react';
import './Intro.css';

const Intro = () => {
  return (
    <div className="intro-container">
      <h1>안녕하세요!</h1>
      <p>이곳에 자기소개 내용을 작성해주세요.</p>
      <p>여러분의 기술, 경험, 포부를 자유롭게 표현해보세요.</p>
    </div>
  );
};

export default Intro;
