import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ForSaleItems, BestItems } from './Items.js';
import Registration from './Registration.js';
import App from '../App.js';
import './Registration.css';

const Main = () => {
  return (
    <>
      <BestItems />
      <ForSaleItems />
    </>
  );
};

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
