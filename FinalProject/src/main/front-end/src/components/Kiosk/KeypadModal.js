import React, { useState } from 'react';
import './KeypadModal.css';

const KeypadModal = ({ onClose, onSubmit, purpose }) => {
  const [input, setInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [step, setStep] = useState(1);

  const handleKeyPress = (key) => {
    if (input.length < 11 && step === 1) {
      setInput(prev => prev + key);
    } else if (secondInput.length < 11 && step === 2) {
      setSecondInput(prev => prev + key);
    }
  };

  const handleDelete = () => {
    if (step === 1) {
      setInput(prev => prev.slice(0, -1));
    } else if (step === 2) {
      setSecondInput(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    if (purpose === 'joinMember') {
      if (step === 1) {
        setStep(2);
        console.log('번호를 한번 더 입력해주세요.');
        alert('번호를 한번 더 입력해주세요.');
      } else {
        if (input === secondInput) {
          console.log('회원가입이 완료되었습니다.');
          alert('회원가입이 완료되었습니다.');

          onSubmit(secondInput);
        } else {
          console.log('두 번호가 일치하지 않습니다.');
          alert('두 번호가 일치하지 않습니다.');

          setInput('');
          setSecondInput('');
          setStep(1);
        }
      }
    } else {
      onSubmit(input);
    }
  };

  return (
    <div className="keypad-modal">
      <div className="keypad-content">
        <h2>{purpose === 'phoneCheck' ? '번호 조회' : '회원 가입'}</h2>
        <input type="text" value={step === 1 ? input : secondInput} readOnly className='input-num'/>
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
            <button key={num} onClick={() => handleKeyPress(num)}>{num}</button>
          ))}
          <button onClick={handleDelete}>삭제</button>
        </div>
        <div className="keypad-actions">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>
            {purpose === 'joinMember' && step === 1 ? '다음' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeypadModal;