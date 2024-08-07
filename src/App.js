import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import ItemsPage from './pages/ItemsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/items" element={<ItemsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
