import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import KioskMenu from './pages/Kiosk/KioskMenu';
import Home from './pages/Main/Home';
import NotFound from './pages/Error/NotFound';
import DetailPage from './pages/Kiosk/DetailPage';
import EarnPage from './pages/Kiosk/EarnPage';
import PaymentPage from './pages/Kiosk/PaymentPage';
import PaymentComplete from './pages/Kiosk/PaymentComplete';


//경로설정!
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement:<NotFound /> ,

    children : [
      {index : true, element:<Home />},
      {path:'/kioskMenu',element:<KioskMenu />},
      {path:'/detail',element:<DetailPage />},
      {path:'/earn',element:<EarnPage />},
      {path:'/payment',element:<PaymentPage />},
      {path:'/payment-complete',element:<PaymentComplete/>}
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

