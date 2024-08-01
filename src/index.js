import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Nav from './component/Nav.js';
import { ForSaleItems, BestItems } from './component/Items.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <main>
      <BestItems></BestItems>
      <ForSaleItems></ForSaleItems>
    </main>
  </React.StrictMode>
);
