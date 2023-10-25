import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';

const rootDOM = document.querySelector<HTMLDivElement>('#root');
if (!rootDOM) {
  throw new Error('Root DOM not found');
}

ReactDOM.createRoot(rootDOM).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
