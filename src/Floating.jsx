/*
플로팅 메뉴s
*/

import './Floating.css';
import Modal from './Modal';
import {useState } from 'react';

const Floating = () => {
  function showAlert() {
    alert("하이!");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMd = () => setIsModalOpen(true);
  const closeMd = () => setIsModalOpen(false);

  return (
    <div className="floating-menu">
      <button className="menu-btn" onClick={openMd}>메뉴</button>
      <Modal show={isModalOpen} onClose={closeMd}>
        <h3>알림</h3>
        <p>버튼을 눌러서 나타난 작은 화면입니다.</p>
        <button onClick={closeMd} className="modal-close-button">닫기</button>
      </Modal>
    </div>
  );
};

export default Floating;
