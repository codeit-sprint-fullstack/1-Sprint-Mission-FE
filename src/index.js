import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './component/Router.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
