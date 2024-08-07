import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import ItemsPage from './pages/ItemsPage';
import RegistrationPage from './pages/RegistrationPage'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/items" element={<ItemsPage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
