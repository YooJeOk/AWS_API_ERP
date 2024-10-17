import { Route, Routes } from 'react-router-dom';
import Home from './pages/Main/Home';
import KioskMenu from './pages/Kiosk/KioskMenu';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/KioskMenu" element={<KioskMenu />} />
      </Routes>
    </div>
  );
};

export default App;