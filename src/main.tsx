import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import { store } from './store/index.ts';

const rootDOM = document.querySelector<HTMLDivElement>('#root');
if (!rootDOM) {
  throw new Error('Root DOM not found');
}

ReactDOM.createRoot(rootDOM).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
