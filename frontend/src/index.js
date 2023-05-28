import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { WaitProvider } from './hooks/useWait';
import { MenuProvider } from './hooks/useMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WaitProvider>
      <MenuProvider>
        <Router>
          <App />
        </Router>
      </MenuProvider>
    </WaitProvider>
  </React.StrictMode>
);