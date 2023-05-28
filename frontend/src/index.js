import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WaitProvider } from './hooks/useWait';
import { MenuProvider } from './hooks/useMenu';
import MENU from './pages/Menu';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WaitProvider>
      <MenuProvider>
        <Router>
          <Routes>
            <Route path='/*' element={ <App /> } />
            <Route path='/menu' element={<MENU /> } />
          </Routes>
        </Router>
      </MenuProvider>
    </WaitProvider>
  </React.StrictMode>
);