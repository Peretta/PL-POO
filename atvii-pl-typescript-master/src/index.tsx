import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Roteador from './componentes/roteador';
import './FloatingButton.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>
);
reportWebVitals();
