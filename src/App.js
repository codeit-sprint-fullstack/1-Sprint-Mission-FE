import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <ProductList />
    </div>
  );
};

export default App;

