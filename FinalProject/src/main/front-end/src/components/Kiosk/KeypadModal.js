import React, { useState } from 'react';
import './KeypadModal.css';
import useClickSound from '../../hooks/useClickSound';
import AlertModal from './AlertModal';


const KeypadModal = ({ onClose, onSubmit, purpose }) => {
  const ClickSound = useClickSound();
  const [input, setInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [step, setStep] = useState(1);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleKeyPress = (key) => {
    ClickSound();
    if (input.length < 11 && step === 1) {
      setInput(prev => prev + key);
    } else if (secondInput.length < 11 && step === 2) {
      setSecondInput(prev => prev + key);
    }
  };

  
  const handleDelete = () => {
    ClickSound();
    if (step === 1) {
      setInput(prev => prev.slice(0, -1));
    } else if (step === 2) {
      setSecondInput(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = async () => {
    ClickSound();
    if (purpose === 'joinMember') {
      if (step === 1) {
        setStep(2);
        // alert('');
        setAlertMessage('번호를 한번 더 입력해주세요.');
        setShowAlert(true);
      } else {
        if (input === secondInput) {
          try {
            const response = await fetch('http://localhost:8080/api/user/join', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ phone: secondInput, stamp: 0, coupon: 0 }),
            });
            if (!response.ok) {
              throw new Error('Failed to register user');
            }
            // alert('회원가입이 완료되었습니다.');

            setAlertMessage('회원가입이 완료되었습니다.');
            setShowAlert(true);
            setTimeout(() => {
              onSubmit(secondInput);
            }, 1000); // 1초 후 실행
            // onSubmit(secondInput);
          } catch (error) {
            console.error(error);
            alert('등록에 실패했습니다.');
          }
        } else {
          // alert('두 번호가 일치하지 않습니다!');
          setAlertMessage('두 번호가 일치하지 않습니다!');
          setShowAlert(true);
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
      {showAlert && (
        <AlertModal 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
    </div>
  );
};

export default KeypadModal;