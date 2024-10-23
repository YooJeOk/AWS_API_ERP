import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // 로그인 처리 로직을 여기에 추가
        console.log('로그인 시도:', { username, password });
    };

    return (
        <div className="login-container">
            <div className="login-container2">
                <img src="logo.png" alt="숨쉰당 로고" className="logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="ID" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="options">
                    <a href="#">비밀번호 찾기</a>
                </div>
                <div className="input-box">
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
