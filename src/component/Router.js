import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ForSaleItems } from './Items.js';
import Main from './Main.js';
import Registration from './Registration.js';
import App from '../App.js';
import './Registration.css';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="items" element={<ForSaleItems />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
