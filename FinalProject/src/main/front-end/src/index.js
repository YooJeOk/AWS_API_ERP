import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import KioskMenu from './pages/Kiosk/KioskMenu';
import Home from './pages/Main/Home';
import NotFound from './pages/Error/NotFound';


//경로설정!
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement:<NotFound /> ,

    children : [
      {index : true, element:<Home />},
      {path:'/KioskMenu',element:<KioskMenu />},
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

