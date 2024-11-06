import { Route, Routes } from 'react-router-dom';
import Home from './pages/Main/Home';
import KioskMenu from './pages/Kiosk/KioskMenu';
import DetailPage from './pages/Kiosk/DetailPage';
import EarnPage from './pages/Kiosk/EarnPage';
import PaymentPage from './pages/Kiosk/PaymentPage';
import PaymentComplete from './pages/Kiosk/PaymentComplete';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kioskMenu" element={<KioskMenu />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/earn" element={<EarnPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
      </Routes>
    </div>
  );
};

export default App;