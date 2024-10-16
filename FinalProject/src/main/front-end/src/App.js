import React, { useEffect,useState } from 'react';
import axios from 'axios';  // axios import
import { Container } from 'react-bootstrap';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Main/Home';
import KioskMenu from './pages/Kiosk/KioskMenu';


const App = () => {
  const [hello, setHello] = useState('');

  useEffect(() => {

      axios.get('/api/test')
          .then((res) => {
              setHello(res.data);
          })
  }, []);
  return (
    <div>
    <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/KioskMenu" element={<KioskMenu/>} />
  </Routes>
        <div className="App">
        백엔드 데이터 : {hello}
    </div>
    </div>
  );
};

export default App;