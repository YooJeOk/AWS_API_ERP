// import React, { useState } from 'react';
// import './password.css';

// const PasswordRecovery = () => {
//     const [mbId, setMbId] = useState('');
//     const [mbEmail, setMbEmail] = useState('');
//     const [injeung, setInjeung] = useState('');
//     const [injeungbunho, setInjeungbunho] = useState('');
//     const [randomPwd, setRandomPwd] = useState('');

//     const handleEmailCheck = () => {
//         // 이메일 전송 로직 구현
//         console.log('이메일 전송:', mbEmail);
//     };

//     const handleInjeungCheck = () => {
//         // 인증번호 확인 로직 구현
//         console.log('인증번호 확인:', injeung);
//     };

//     const handleFindPwd = () => {
//         // 비밀번호 찾기 로직 구현
//         console.log('비밀번호 찾기:', mbId, mbEmail, injeung);
//     };

//     return (
//         <div className="password-container">
//             <img src="logo.png" alt="숨쉰당 로고" className="logo" />

//             <form id="formId">
//                 <div className="input-box">
//                     <label htmlFor="mbId">아이디</label>
//                     <input 
//                         type="text" 
//                         name="mbId" 
//                         id="mbId" 
//                         value={mbId} 
//                         onChange={(e) => setMbId(e.target.value)} 
//                         required 
//                     />
//                     <div className="form-text" id="idCheckWarn"></div>
//                 </div>

//                 <div className="input-box">
//                     <label htmlFor="mbEmail">이메일</label>
//                     <input 
//                         type="email" 
//                         name="mbEmail" 
//                         id="mbEmail" 
//                         value={mbEmail} 
//                         onChange={(e) => setMbEmail(e.target.value)} 
//                         required 
//                     />
//                     <div className="form-text" id="emailCheckWarn"></div>
//                     <button 
//                         type="button" 
//                         className="submit-btn2" 
//                         id="emailCheckBtn" 
//                         onClick={handleEmailCheck}
//                     >
//                         전송
//                     </button>
//                 </div>

//                 <div className="input-box">
//                     <label htmlFor="injeung">인증번호 입력</label>
//                     <input 
//                         type="hidden" 
//                         id="injeungbunho" 
//                         value={injeungbunho} 
//                     />
//                     <input 
//                         type="text" 
//                         id="injeung" 
//                         value={injeung} 
//                         onChange={(e) => setInjeung(e.target.value)} 
//                         required 
//                     />
//                     <div className="form-text" id="injeungCheckWarn"></div>
//                     <button 
//                         type="button" 
//                         className="submit-btn2" 
//                         id="injeungCheckBtn" 
//                         onClick={handleInjeungCheck}
//                     >
//                         확인
//                     </button>
//                 </div>

//                 <div className="input-box">
//                     <button 
//                         type="button" 
//                         className="submit-btn" 
//                         id="findPwdBtn" 
//                         onClick={handleFindPwd}
//                     >
//                         비밀번호 찾기
//                     </button>
//                 </div>

//                 <input type="hidden" id="randomPwd" value={randomPwd} />
//             </form>
//         </div>
//     );
// };

// export default PasswordRecovery;
